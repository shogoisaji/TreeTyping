// SVG要素とその中の玉を参照するための変数
var svg = document.getElementById('treeSVG');

// SVG要素の中心座標
var centerX = parseInt(svg.getAttribute('width')) / 2;
var centerY = parseInt(svg.getAttribute('height')) / 2 + 130;

// 玉の基本パラメータ
var baseSphereRadius = 6;  // 基本半径
var angularSpeed = 0;      // 角速度

// 玉の配置パラメータ
var numLevels = 20;        // 段数
var numSpheresPerLevel = 20; // 段ごとの玉の数
var spheresSpan = 21;      // 段ごとの距離
var distanceLevel = 3.0;     // 玉の前後レベル

// view設定(楕円率)
var viewAngleLevel = 5;

// フレームレート調整用
var frameCount = 0;

// 一部の段の玉数を調整
var addSpheresPerLevel = 4;

// 段ごとの玉の軌道半径
var levelOrbitRadiusX = [75, 65, 62, 60, 65, 130, 170, 180, 185, 183, 180, 170, 158, 160, 162, 150, 135, 110, 80, 45];

// 玉クラス
class Sphere {
  constructor(level, index, centerX, centerY, levelOrbitRadiusX, numSpheresPerLevel, baseSphereRadius, distanceLevel, viewAngleLevel, spheresSpan) {
    this.level = level;
    this.index = index;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radiusX = levelOrbitRadiusX[level];
    this.numSpheresPerLevel = numSpheresPerLevel;
    this.baseRadius = baseSphereRadius;
    this.distanceLevel = distanceLevel;
    this.viewAngleLevel = viewAngleLevel;
    this.spheresSpan = spheresSpan;

    this.element = this.createSphereElement();
  }

  createSphereElement() {
    var newSphere = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    newSphere.classList.add('myCircle');
    newSphere.setAttribute('r', this.baseRadius);
    newSphere.setAttribute('mask', 'url(#horizontalMask)');

    return newSphere;
  }

  move(angularSpeed) {
    var angle = angularSpeed + this.index * 2 * Math.PI / this.numSpheresPerLevel;

    this.element.setAttribute('cx', this.centerX + this.radiusX * Math.cos(angle+= this.level*2));
    this.element.setAttribute('cy', this.centerY + this.radiusX / this.viewAngleLevel * Math.sin(angle) - this.level * this.spheresSpan);

    var nowRadius = this.baseRadius + Math.sin(angle) * this.distanceLevel;
    this.element.setAttribute('r', nowRadius);

    var saturation = Math.abs(Math.cos(angle/2-0.8)) * 100;
    this.element.style.fill = 'hsl(120, ' + saturation + '%, ' + (this.level*1.8+20) +'%)';

    if(Math.cos(angle) > 0.2) {
      this.element.style.display = 'none';
    } else {
      this.element.style.display = '';
    }
  }
}

var spheres = [];
for (var level = 0; level < numLevels; level++) {
  if(level < 5 || level > 18){
    if(level == numLevels-1){addSpheresPerLevel += 5;}
  }else addSpheresPerLevel = 0;
  for (var i = 0; i < numSpheresPerLevel; i++) {
    var newSphere = new Sphere(level, i, centerX, centerY, levelOrbitRadiusX, numSpheresPerLevel-addSpheresPerLevel, baseSphereRadius, distanceLevel, viewAngleLevel, spheresSpan);
    svg.appendChild(newSphere.element);
    spheres.push(newSphere);
  }
}

function moveSpheres() {
  // フレームカウンタが偶数のときだけ更新を行う
  if (frameCount % 2 === 0) {
    for (var i = 0; i < spheres.length; i++) {
      spheres[i].move(angularSpeed);
    }

    angularSpeed += 0.01;
  }

  frameCount++;
  requestAnimationFrame(moveSpheres);
}

moveSpheres();