const worker = new Worker('./worker.js');

function parseQuery() {
    const res = {};
    location.search.slice(1).split('&')
        .map((str) => str.split('='))
        .forEach((couple) => {
            res[couple[0]] = couple[1];
        });
    return res;
}

let delay = 150;

const query = parseQuery();

if (query && query.delay) {
    delay = Number(query.delay);
}

console.log('delay ' + delay);

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
}, delay);
