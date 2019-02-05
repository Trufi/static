const worker = new Worker('./worker.js');

worker.onmessage = (ev) => {
    console.log('main receive worker message at ' + String(Date.now()).slice(-7));
    const div = document.createElement('div');
    div.innerHTML = 'finish';
    document.body.appendChild(div);
};

worker.postMessage('go');

setTimeout(() => {
    const start = Date.now();
    console.log('main start throttle at ' + String(start).slice(-7));
    let time = start;

    while (time - start < 4000) {
        time = Date.now();
    }

    console.log('main end throttle at ' + String(time).slice(-7));
}, 300);
