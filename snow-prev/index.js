const random = (() => {
    let seed = 15;
    return () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    };
})();

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('snow-side-1');

const ctx = canvas.getContext('2d');

const size = [500, 500];

[canvas.width, canvas.height] = size;

const velocity = [-5, 30]; // pixels in second
const velocityDelta = [4, 10];

const snowBounds = [
    [100, 100],
    [400, 400],
];

const repeatSnow = true;

const points = [];

const flakesNumber = 100;
const coloredFlakes = 10;

const translateTime = 200;

for (let i = 0; i < flakesNumber; i++) {
    const colored = i >= flakesNumber - coloredFlakes;

    points.push({
        colored,
        coords: [
            randomFromTo(snowBounds[0][0], snowBounds[1][0]),
            randomFromTo(snowBounds[0][1], snowBounds[1][1]),
        ],
        velocity: colored
            ? [velocity[0], velocity[1]]
            : [
                  randomFromTo(velocity[0] - velocityDelta[0], velocity[0] + velocityDelta[0]),
                  randomFromTo(velocity[1] - velocityDelta[1], velocity[1] + velocityDelta[1]),
              ],
        color: colored ? [255, 205, 0] : [255, 255, 255],
        radius: colored ? 6 : 4,
        alpha: 1,
        translated: undefined,
        // {
        //     fromTime: 0,
        //     fromCoords: [0, 0],
        //     toTime: 0,
        //     toCoords: [0, 0],
        // },
    });
}

const mod = (x, y) => x - y * Math.floor(x / y);

function updatePoint(point, dt, now) {
    const nextX = point.coords[0] + (point.velocity[0] * dt) / 1000;
    const nextY = point.coords[1] + (point.velocity[1] * dt) / 1000;

    if (repeatSnow) {
        const boundedX =
            snowBounds[0][0] + mod(nextX - snowBounds[0][0], snowBounds[1][0] - snowBounds[0][0]);

        const boundedY =
            snowBounds[0][1] + mod(nextY - snowBounds[0][1], snowBounds[1][1] - snowBounds[0][1]);

        if (nextY > snowBounds[1][1] && point.colored && !point.translated) {
            point.translated = {
                fromCoords: [point.coords[0], point.coords[1]],
                toCoords: [boundedX, boundedY],
                fromTime: now,
                toTime: now + translateTime,
            };
        }

        if (point.translated) {
            if (now >= point.translated.toTime) {
                point.coords = point.translated.toCoords;
                point.translated = undefined;
            } else {
                point.coords[0] = lerp(
                    point.translated.fromCoords[0],
                    point.translated.toCoords[0],
                    (now - point.translated.fromTime) /
                        (point.translated.toTime - point.translated.fromTime),
                );
                point.coords[1] = lerp(
                    point.translated.fromCoords[1],
                    point.translated.toCoords[1],
                    (now - point.translated.fromTime) /
                        (point.translated.toTime - point.translated.fromTime),
                );
            }
        } else {
            point.coords = [boundedX, boundedY];
        }

        if (!point.colored) {
            const threshold = 5;
            point.alpha = 0.7;

            const distanceToLeftBound = Math.abs(snowBounds[0][0] - point.coords[0]);
            const distanceToRightBound = Math.abs(snowBounds[1][0] - point.coords[0]);
            if (distanceToLeftBound < threshold) {
                point.alpha *= distanceToLeftBound / threshold;
            } else if (distanceToRightBound < threshold) {
                point.alpha *= distanceToRightBound / threshold;
            }
        }
    }
}

let prevTime = Date.now();
function render() {
    requestAnimationFrame(render);
    const now = Date.now();
    const dt = now - prevTime;

    // #86b4ff
    // #4a7bc9
    ctx.fillStyle = '#86b4ff';
    ctx.fillRect(0, 0, size[0], size[1]);

    // ctx.strokeRect(0, 0, size[0], size[1]);

    ctx.strokeRect(
        snowBounds[0][0],
        snowBounds[0][1],
        snowBounds[1][0] - snowBounds[0][0],
        snowBounds[1][1] - snowBounds[0][1],
    );

    points.forEach((point) => {
        updatePoint(point, dt, now);

        const { coords } = point;
        ctx.fillStyle = `rgba(${point.color.join(',')}, ${point.alpha})`;
        ctx.beginPath();
        ctx.arc(coords[0], coords[1], point.radius, 0, 2 * Math.PI);
        ctx.fill();
    });

    prevTime = now;
}
requestAnimationFrame(render);

function randomFromTo(from, to) {
    return from + random() * (to - from);
}

function lerp(a, b, t) {
    return a + t * (b - a);
}