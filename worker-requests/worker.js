const arr = [
    'https://tile1.maps.2gis.com/vt?r=CggIugEQrwEYCA%3D%3D&ts=vector_a',
    'https://tile0.maps.2gis.com/vt?r=CggIugEQrgEYCA%3D%3D&ts=vector_a',
    'https://tile2.maps.2gis.com/vt?r=CggIuwEQrwEYCA%3D%3D&ts=vector_a',
    'https://tile1.maps.2gis.com/vt?r=CggIuwEQrgEYCA%3D%3D&ts=vector_a',
    'https://tile0.maps.2gis.com/vt?r=CggIvV0QwFcYDg%3D%3D&ts=vector_a',
    'https://tile1.maps.2gis.com/vt?r=CggIvV0QwVcYDg%3D%3D&ts=vector_a',
    'https://tile4.maps.2gis.com/vt?r=CggIvF0QwFcYDg%3D%3D&ts=vector_a',
    'https://tile0.maps.2gis.com/vt?r=CggIvF0QwVcYDg%3D%3D&ts=vector_a',
    'https://tile1.maps.2gis.com/vt?r=CggIvl0QwFcYDg%3D%3D&ts=vector_a',
    'https://tile4.maps.2gis.com/vt?r=CggIvV0Qv1cYDg%3D%3D&ts=vector_a',
    'https://tile2.maps.2gis.com/vt?r=CggIvl0QwVcYDg%3D%3D&ts=vector_a',
    'https://tile3.maps.2gis.com/vt?r=CggIvF0Qv1cYDg%3D%3D&ts=vector_a',
    'https://tile0.maps.2gis.com/vt?r=CggIvl0Qv1cYDg%3D%3D&ts=vector_a',
    'https://tile2.maps.2gis.com/vt?r=CggIvV0QwlcYDg%3D%3D&ts=vector_a',
    'https://tile3.maps.2gis.com/vt?r=CggIu10QwFcYDg%3D%3D&ts=vector_a',
    'https://tile1.maps.2gis.com/vt?r=CggIvF0QwlcYDg%3D%3D&ts=vector_a',
    'https://tile4.maps.2gis.com/vt?r=CggIu10QwVcYDg%3D%3D&ts=vector_a',
    'https://tile3.maps.2gis.com/vt?r=CggIvl0QwlcYDg%3D%3D&ts=vector_a',
    'https://tile2.maps.2gis.com/vt?r=CggIu10Qv1cYDg%3D%3D&ts=vector_a',
    'https://tile2.maps.2gis.com/vt?r=CggIv10QwFcYDg%3D%3D&ts=vector_a',
    'https://tile3.maps.2gis.com/vt?r=CggIvV0QvlcYDg%3D%3D&ts=vector_a',
    'https://tile3.maps.2gis.com/vt?r=CggIv10QwVcYDg%3D%3D&ts=vector_a',
    'https://tile2.maps.2gis.com/vt?r=CggIvF0QvlcYDg%3D%3D&ts=vector_a',
    'https://tile0.maps.2gis.com/vt?r=CggIu10QwlcYDg%3D%3D&ts=vector_a',
    'https://tile1.maps.2gis.com/vt?r=CggIv10Qv1cYDg%3D%3D&ts=vector_a',
    'https://tile4.maps.2gis.com/vt?r=CggIvl0QvlcYDg%3D%3D&ts=vector_a',
    'https://tile4.maps.2gis.com/vt?r=CggIv10QwlcYDg%3D%3D&ts=vector_a',
    'https://tile2.maps.2gis.com/vt?r=CggIul0QwFcYDg%3D%3D&ts=vector_a',
    'https://tile1.maps.2gis.com/vt?r=CggIu10QvlcYDg%3D%3D&ts=vector_a',
    'https://tile3.maps.2gis.com/vt?r=CggIul0QwVcYDg%3D%3D&ts=vector_a',
    'https://tile1.maps.2gis.com/vt?r=CggIul0Qv1cYDg%3D%3D&ts=vector_a',
    'https://tile0.maps.2gis.com/vt?r=CggIv10QvlcYDg%3D%3D&ts=vector_a',
    'https://tile3.maps.2gis.com/vt?r=CggIwF0QwFcYDg%3D%3D&ts=vector_a',
    'https://tile4.maps.2gis.com/vt?r=CggIwF0QwVcYDg%3D%3D&ts=vector_a',
    'https://tile4.maps.2gis.com/vt?r=CggIul0QwlcYDg%3D%3D&ts=vector_a',
    'https://tile2.maps.2gis.com/vt?r=CggIwF0Qv1cYDg%3D%3D&ts=vector_a',
    'https://tile0.maps.2gis.com/vt?r=CggIul0QvlcYDg%3D%3D&ts=vector_a',
    'https://tile0.maps.2gis.com/vt?r=CggIwF0QwlcYDg%3D%3D&ts=vector_a',
    'https://tile1.maps.2gis.com/vt?r=CggIuV0QwFcYDg%3D%3D&ts=vector_a',
    'https://tile2.maps.2gis.com/vt?r=CggIuV0QwVcYDg%3D%3D&ts=vector_a',
    'https://tile1.maps.2gis.com/vt?r=CggIwF0QvlcYDg%3D%3D&ts=vector_a',
    'https://tile0.maps.2gis.com/vt?r=CggIuV0Qv1cYDg%3D%3D&ts=vector_a',
    'https://tile3.maps.2gis.com/vt?r=CggIuV0QwlcYDg%3D%3D&ts=vector_a',
    'https://tile4.maps.2gis.com/vt?r=CggIwV0QwFcYDg%3D%3D&ts=vector_a',
    'https://tile0.maps.2gis.com/vt?r=CggIwV0QwVcYDg%3D%3D&ts=vector_a',
    'https://tile3.maps.2gis.com/vt?r=CggIwV0Qv1cYDg%3D%3D&ts=vector_a',
    'https://tile4.maps.2gis.com/vt?r=CggIuV0QvlcYDg%3D%3D&ts=vector_a',
    'https://tile1.maps.2gis.com/vt?r=CggIwV0QwlcYDg%3D%3D&ts=vector_a',
    'https://tile2.maps.2gis.com/vt?r=CggIwV0QvlcYDg%3D%3D&ts=vector_a'
];
function getArrayBuffer(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';

    xhr.onerror = function() {
        cb(xhr.status);
    };
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
            cb(null, xhr.response);
        } else {
            cb(xhr.status);
        }
    };
    xhr.send();
}

self.onmessage = () => {
    const start = Date.now();
    console.log('worker start at ' + String(start).slice(-7));

    const results = [];
    let i = 0;
    arr.forEach((url) => {
        getArrayBuffer(url, (err, data) => {
            if (!err) {
                results.push(data);
            }

            console.log('worker get data at ' + String(Date.now()).slice(-7));

            i++;
            if (i === arr.length) {
                end();
            }
        });
    });

    function end() {
        console.log('worker end at ' + String(Date.now()).slice(-7));
        // console.log(results);
        self.postMessage('end');
    }
};
