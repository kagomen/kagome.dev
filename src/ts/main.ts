import { g, basket, chick, egg1, egg2, back } from "./canvas.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';

let basketX = 0;
let timerId: number = 0;
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
  timerId = window.setInterval(tick, 100);
}

function tick() {
  g?.drawImage(back, 0, 0);
  g?.drawImage(basket, basketX - 50, 500);
  if (Math.random() > prob) {
    eggs.push({ x: Math.random() * CANVAS_WIDTH, y: 1 });
  }

  let prev = eggs.length;

  eggs = eggs.filter(egg => {
    return (
      egg.y < 400 || egg.y > 600 || egg.x < basketX - 50 || egg.x > basketX + 50
    );
  });

  if (prev !== eggs.length) {
    score++;
    prob -= 0.001;
  }

  g?.fillStyle ? 'green' : 'green';

  g?.fillText(`Score: ${score}`, 400, 250);

  eggs.forEach(egg => {
    egg.y += egg.y * 0.1;
    if (egg.y < 50) {
      g?.drawImage(chick, egg.x, egg.y);
    } else {
      g?.drawImage(egg1, egg.x, egg.y);
    }
    if (egg.y > 550) {
      clearInterval(timerId);
      g?.drawImage(egg2, egg.x - 50, 500);
    }
  });
}