var words = 0;
var type = 0;
var score = 0;

window.onload = function () {
    let urlParams = new URLSearchParams(window.location.search);
    words = urlParams.get("words");
    type = urlParams.get("type");
    score = urlParams.get("score");

    let localStorageKey = `${type}_${words}_bestScore`;
    let bestScore = localStorage.getItem(localStorageKey);
    console.log(localStorageKey);
    if (bestScore === null || score > bestScore) {
        localStorage.setItem(localStorageKey, score);
        document.getElementById("bestscore").innerText = score;
        document.getElementById("bestscore").classList.add("flash");
    } else {
        document.getElementById("bestscore").innerText = bestScore;
    }

    document.getElementById("rate").innerText = urlParams.get("rate") + "%";
    document.getElementById("type").innerText = urlParams.get("type");
    document.getElementById("words").innerText = urlParams.get("words");
    document.getElementById("score").innerText = urlParams.get("score");
    document.getElementById("timeTaken").innerText = urlParams.get("timeTaken");
    document.getElementById("errors").innerText = urlParams.get("errors");
    document.getElementById("avgTimePerKey").innerText = urlParams.get("avgTimePerKey");
};

document.getElementById("playAgain").addEventListener("click", function () {
    window.location.href = "index.html?words=" + words + "&type=" + type;
});

document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        document.getElementById("playAgain").click();
    }
};

let localStorageKey = `${type}_${words}_bestScore`;
let bestScore = localStorage.getItem(localStorageKey);

if (bestScore === null || score > bestScore) {
    localStorage.setItem(localStorageKey, score);

    document.getElementById("bestscore").textContent = score;
} else {
    document.getElementById("bestscore").textContent = bestScore;
}
