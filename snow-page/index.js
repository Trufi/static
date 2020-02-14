(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = 1;
    canvas.style.zIndex = 9999;
    document.body.appendChild(canvas);

    const gl = canvas.getContext('webgl', {
        antialias: false,
        premultipliedAlpha: true,
        alpha: true,
        failIfMajorPerformanceCaveat: true,
    });

    const size = [10, 10];
    const projectionMatrix = new Float32Array(9);

    function resize() {
        size[0] = window.innerWidth * window.devicePixelRatio;
        size[1] = window.innerHeight * window.devicePixelRatio;
        canvas.width = size[0];
        canvas.height = size[1];
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        projection(projectionMatrix, size[0], size[1]);
        gl.viewport(0, 0, size[0], size[1]);
    }
    resize();
    window.addEventListener('resize', resize);

    const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_velocity;
    attribute vec2 a_dest;
    attribute float a_scale;

    uniform mat3 u_projectionMatrix;
    uniform float u_time;
    uniform vec2 u_screen_size;
    uniform float u_top;
    uniform float u_flake_size;

    varying vec2 v_uv;

    void main() {
        float halfSize = u_flake_size * a_scale / 2.0;
        float min = -halfSize;
        vec2 size = u_screen_size + halfSize * 2.0;
        vec2 position = min + mod(a_position + a_velocity * u_time - vec2(0.0, u_top) - min, size);
        gl_Position = vec4((u_projectionMatrix * vec3(position + a_dest * halfSize, 1.0)).xy, 0.0, 1.0);
        v_uv = (a_dest + 1.0) / 2.0;
    }
`;

    const fragmentShaderSource = `
    precision mediump float;
    uniform sampler2D u_texture;
    varying vec2 v_uv;

    void main() {
        vec4 color = texture2D(u_texture, v_uv);
        gl_FragColor = vec4(color.rgb, color.a * 2.0);
    }
`;

    function createShader(gl, type, shaderSource) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    function createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
        return program;
    }

    function randBetween(min, max) {
        return Math.round(min + (max - min) * Math.random());
    }

    function projection(out, width, height) {
        out[0] = 2 / width;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = -2 / height;
        out[5] = 0;
        out[6] = -1;
        out[7] = 1;
        out[8] = 1;
        return out;
    }

    const destVectors = [
        [-1, -1],
        [1, -1],
        [1, 1],

        [-1, -1],
        [1, 1],
        [-1, 1],
    ];

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    const locations = {
        a_position: gl.getAttribLocation(program, 'a_position'),
        a_velocity: gl.getAttribLocation(program, 'a_velocity'),
        a_dest: gl.getAttribLocation(program, 'a_dest'),
        a_scale: gl.getAttribLocation(program, 'a_scale'),

        u_projectionMatrix: gl.getUniformLocation(program, 'u_projectionMatrix'),
        u_time: gl.getUniformLocation(program, 'u_time'),
        u_screen_size: gl.getUniformLocation(program, 'u_screen_size'),
        u_texture: gl.getUniformLocation(program, 'u_texture'),
        u_top: gl.getUniformLocation(program, 'u_top'),
        u_flake_size: gl.getUniformLocation(program, 'u_flake_size'),
    };

    const image = document.createElement('img');

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    image.onload = () => {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.activeTexture(gl.TEXTURE0);
        requestAnimationFrame(loop);
    };

    image.src =
        'data:image/png;base64,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';

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const array = [];
    const flakesNumber = 10;
    for (let i = 0; i < flakesNumber; i++) {
        const position = [randBetween(0, 6000), randBetween(0, 6000)];
        const velocity = [randBetween(-20, 20), randBetween(10, 50)];
        const scale = randBetween(5, 10) / 10;

        for (let i = 0; i < 6; i++) {
            const dest = destVectors[i];
            array.push(position[0], position[1], velocity[0], velocity[1], dest[0], dest[1], scale);
        }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW);

    gl.clearColor(0, 0, 0, 0);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enableVertexAttribArray(locations.a_position);
    gl.enableVertexAttribArray(locations.a_velocity);
    gl.enableVertexAttribArray(locations.a_dest);
    gl.enableVertexAttribArray(locations.a_scale);

    gl.uniform1i(locations.u_texture, 0);

    gl.vertexAttribPointer(locations.a_position, 2, gl.FLOAT, false, 7 * 4, 0);
    gl.vertexAttribPointer(locations.a_velocity, 2, gl.FLOAT, false, 7 * 4, 2 * 4);
    gl.vertexAttribPointer(locations.a_dest, 2, gl.FLOAT, false, 7 * 4, 4 * 4);
    gl.vertexAttribPointer(locations.a_scale, 1, gl.FLOAT, false, 7 * 4, 6 * 4);

    const flakeSize = 60;
    const startTime = Date.now();
    function loop() {
        requestAnimationFrame(loop);
        const time = Date.now() - startTime;
        gl.uniform1f(locations.u_time, time / 1000);
        gl.uniform1f(locations.u_top, window.pageYOffset);
        gl.uniform2fv(locations.u_screen_size, size);
        gl.uniform1f(locations.u_flake_size, flakeSize * window.devicePixelRatio);
        gl.uniformMatrix3fv(locations.u_projectionMatrix, false, projectionMatrix);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, flakesNumber * 6);
    }
})();
