import Vector from "./vector";

export default class Scalable {
    scale: number;
    position: Vector;

    constructor(scale: number, position: Vector) {
        this.scale = scale;
        this.position = position;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillRect(
            this.position.x * this.scale,
            this.position.y * this.scale,
            this.scale,
            this.scale
        );
    }
}