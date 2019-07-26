import Game from './scripts/game';

const canvas: HTMLCanvasElement = document.getElementById('arena') as HTMLCanvasElement;
const game = new Game(canvas);

game.on('score', score => {
    console.log(score);
});

game.on('over', score => {
    console.log('Game over. Score:', score);
});

game.start();