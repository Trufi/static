(() => {
    const container = document.getElementById('snow-side-1');
    const repeatSnow = true;

    const random = (() => {
        let seed = 15;
        return () => {
            seed = (seed * 16807) % 2147483647;
            return (seed - 1) / 2147483646;
        };
    })();

    /** @type {HTMLCanvasElement} */
    const canvas = container.querySelector('canvas');

    let visible = true;
    if (window.IntersectionObserver) {
        visible = false;
        const observer = new IntersectionObserver(
            (entries, observer) => {
                if (!entries.length) {
                    return;
                }
                const entry = entries[0];
                visible = entry.isIntersecting;
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            },
        );
        observer.observe(canvas);
    }

    const ctx = canvas.getContext('2d');

    const size = [650, 340];

    [canvas.width, canvas.height] = size;

    const velocity = [-5, 30]; // pixels in second
    const velocityDelta = [4, 10];

    const snowBounds = [
        [170, 50],
        [480, 290],
    ];

    const points = [];

    const flakesNumber = 100;
    const coloredFlakes = 10;

    const translateTime = 200;

    function createPoints() {
        points.length = 0;
        for (let i = 0; i < flakesNumber; i++) {
            let colored = i >= flakesNumber - coloredFlakes;

            const coords = [
                randomFromTo(snowBounds[0][0], snowBounds[1][0]),
                randomFromTo(snowBounds[0][1], snowBounds[1][1]),
            ];

            points.push({
                colored,
                coords,
                velocity: colored
                    ? [velocity[0], velocity[1]]
                    : [
                          randomFromTo(
                              velocity[0] - velocityDelta[0],
                              velocity[0] + velocityDelta[0],
                          ),
                          randomFromTo(
                              velocity[1] - velocityDelta[1],
                              velocity[1] + velocityDelta[1],
                          ),
                      ],
                color: colored ? [255, 220, 0] : [255, 255, 255],
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
    }
    createPoints();
    if (!repeatSnow) {
        setInterval(createPoints, 14000);
    }

    const mod = (x, y) => x - y * Math.floor(x / y);

    function updatePoint(point, dt, now) {
        const nextX = point.coords[0] + (point.velocity[0] * dt) / 1000;
        const nextY = point.coords[1] + (point.velocity[1] * dt) / 1000;

        if (repeatSnow) {
            const boundedX =
                snowBounds[0][0] +
                mod(nextX - snowBounds[0][0], snowBounds[1][0] - snowBounds[0][0]);

            const boundedY =
                snowBounds[0][1] +
                mod(nextY - snowBounds[0][1], snowBounds[1][1] - snowBounds[0][1]);

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
        } else {
            point.coords = [nextX, nextY];
            if (!point.colored) {
                point.alpha = 0.7;
            }
        }
    }

    /** @type {HTMLImageElement} */
    const cameraImg = container.querySelector('img');
    function updateCameraPosition() {
        if (!cameraImg) {
            return;
        }
        cameraImg.style.display = 'block';
        cameraImg.style.left = `${Math.round(
            snowBounds[0][0] + (snowBounds[1][0] - snowBounds[0][0]) / 2 - cameraImg.width / 2,
        ) + 1}px`;
        cameraImg.style.top = `${Math.round(snowBounds[0][1] - cameraImg.height - 16)}px`;
    }
    if (cameraImg.complete) {
        updateCameraPosition();
    } else {
        cameraImg.addEventListener('load', updateCameraPosition);
    }

    let prevTime = Date.now();
    function render() {
        requestAnimationFrame(render);
        const now = Date.now();
        const dt = now - prevTime;

        if (visible) {
            ctx.clearRect(0, 0, size[0], size[1]);

            ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
            if (repeatSnow) {
                ctx.beginPath();
                ctx.moveTo(snowBounds[0][0], snowBounds[0][1] - 2);
                ctx.lineTo(snowBounds[1][0], snowBounds[0][1] - 2);
                ctx.moveTo(snowBounds[0][0], snowBounds[1][1] + 2);
                ctx.lineTo(snowBounds[1][0], snowBounds[1][1] + 2);
                ctx.stroke();
            }

            ctx.beginPath();
            const centerX = Math.round(
                snowBounds[0][0] + (snowBounds[1][0] - snowBounds[0][0]) / 2,
            );
            ctx.moveTo(centerX - 130, size[1] - 41);
            ctx.lineTo(centerX, snowBounds[0][1] - 25);
            ctx.lineTo(centerX + 130, size[1] - 41);
            ctx.stroke();

            points.forEach((point) => {
                updatePoint(point, dt, now);

                const { coords } = point;
                ctx.fillStyle = `rgba(${point.color.join(',')}, ${point.alpha})`;
                ctx.beginPath();
                ctx.arc(coords[0], coords[1], point.radius, 0, 2 * Math.PI);
                ctx.fill();
            });
        }

        prevTime = now;
    }
    requestAnimationFrame(render);

    function randomFromTo(from, to) {
        return from + random() * (to - from);
    }

    function lerp(a, b, t) {
        return a + t * (b - a);
    }
})();
