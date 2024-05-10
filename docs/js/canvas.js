import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';
const canvas = document.getElementById('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
export const g = canvas.getContext('2d');
export const playerImg = new Image();
playerImg.src = './assets/game-img/player.png';
export const rainImg = new Image();
rainImg.src = './assets/game-img/rain.png';
export const afterRainImg = new Image();
afterRainImg.src = './assets/game-img/after_rain.png';
