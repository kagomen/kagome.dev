import { g, basket, egg1, egg2 } from "./canvas.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT, PLAYER_WIDTH, PLAYER_Y, PLAYER_HEIGHT, BG_COLOR } from './constants.js';

let basketX = 0;
export let timerId: number = 0;
let prob = 0.96;
let eggs: { x: number; y: number; }[];
let score = 0;

window.addEventListener('load', () => {
  init();
});

function init() {
  eggs = [];
  window.addEventListener('mousemove', (e) => {
    basketX = e.clientX;
  });
  timerId = window.setInterval(draw, 60);
}

function draw() {
  g!.fillStyle = BG_COLOR;
  g?.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  g?.drawImage(basket, basketX - (PLAYER_WIDTH / 2), PLAYER_Y, 32, 32);
  if (Math.random() > prob) {
    eggs.push({ x: Math.random() * CANVAS_WIDTH, y: 1 });
  }

  let prev = eggs.length;

  eggs = eggs.filter(egg => {
    return (
      // プレイヤーがキャッチしたら配列に戻す
      egg.y < PLAYER_Y - (PLAYER_HEIGHT / 2) || egg.y > CANVAS_HEIGHT || egg.x < basketX - (PLAYER_WIDTH / 2) || egg.x > basketX + (PLAYER_WIDTH / 2)
    );
  });

  if (prev !== eggs.length) {
    score++;
    prob -= 0.001;
  }

  g!.fillStyle = 'white';
  g?.fillText(`Score: ${score}`, CANVAS_WIDTH * (80 / 100), CANVAS_HEIGHT * (10 / 100));

  eggs.forEach(egg => {
    egg.y += egg.y * 0.05;  // 落下速度を加速度的に上げる

    g?.drawImage(egg1, egg.x, egg.y, 24, 24);

    if (egg.y > 550) {
      clearInterval(timerId);
      g?.drawImage(egg2, egg.x, PLAYER_Y, 24, 24);
    }
  });
}