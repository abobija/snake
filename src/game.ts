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

export default class Game {
    static WIDTH: number = 70;
    static HEIGHT: number = 50;
    static SCALE: number = 10;
    static SPEED: number = 50;

    private context: CanvasRenderingContext2D;
    private snake: Snake;
    private food: Food;
    private timestamp?: number = 0;

    private nextKey: number | null = null;

    constructor(canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d');
        this.snake = new Snake(Game.SCALE, new Vector(0, 0));
        this.placeFood();
    }

    start() {
        this.canvas.width = Game.WIDTH * Game.SCALE;
        this.canvas.height = Game.HEIGHT * Game.SCALE;

        this.attachKeyboard();
        this.update();
    }

    private placeFood() {
        const x = Random.Generate(0, Game.WIDTH - 1);
        const y = Random.Generate(0, Game.HEIGHT - 1);

        this.food = new Food(Game.SCALE, new Vector(x, y));
    }

    private attachKeyboard() {
        document.addEventListener('keydown', e => {
            if(this.nextKey == null || this.nextKey != e.keyCode) {
                this.nextKey = e.keyCode;
            }
        });
    }

    update(timestamp?: number) {
        timestamp = timestamp || 0;

        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.draw(this.context);

        if(timestamp - this.timestamp >= Game.SPEED) {
            this.timestamp = timestamp;

            if(this.nextKey != null) {
                this.checkKey();
                this.nextKey = null;
            }

            this.snake.move();
            this.checkArenaBoundaries();
            this.checkFoodCollision();
        }

        this.food.draw(this.context);

        requestAnimationFrame(this.update.bind(this));
    }

    private checkFoodCollision() {
        if(this.snake.position.equals(this.food.position)) {
            this.snake.eat(this.food);
            this.placeFood();
        }
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

    private checkArenaBoundaries(): void {
        if(this.snake.position.x < 0) {
            this.snake.position.x = Game.WIDTH - 1;
        }

        if(this.snake.position.y < 0) {
            this.snake.position.y = Game.HEIGHT - 1;
        }

        if(this.snake.position.x > Game.WIDTH - 1) {
            this.snake.position.x = 0;
        }

        if(this.snake.position.y > Game.HEIGHT - 1) {
            this.snake.position.y = 0;
        }
    }

    get canvas(): HTMLCanvasElement {
        return this.context.canvas;
    }
}