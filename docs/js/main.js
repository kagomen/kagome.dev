import { g, playerImg, rainImg } from "./canvas.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT, IMAGE_SIZE, PLAYER_Y, BG_COLOR, PLAYER_CATCH_WIDTH, PLAYER_CATCH_HEIGHT } from './constants.js';
let playerX = 0;
export let timerId = 0;
let prob = 0.96;
let raindrops;
let score = 0;
window.addEventListener('load', () => {
    init();
});
function init() {
    raindrops = [];
    window.addEventListener('mousemove', (e) => {
        playerX = e.clientX - document.getElementById('canvas').getBoundingClientRect().left;
    });
    timerId = window.setInterval(draw, 60);
}
function draw() {
    g.fillStyle = BG_COLOR;
    g?.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    g?.drawImage(playerImg, playerX - (IMAGE_SIZE / 2), PLAYER_Y, IMAGE_SIZE, IMAGE_SIZE);
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
    // スコア表示
    g.fillStyle = 'white';
    g?.fillText(`Score: ${score}`, CANVAS_WIDTH * (80 / 100), CANVAS_HEIGHT * (10 / 100));
    raindrops.forEach(rain => {
        rain.y += rain.y * 0.05; // 落下速度を加速度的に上げる
        g?.drawImage(rainImg, rain.x, rain.y, IMAGE_SIZE, IMAGE_SIZE);
        if (rain.y > PLAYER_Y + (PLAYER_CATCH_HEIGHT / 2)) {
            clearInterval(timerId);
        }
    });
}
