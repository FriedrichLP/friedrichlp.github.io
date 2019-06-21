let canvas, ctx, count, dartsI, dartsA;
let interval, dartCount, dartIdx, dartsInside, dartsAll, running;

let drawCircle = true;
let offX = 100; //x offset
let offY = 75; //y offset

function init () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    count = document.getElementById("input1");
    dartsI = document.getElementById("dartsI");
    dartsA = document.getElementById("dartsA");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    dartIdx = 0;
    dartsInside = 0;
    dartsAll = 0;
    running = true;
    try {
        clearInterval(interval);
    } catch (err) {
        console.log(err);
    }

    updateFields();

    ctx.fillStyle = "white";
    ctx.fillRect(offX, offY, 400, 400);

    if (drawCircle) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(offX + 200, offY + 200, 200, 0, 2 * Math.PI);
        ctx.stroke();
    }

    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(offX, offY, 400, 400);
    ctx.stroke();
}

function startDraw () {
    init();

    dartCount = parseInt(count.value);
    interval = setInterval(drawDotPackage, 1);

    console.log(dartCount);
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
        let x = randomRange(offX, offX + 400);
        let y = randomRange(offY, offY + 400);
        let a = (offX + 200) - x;
        let b = (offY + 200) - y;
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

function toggleDrawCircle () {
    drawCircle = document.getElementById("drawCircle").checked;
    init();
}

function updateFields () {
    dartsI.value = "" + dartsInside;
    dartsA.value = "" + dartsAll;
}

function randomRange (min, max) {
    return Math.random() * (max - min) + min;
}