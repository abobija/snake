import Game from './scripts/game';

const canvas: HTMLCanvasElement = document.getElementById('arena') as HTMLCanvasElement;

new Game(canvas).start();