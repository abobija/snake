import Game from './game';

const canvas: HTMLCanvasElement = document.getElementById('arena') as HTMLCanvasElement;

new Game(canvas).start();