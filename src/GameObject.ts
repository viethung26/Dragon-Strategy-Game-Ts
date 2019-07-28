export default abstract class GameObject {
    x: number
    y: number
    w: number
    h: number
    order: number
    constructor(x: number, y:number, w: number, h: number, order: number = 0) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.order = order
    }
    abstract render(c2d: CanvasRenderingContext2D): void
    abstract isIntesect(x: number, y: number): boolean
    abstract handleClick(): void

    setPos(x, y) {
        this.x = x 
        this.y = y
    }
}