var words = 0;
var type = 0;

window.onload = function () {
    let urlParams = new URLSearchParams(window.location.search);
    words = urlParams.get("words");
    type = urlParams.get("type");
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
