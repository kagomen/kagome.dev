const volume = 0.1;

export const gameClearSound = new Howl({
  src: ['./assets/sound/gameclear.mp3'],
  volume: volume,
});
export const gameOverSound = new Howl({
  src: ['./assets/sound/gameover.mp3'],
  volume: volume,
});
export const hpUpSound = new Howl({
  src: ['./assets/sound/hp__up.wav'],
  volume: 0.5,
});
export const hpDownSound = new Howl({
  src: ['./assets/sound/hp__down.wav'],
  volume: 0.5,
});