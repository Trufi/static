var map = new mapgl.Map('container', {
    center: [55.185346, 25.14226],
    zoom: 17.2,
    pitch: 38,
    minZoom: 2,
    key: '042b5b75-f847-4f2a-b695-b5f58adc9dfd',
});

window.addEventListener('resize', () => map.invalidateSize());
