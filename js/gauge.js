var isGaugeInit = false,
    _canvas = document.getElementById('gauge'),
    gaugeGroup = [],
    arcIncrements = [],
    cWidth = _canvas.width,
    cHeight = _canvas.height,
    baseColor = "#5d5a77",
    coverColor = "#fff600";

function draw_canvasRound(gauge, color, sAngle, eAngle) {
    gauge.clearRect(0, 0, cWidth, cHeight);

    gauge.beginPath();
    gauge.strokeStyle = color;
    gauge.lineWidth = 50;
    gauge.arc(cWidth / 2, cHeight / 2, 100, sAngle, eAngle, false);
    gauge.stroke();
}

function draw_canvasStaff(gauge, arcEndStaff) {
    draw_canvasRound(gauge, baseColor, 0, Math.PI * 2);
    // draw_canvasRound(gauge, coverColor, 0 - 90 * Math.PI / 180, arcEndStaff - 90 * Math.PI / 180);

    gauge.beginPath();
    gauge.strokeStyle = coverColor;
    gauge.lineWidth = 50;
    gauge.arc(cWidth / 2, cHeight / 2, 100, 0 - 90 * Math.PI / 180, arcEndStaff - 90 * Math.PI / 180, false);
    gauge.stroke();

    gauge.fillStyle = "#fff";
    gauge.font = "70px PT Sans";
    var text = Math.floor(arcEndStaff / 6.2 * 100);
    var textWidth = gauge.measureText(text).width;
    gauge.fillText(text, cWidth / 2 - textWidth / 2, cHeight / 2 + 25);

    return arcEndStaff;
}

function initCanvasStaff() {

    var gauge = _canvas.getContext("2d");
    gaugeGroup.push(gauge);
    arcIncrements.push(0);

    var drawingStaff1 = setInterval(function () {
        arcIncrements[0] += Math.PI / 180;
        var end1 = draw_canvasStaff(gaugeGroup[0], arcIncrements[0]);
        if (end1 > 2.35) {
            clearInterval(drawingStaff1);
        }
    }, 10);

}
