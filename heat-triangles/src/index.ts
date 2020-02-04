import { projectGeoToMap } from '@2gis/jakarta/dist/es6/utils/geo';
import Delaunator from 'delaunator';
import { lerp, hslToRgb } from './utils';

declare const mapgl: any;

const map = ((window as any).map = new mapgl.Map('map', {
    center: [37.62017, 55.753466],
    zoom: 11,
    key: '042b5b75-f847-4f2a-b695-b5f58adc9dfd',
    zoomControl: false,
}));

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const gl = canvas.getContext('webgl', {
    antialias: false,
    premultipliedAlpha: false,
    alpha: true,
}) as WebGLRenderingContext;

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

gl.viewport(0, 0, width, height);

// Создаем шейдеры
const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;

const vertexCode = `
    attribute vec3 a_position;
    attribute vec3 a_color;
    uniform mat4 u_model;
    varying vec3 v_color;

    void main(void) {
        v_color = a_color;
        gl_Position = u_model * vec4(a_position, 1.0);
    }
`;

const fragmentCode = `
    precision mediump float;
    varying vec3 v_color;

    void main(void) {
        gl_FragColor = vec4(v_color.rgb, 0.7);
    }
`;

gl.shaderSource(vertexShader, vertexCode);
gl.shaderSource(fragmentShader, fragmentCode);

gl.compileShader(vertexShader);
gl.compileShader(fragmentShader);

// Проверяем на ошибки
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
}
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(fragmentShader));
}

const program = gl.createProgram() as WebGLProgram;
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log('Could not initialize shaders');
}

// Получим местоположение переменных в программе шейдеров
const locations = {
    aPosition: gl.getAttribLocation(program, 'a_position'),
    aColor: gl.getAttribLocation(program, 'a_color'),
    uModel: gl.getUniformLocation(program, 'u_model'),
};

// Создаем данные
const vertexBuffer = gl.createBuffer();
const colorBuffer = gl.createBuffer();

const bounds = [
    projectGeoToMap([37.53468263266983, 55.8057898485786]),
    projectGeoToMap([37.73449647407034, 55.680559093862406]),
];

fetch('./data.csv')
    .then((res) => res.text())
    .then((res) => {
        const rows = res.split('\n').slice(1);
        let points = rows.map((str) => str.split(',').map(Number));
        points.forEach((point) => {
            const lngLat = [point[0], point[1]];
            const mapPoint = projectGeoToMap(lngLat);
            point[0] = mapPoint[0];
            point[1] = mapPoint[1];
        });
        points = points.filter((point) => {
            return (
                point[0] > bounds[0][0] &&
                point[0] < bounds[1][0] &&
                point[1] > bounds[1][1] &&
                point[1] < bounds[0][1]
            );
        });

        const delaunay = Delaunator.from(points);

        const temps: number[] = [];
        for (let i = 0; i < points.length; i++) {
            temps.push(points[i][2]);
        }
        temps.sort((a, b) => a - b);
        const maxTemp = temps[Math.floor(temps.length * 0.9)];
        const minTemp = temps[0];

        const colors: number[] = [];
        const vertices: number[] = [];
        delaunay.triangles.forEach((index) => {
            const value = points[index][2];
            const t = Math.min(value - minTemp, maxTemp - minTemp) / (maxTemp - minTemp);

            const h = 100 - Math.round(lerp(0, 100, t));
            const rgb = hslToRgb(h, 1, 0.5);
            const [r, g, b] = rgb.map((x) => x / 255);

            colors.push(r, g, b);

            vertices.push(points[index][0], points[index][1], t * 200000);
        });

        console.log(vertices);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        function renderLoop() {
            requestAnimationFrame(renderLoop);

            // Укажем какую шейдерную программу мы намерены далее использовать
            gl.useProgram(program);

            gl.uniformMatrix4fv(locations.uModel, false, map._impl.modules.renderer.vpMatrix);

            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LESS);

            // Связываем данные цветов
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.enableVertexAttribArray(locations.aColor);
            // Вторым аргументом передаём размерность, RGB имеет 3 компоненты
            gl.vertexAttribPointer(locations.aColor, 3, gl.FLOAT, false, 0, 0);

            // И вершин
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.enableVertexAttribArray(locations.aPosition);
            gl.vertexAttribPointer(locations.aPosition, 3, gl.FLOAT, false, 0, 0);

            // gl.enable(gl.CULL_FACE);

            // Очищаем сцену, закрашивая её в белый цвет
            gl.clearColor(1, 1, 1, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Рисуем треугольник
            // Третьим аргументом передаём количество вершин геометрии
            gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
        }
        requestAnimationFrame(renderLoop);
    });

export {};
