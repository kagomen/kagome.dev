import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
export const g: CanvasRenderingContext2D | null = canvas.getContext('2d');

export const basket = new Image();
basket.src = './assets/game-img/player.png';

export const chick = new Image();
chick.src = './assets/game-img/chick.png';

export const egg1 = new Image();
egg1.src = './assets/game-img/rain.png';

export const egg2 = new Image();
egg2.src = './assets/game-img/after_rain.png';

export const back = new Image();
back.src = './assets/game-img/back.png';