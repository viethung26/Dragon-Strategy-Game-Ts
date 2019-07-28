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
    abstract handleClick(): void

    isIntesect(x: number, y: number) {
        if (this.x - this.w/2 <= x && this.x + this.w/2 >= x && this.y - this.h/2 <= y && this.y + this.h/2 >= y )
            return true
        return false
    }

    setPos(x, y) {
        this.x = x 
        this.y = y
    }
}