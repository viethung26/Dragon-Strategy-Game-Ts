import GameObject from './GameObject';
const order = 2
export default class Modal extends GameObject {
    update(): void {
        throw new Error("Method not implemented.");
    }
    constructor(x, y, w, h) {
        super(x, y, w, h, order)

    }

    render(c2d: CanvasRenderingContext2D): void {
    }

    isIntesect(x: number, y: number): boolean {
        return false
    }

    handleClick(): void {
    }
}