import { g, loveImg, playerImg, rainImg, ripImg, saltImg } from "./canvas.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT, IMAGE_SIZE, PLAYER_Y, BG_COLOR, gameClearTime } from './constants.js';

let playerX = CANVAS_WIDTH / 2;
export let timerId: number = 0;
let rainProb = 0.8;
let saltProb = 0.8;
let raindrops: { x: number; y: number; }[];
let salts: { x: number; y: number; }[];
let hpStatus = 10;
let startTime: number;

window.addEventListener('load', () => {
  init();
});

function init() {
  raindrops = [];
  salts = [];
  startTime = Date.now();
  timerId = window.setInterval(draw, 60);
}

function draw() {

  // 背景を描画
  g!.fillStyle = BG_COLOR;
  g?.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // プレーヤーを描画
  updatePlayerX();
  g?.drawImage(playerImg, playerX - (IMAGE_SIZE / 2), PLAYER_Y - (IMAGE_SIZE / 2), IMAGE_SIZE, IMAGE_SIZE);

  updateRain();
  updateSalt();

  // スコア表示
  g!.font = "10px MenuCard, sans-serif";
  g!.fillStyle = 'white';
  g?.fillText(`HP: ${hpStatus}`, CANVAS_WIDTH * (80 / 100), CANVAS_HEIGHT * (10 / 100));

  // タイム表示
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  g?.fillText(`TIME: ${elapsedTime}`, CANVAS_WIDTH * (10 / 100), CANVAS_HEIGHT * (10 / 100));

  drawRain();
  drawSalt();

  // ゲームオーバー判定
  if (hpStatus < 1) {
    clearInterval(timerId);
    drawGameOver();
  }

  // クリア判定
  if (elapsedTime >= gameClearTime) {
    clearInterval(timerId);
    drawGameClear();
  }
}

function updatePlayerX() {
  window.addEventListener('mousemove', (e) => {
    playerX = e.clientX - document.getElementById('canvas')!.getBoundingClientRect().left;
    if (playerX <= IMAGE_SIZE / 2) {
      playerX = IMAGE_SIZE / 2;
    }
    if (playerX >= CANVAS_WIDTH - IMAGE_SIZE / 2) {
      playerX = CANVAS_WIDTH - IMAGE_SIZE / 2;
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
      rain.y < PLAYER_Y - (IMAGE_SIZE / 2) || rain.y > CANVAS_HEIGHT || rain.x < playerX - (IMAGE_SIZE / 2) || rain.x > playerX + (IMAGE_SIZE / 2)
    );
  });

  if (prev !== raindrops.length) {
    hpStatus += 1;
    rainProb -= 0.1;
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
      salt.y < PLAYER_Y - (IMAGE_SIZE / 2) || salt.y > CANVAS_HEIGHT || salt.x < playerX - (IMAGE_SIZE / 2) || salt.x > playerX + (IMAGE_SIZE / 2)
    );
  });

  if (prev !== salts.length) {
    hpStatus -= 3;
    saltProb -= 0.1;
  }
}

function drawRain() {
  raindrops.forEach(rain => {
    rain.y += rain.y * 0.15;  // 落下速度を加速度的に上げる

    g?.drawImage(rainImg, rain.x - (IMAGE_SIZE / 2), rain.y - (IMAGE_SIZE / 2), IMAGE_SIZE, IMAGE_SIZE);
  });
}

function drawSalt() {
  salts.forEach(salt => {
    salt.y += salt.y * 0.15;  // 落下速度を加速度的に上げる

    g?.drawImage(saltImg, salt.x - (IMAGE_SIZE / 2), salt.y - (IMAGE_SIZE / 2), IMAGE_SIZE, IMAGE_SIZE);
  });
}

function drawGameOver() {
  g!.fillStyle = BG_COLOR;
  g?.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  g!.font = "12px MenuCard, sans-serif";
  g!.fillStyle = 'white';
  g!.textAlign = 'center';
  g?.fillText('GAME OVER', CANVAS_WIDTH * (50 / 100), CANVAS_HEIGHT * (40 / 100));
  g?.drawImage(ripImg, (CANVAS_WIDTH - IMAGE_SIZE) / 2, CANVAS_HEIGHT / 2, IMAGE_SIZE, IMAGE_SIZE);
}

function drawGameClear() {
  g!.fillStyle = BG_COLOR;
  g?.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  g!.font = "12px MenuCard, sans-serif";
  g!.fillStyle = 'white';
  g!.textAlign = 'center';
  g?.fillText('GAME CLEAR!', CANVAS_WIDTH * (50 / 100), CANVAS_HEIGHT * (40 / 100));
  g?.drawImage(loveImg, (CANVAS_WIDTH - IMAGE_SIZE) / 2, CANVAS_HEIGHT / 2, IMAGE_SIZE, IMAGE_SIZE);
}