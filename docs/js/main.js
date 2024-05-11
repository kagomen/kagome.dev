import { g, playerImg, rainImg, saltImg } from "./canvas.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT, IMAGE_SIZE, PLAYER_Y, BG_COLOR, PLAYER_CATCH_WIDTH, PLAYER_CATCH_HEIGHT } from './constants.js';
let playerX = 0;
export let timerId = 0;
let prob = 0.96;
let raindrops;
let salts;
let score = 0;
window.addEventListener('load', () => {
    init();
});
function init() {
    raindrops = [];
    salts = [];
    window.addEventListener('mousemove', (e) => {
        playerX = e.clientX - document.getElementById('canvas').getBoundingClientRect().left;
    });
    timerId = window.setInterval(draw, 60);
}
function draw() {
    // 背景を描画
    g.fillStyle = BG_COLOR;
    g?.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // プレーヤーを描画
    g?.drawImage(playerImg, playerX - (IMAGE_SIZE / 2), PLAYER_Y, IMAGE_SIZE, IMAGE_SIZE);
    updateRain();
    updateSalt();
    // スコア表示
    g.fillStyle = 'white';
    g?.fillText(`Score: ${score}`, CANVAS_WIDTH * (80 / 100), CANVAS_HEIGHT * (10 / 100));
    drawRain();
    drawSalt();
}
function updateRain() {
    if (Math.random() > prob) {
        raindrops.push({ x: Math.random() * CANVAS_WIDTH, y: 1 });
    }
    let prev = raindrops.length;
    raindrops = raindrops.filter(rain => {
        return (
        // プレイヤーがキャッチしたら配列に戻す
        rain.y < PLAYER_Y - (IMAGE_SIZE / 2) || rain.y > CANVAS_HEIGHT || rain.x < playerX - (PLAYER_CATCH_WIDTH / 2) || rain.x > playerX + (PLAYER_CATCH_WIDTH / 2));
    });
    if (prev !== raindrops.length) {
        score++;
        prob -= 0.001;
    }
}
function updateSalt() {
    if (Math.random() > prob) {
        salts.push({ x: Math.random() * CANVAS_WIDTH, y: 1 });
    }
    let prev = salts.length;
    salts = salts.filter(salt => {
        return (
        // プレイヤーがキャッチしたら配列に戻す
        salt.y < PLAYER_Y - (IMAGE_SIZE / 2) || salt.y > CANVAS_HEIGHT || salt.x < playerX - (PLAYER_CATCH_WIDTH / 2) || salt.x > playerX + (PLAYER_CATCH_WIDTH / 2));
    });
    if (prev !== salts.length) {
        score++;
        prob -= 0.001;
    }
}
function drawRain() {
    raindrops.forEach(rain => {
        rain.y += rain.y * 0.05; // 落下速度を加速度的に上げる
        g?.drawImage(rainImg, rain.x, rain.y, IMAGE_SIZE, IMAGE_SIZE);
        if (rain.y > PLAYER_Y + (PLAYER_CATCH_HEIGHT / 2)) {
            clearInterval(timerId);
        }
    });
}
function drawSalt() {
    salts.forEach(salt => {
        salt.y += salt.y * 0.05; // 落下速度を加速度的に上げる
        g?.drawImage(saltImg, salt.x, salt.y, IMAGE_SIZE, IMAGE_SIZE);
        if (salt.y > PLAYER_Y + (PLAYER_CATCH_HEIGHT / 2)) {
            clearInterval(timerId);
        }
    });
}
