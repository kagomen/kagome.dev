import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const dpr = window.devicePixelRatio || 1; // dprに対応していないPCの場合、1を返す
canvas.width = CANVAS_WIDTH * dpr;
canvas.height = CANVAS_HEIGHT * dpr;
export const g: CanvasRenderingContext2D | null = canvas.getContext('2d');
g?.scale(dpr, dpr);
canvas.style.width = `${CANVAS_WIDTH}px`;
canvas.style.height = `${CANVAS_HEIGHT}px`;

export const playerImg = new Image();
playerImg.src = './assets/game-img/katatsumuri.png';

export const rainImg = new Image();
rainImg.src = './assets/game-img/rain.png';

export const afterRainImg = new Image();
afterRainImg.src = './assets/game-img/after_rain.png';

export const saltImg = new Image();
saltImg.src = './assets/game-img/salt.png';

export const ripImg = new Image();
ripImg.src = './assets/game-img/rip.png';



