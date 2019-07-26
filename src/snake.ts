import Vector from './vector';

export enum Direction {
    LEFT,
    UP,
    RIGHT,
    DOWN
}

export default class Snake {
    scale: number;
    position: Vector;
    direction: Direction = Direction.RIGHT;

    constructor(scale: number, position: Vector) {
        this.scale = scale;
        this.position = position;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'white';

        context.fillRect(
            this.position.x * this.scale,
            this.position.y * this.scale,
            this.scale,
            this.scale
        );
    }

    move(): void {
        switch(this.direction) {
            case Direction.LEFT:
                this.position.x--;
                break;
            case Direction.UP:
                this.position.y--;
                break;
            case Direction.RIGHT:
                this.position.x++;
                break;
            case Direction.DOWN:
                this.position.y++;
                break;
        }
    }
}