import { Howl } from 'howler';
export const gameClearSound = new Howl({
    src: ['../assets/sound/gameclear.mp3']
});
export const gameOverSound = new Howl({
    src: ['../assets/sound/gameover.mp3']
});
export const hpUpSound = new Howl({
    src: ['../assets/sound/hp_up.mp3']
});
export const hpDownSound = new Howl({
    src: ['../assets/sound/hp_down.mp3']
});
// Change global volume.
Howler.volume(0.5);
