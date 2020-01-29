const map = new mapgl.Map('map', {
    center: [82.920412, 55.030111],
    zoom: 15,
    key: '042b5b75-f847-4f2a-b695-b5f58adc9dfd',
    zoomControl: false,
});

const worker = new Worker('./worker.js');

const canvas = document.getElementById('snow');
const width = canvas.clientWidth;
const height = canvas.clientHeight;

canvas.width = width;
canvas.height = height;

const offscreen = canvas.transferControlToOffscreen();

worker.postMessage({ type: 'enable', offscreen, width, height }, [offscreen]);
