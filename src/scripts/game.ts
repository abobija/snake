import Snake, { Direction } from "./snake";
import Vector from "./vector";
import Food from "./food";
import Random from "./random";

export enum KEYS {
    ARROW_LEFT  = 37,
    ARROW_UP    = 38,
    ARROW_RIGHT = 39,
    ARROW_DOWN  = 40
}

export interface GameSettings {
    width?: number;
    height?: number;
    scale?: number;
    speed?: number;
}

const DefaultSettings: GameSettings = {
    width: 40,
    height: 30,
    scale: 15,
    speed: 50
}

export default class Game {
    private context: CanvasRenderingContext2D;
    private settings: GameSettings;

    private snake: Snake;
    private food: Food;
    private timestamp?: number = 0;

    private nextKey: number | null = null;

    constructor(canvas: HTMLCanvasElement, settings: GameSettings = {}) {
        this.context = canvas.getContext('2d');
        this.settings = { ...DefaultSettings, ...settings };

        this.snake = new Snake(this.settings.scale, new Vector(0, 0));
    }

    start(): void {
        this.canvas.width = this.settings.width * this.settings.scale;
        this.canvas.height = this.settings.height * this.settings.scale;

        this.attachKeyboard();
        this.placeFood();
        this.update();
    }

    private placeFood(): void {
        const x = Random.Generate(0, this.settings.width - 1);
        const y = Random.Generate(0, this.settings.height - 1);

        this.food = new Food(this.settings.scale, new Vector(x, y));
    }

    private attachKeyboard(): void {
        document.addEventListener('keydown', e => {
            if(this.nextKey == null || this.nextKey != e.keyCode) {
                this.nextKey = e.keyCode;
            }
        });
    }

    update(timestamp?: number): void {
        timestamp = timestamp || 0;

        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.draw(this.context);

        if(timestamp - this.timestamp >= this.settings.speed) {
            this.timestamp = timestamp;

            if(this.nextKey != null) {
                this.checkKey();
                this.nextKey = null;
            }

            if(this.snake.move(this.settings.width - 1, this.settings.height - 1)) {
                console.log('Game over');
                return;
            }

            this.checkFoodCollision();
        }

        this.food.draw(this.context);

        requestAnimationFrame(this.update.bind(this));
    }

    private checkKey(): void {
        switch(this.nextKey) {
            case KEYS.ARROW_LEFT:
                this.snake.direction = Direction.LEFT;
                break;
            case KEYS.ARROW_UP:
                this.snake.direction = Direction.UP;
                break;
            case KEYS.ARROW_RIGHT:
                this.snake.direction = Direction.RIGHT;
                break;
            case KEYS.ARROW_DOWN:
                this.snake.direction = Direction.DOWN;
                break;
        }
    }

    private checkFoodCollision(): void {
        if(this.snake.position.equals(this.food.position)) {
            this.snake.eat(this.food);
            this.placeFood();
        }
    }

    get canvas(): HTMLCanvasElement {
        return this.context.canvas;
    }
}