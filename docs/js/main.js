import { g, loveImg, playerImg, rainImg, ripImg, saltImg } from "./canvas.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT, IMAGE_SIZE, PLAYER_Y, BG_COLOR, gameClearTime, saltFallingSpeed, rainFallingSpeed, initialHpStatus } from './constants.js';
import { gameClearSound, gameOverSound, hpUpSound, hpDownSound } from "./sound.js";
let playerX = CANVAS_WIDTH / 2;
let timerId = 0;
let rainProb = 0.8;
let saltProb = 0.6;
let raindrops;
let salts;
let hpStatus = 10;
let startTime;
window.addEventListener('load', () => {
    init();
});
function init() {
    raindrops = [];
    salts = [];
    startTime = Date.now();
    timerId = window.setInterval(draw, 60);
    updatePlayerX();
}
function draw() {
    // 背景を描画
    g.fillStyle = BG_COLOR;
    g?.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // プレーヤーを描画
    g?.drawImage(playerImg, playerX - (IMAGE_SIZE / 2), PLAYER_Y - (IMAGE_SIZE / 2), IMAGE_SIZE, IMAGE_SIZE);
    // HPバーを描画
    g.strokeStyle = 'white';
    g.lineWidth = 2;
    const rectWidth = IMAGE_SIZE * 1.2;
    g?.strokeRect(playerX - (rectWidth / 2), PLAYER_Y + 20, rectWidth, IMAGE_SIZE * 0.15);
    updateRain();
    updateSalt();
    // 残りHPを描画
    g.fillStyle = 'rgba(255, 255, 255, 0.9)';
    g?.fillRect(playerX - (rectWidth / 2), PLAYER_Y + 20, rectWidth * (hpStatus / 10), IMAGE_SIZE * 0.15);
    // タイムを描画
    g.font = "32px MenuCard, sans-serif";
    g.textAlign = 'center';
    const elapsedTime = gameClearTime - Math.floor((Date.now() - startTime) / 1000);
    g?.fillText(`${elapsedTime}`, CANVAS_WIDTH * (50 / 100), CANVAS_HEIGHT * (30 / 100));
    drawRain();
    drawSalt();
    // ゲームオーバー判定
    if (hpStatus < 1) {
        clearInterval(timerId);
        drawGameOver();
        gameOverSound.play();
    }
    // クリア判定
    if (elapsedTime <= 0) {
        clearInterval(timerId);
        drawGameClear();
        gameClearSound.play();
    }
}
function updatePlayerX() {
    window.addEventListener('keydown', (e) => {
        if (playerX <= IMAGE_SIZE / 2) {
            playerX = IMAGE_SIZE / 2;
        }
        if (playerX >= CANVAS_WIDTH - IMAGE_SIZE / 2) {
            playerX = CANVAS_WIDTH - IMAGE_SIZE / 2;
        }
        if (e.code === 'ArrowLeft') {
            playerX -= 6;
        }
        else if (e.code === 'ArrowRight') {
            playerX += 6;
        }
        else {
            return;
        }
    });
}
function updateRain() {
    if (Math.random() > rainProb) {
        raindrops.push({ x: Math.random() * CANVAS_WIDTH, y: 1 });
    }
    let prev = raindrops.length;
    raindrops = raindrops.filter(rain => {
        return (
        // プレイヤーがキャッチしたら配列に戻す
        rain.y < PLAYER_Y - (IMAGE_SIZE / 2) || rain.y > CANVAS_HEIGHT || rain.x < playerX - (IMAGE_SIZE / 2) || rain.x > playerX + (IMAGE_SIZE / 2));
    });
    if (prev !== raindrops.length) {
        rainProb += 0.01;
        if (hpStatus > initialHpStatus) {
            hpStatus = 10;
        }
        else {
            hpStatus += 1;
            hpUpSound.play();
        }
    }
}
function updateSalt() {
    if (Math.random() > saltProb) {
        salts.push({ x: Math.random() * CANVAS_WIDTH, y: 1 });
    }
    let prev = salts.length;
    salts = salts.filter(salt => {
        return (
        // プレイヤーがキャッチしたら配列に戻す
        salt.y < PLAYER_Y - (IMAGE_SIZE / 2) || salt.y > CANVAS_HEIGHT || salt.x < playerX - (IMAGE_SIZE / 2) || salt.x > playerX + (IMAGE_SIZE / 2));
    });
    if (prev !== salts.length) {
        hpStatus -= 3;
        saltProb -= 0.2;
        hpDownSound.play();
    }
}
function drawRain() {
    raindrops.forEach(rain => {
        rain.y += rain.y * rainFallingSpeed;
        g?.drawImage(rainImg, rain.x - (IMAGE_SIZE / 2), rain.y - (IMAGE_SIZE / 2), IMAGE_SIZE, IMAGE_SIZE);
    });
}
function drawSalt() {
    salts.forEach(salt => {
        salt.y += salt.y * saltFallingSpeed;
        g?.drawImage(saltImg, salt.x - (IMAGE_SIZE / 2), salt.y - (IMAGE_SIZE / 2), IMAGE_SIZE, IMAGE_SIZE);
    });
}
function drawGameOver() {
    g.fillStyle = BG_COLOR;
    g?.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    g.font = "12px MenuCard, sans-serif";
    g.fillStyle = 'white';
    g.textAlign = 'center';
    g?.fillText('GAME OVER', CANVAS_WIDTH * (50 / 100), CANVAS_HEIGHT * (40 / 100));
    g?.drawImage(ripImg, (CANVAS_WIDTH - IMAGE_SIZE) / 2, CANVAS_HEIGHT / 2, IMAGE_SIZE, IMAGE_SIZE);
}
function drawGameClear() {
    g.fillStyle = BG_COLOR;
    g?.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    g.font = "12px MenuCard, sans-serif";
    g.fillStyle = 'white';
    g.textAlign = 'center';
    g?.fillText('GAME CLEAR!', CANVAS_WIDTH * (50 / 100), CANVAS_HEIGHT * (40 / 100));
    g?.drawImage(loveImg, (CANVAS_WIDTH - IMAGE_SIZE) / 2, CANVAS_HEIGHT / 2, IMAGE_SIZE, IMAGE_SIZE);
}
