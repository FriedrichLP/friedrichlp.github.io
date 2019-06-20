const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const count = document.getElementById("input1");
const dartsI = document.getElementById("dartsI");
const dartsA = document.getElementById("dartsA");

let interval;
let dartCount;
let dartIdx = 0;
let dartsInside = 0;
let dartsAll = 0;
let running = true;

function init () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(400, 250, 200, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 50, 400, 400);
    ctx.stroke();
}

function startDraw () {
    dartCount = parseInt(count.value);
    interval = setInterval(drawDotPackage, 1);
}

function drawDotPackage () {
    for (let i = 0; i < dartCount / 1000; i++){
        drawDot();
        if (!running) break;
    }
}

function drawDot () {
    if (dartIdx < dartCount) {
        dartIdx++;
        let x = randomRange(200, 600);
        let y = randomRange(50, 450);
        let a = 400 - x;
        let b = 250 - y;
        let dist = Math.abs(Math.sqrt(a * a + b * b));

        if (dist <= 200) {
            ctx.fillStyle = "green";
            dartsInside++;
        } else {
            ctx.fillStyle = "blue";
        }
        dartsAll++;
        updateFields();

        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI);
        ctx.fill();
    } else {
        clearInterval(interval);
        running = false;
    }
}

function updateFields () {
    dartsI.value = "" + dartsInside;
    dartsA.value = "" + dartsAll;
}

function randomRange (min, max) {
    return Math.random() * (max - min) + min;
}