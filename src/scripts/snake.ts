import Vector from './vector';
import Scalable from './scalable';
import Food from './food';

export enum Direction {
    LEFT,
    UP,
    RIGHT,
    DOWN
}

export default class Snake extends Scalable {
    direction: Direction = Direction.RIGHT;
    private tail: Scalable[] = [];

    constructor(scale: number, position: Vector) {
        super(scale, position);
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = '#0fd24f';
        super.draw(context);

        context.fillStyle = '#29a050';
        this.tail.forEach(part => part.draw(context));
    }

    move(): void {
        let x = this.position.x;
        let y = this.position.y;

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

        for(let i: number = 0; i < this.tail.length; i++) {
            const tpart = this.tail[i];
            const xtmp = tpart.position.x;
            const ytmp = tpart.position.y;

            tpart.position.set(x, y);

            x = xtmp;
            y = ytmp;
        }
    }

    eat(food: Food): void {
        this.tail.push(new Scalable(this.scale, food.position));
    }
}