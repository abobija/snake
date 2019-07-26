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

    /**
     * 
     * @param maxX width of arena - 1
     * @param maxY height of arena - 1
     * @returns true if there is collision with tail
     */
    move(maxX: number, maxY: number): boolean {
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

        if(this.position.x < 0) {
            this.position.x = maxX;
        }

        if(this.position.y < 0) {
            this.position.y = maxY;
        }

        if(this.position.x > maxX) {
            this.position.x = 0;
        }

        if(this.position.y > maxY) {
            this.position.y = 0;
        }

        for(let tpart of this.tail) {
            if(this.position.equals(tpart.position)) {
                return true;
            }

            const xtmp = tpart.position.x;
            const ytmp = tpart.position.y;

            tpart.position.set(x, y);

            x = xtmp;
            y = ytmp;
        }

        return false;
    }

    eat(food: Food): void {
        this.tail.push(new Scalable(this.scale, food.position));
    }
}