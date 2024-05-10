import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
export const g: CanvasRenderingContext2D | null = canvas.getContext('2d');

export const playerImg = new Image();
playerImg.src = './assets/game-img/player.png';

export const rainImg = new Image();
rainImg.src = './assets/game-img/rain.png';

export const afterRainImg = new Image();
afterRainImg.src = './assets/game-img/after_rain.png';

export const saltImg = new Image();
saltImg.src = './assets/game-img/salt.png';