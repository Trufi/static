const vertexShaderSource = `
attribute vec4 a_snowFlakeProps;
attribute vec2 a_snowFlakeVelocity;
uniform mat3 u_projectionMatrix;
uniform float u_time;
uniform vec2 u_windowSize;
varying vec4 v_color;
void main() {
  vec2 position = mod(a_snowFlakeProps.xy + a_snowFlakeVelocity * u_time, u_windowSize);
  gl_Position = vec4((u_projectionMatrix * vec3(position, 1)).xy, 0, 1);
  gl_PointSize = 2.0 * a_snowFlakeProps.z;
  v_color = vec4(1, 1, 1, a_snowFlakeProps.w);
}
`;

const fragmentShaderSource = `
precision mediump float;
varying vec4 v_color;
void main() {
  vec2 distToCenter = gl_PointCoord - vec2(0.5, 0.5);
  float distToCenterSquared = dot(distToCenter, distToCenter);
  float alpha;
  if (distToCenterSquared < 0.25) {
    alpha = v_color.w;
  } else {
    alpha = 0.0;
  }
  gl_FragColor = vec4(v_color.xyz, alpha);
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

class SnowFlake {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.x = this.y = this.vx = this.vy = this.radius = this.alpha = 0;
        this.reset();
    }

    reset() {
        this.x = this.randBetween(0, this.width);
        this.y = this.randBetween(0, -this.height);
        this.vx = this.randBetween(-3, 3);
        this.vy = this.randBetween(2, 5);
        this.radius = this.randBetween(1, 4);
        this.alpha = this.randBetween(0.7, 1);
    }

    randBetween(min, max) {
        return min + (max - min) * Math.random();
    }

    get props() {
        return [this.x, this.y, this.radius, this.alpha];
    }
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

class Snow {
    constructor(canvas, width, height) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;

        /** @type {WebGLRenderingContext} */
        const gl = (this.gl = canvas.getContext('webgl', {
            antialias: false,
            premultipliedAlpha: false,
            alpha: true,
        }));

        this.projectionMatrix = new Float32Array(9);
        projection(this.projectionMatrix, this.width, this.height);

        this.snowFlakes = this.createSnowFlakes();

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        const program = (this.program = createProgram(gl, vertexShader, fragmentShader));

        this.snowFlakePropsAttribLocation = gl.getAttribLocation(program, 'a_snowFlakeProps');
        this.snowFlakeVelocityAttribLocation = gl.getAttribLocation(program, 'a_snowFlakeVelocity');

        this.projectionMatrixUniformLocation = gl.getUniformLocation(program, 'u_projectionMatrix');
        this.timeUniformLocation = gl.getUniformLocation(program, 'u_time');
        this.windowSizeUniformLocation = gl.getUniformLocation(program, 'u_windowSize');

        this.snowFlakePropsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.snowFlakePropsBuffer);

        const snowFlakesProps = [];
        for (const sf of this.snowFlakes) {
            snowFlakesProps.push(sf.x, sf.y, sf.radius, sf.alpha, sf.vx, sf.vy);
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(snowFlakesProps), gl.STATIC_DRAW);

        gl.viewport(0, 0, this.width, this.height);

        gl.clearColor(1, 1, 1, 0);
        gl.enable(gl.CULL_FACE);
        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enableVertexAttribArray(this.snowFlakePropsAttribLocation);
        gl.enableVertexAttribArray(this.snowFlakeVelocityAttribLocation);
        gl.useProgram(this.program);

        gl.uniformMatrix3fv(this.projectionMatrixUniformLocation, false, this.projectionMatrix);
        gl.uniform2f(this.windowSizeUniformLocation, width, height);

        gl.vertexAttribPointer(this.snowFlakePropsAttribLocation, 4, gl.FLOAT, false, 6 * 4, 0);
        gl.vertexAttribPointer(
            this.snowFlakeVelocityAttribLocation,
            2,
            gl.FLOAT,
            false,
            6 * 4,
            4 * 4,
        );

        this.timeStart = Date.now();

        this.update = () => {
            const gl = this.gl;
            requestAnimationFrame(this.update);

            const time = (Date.now() - this.timeStart) / 100;
            gl.uniform1f(this.timeUniformLocation, time);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, 0, this.snowFlakes.length);
        };

        requestAnimationFrame(this.update);
    }

    createSnowFlakes() {
        const count = this.width / 4;
        const snowFlakes = [];
        for (let i = 0; i < count; i++) {
            snowFlakes.push(new SnowFlake(this.width, this.height));
        }
        return snowFlakes;
    }
}

self.addEventListener('message', (ev) => {
    console.log(ev);
    const { offscreen, width, height } = ev.data;
    new Snow(offscreen, width, height);
});
