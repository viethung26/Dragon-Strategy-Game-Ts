import Point from './Point'

class Rectangle extends Point {
    w: number 
    h: number 
    static isPointInRect(point: Point, rect: Rectangle): boolean {
        if (point.x <= rect.x + rect.w/2 && point.x >= rect.x - rect.w/2 
            && point.y <= rect.y + rect.h/2 && point.y >= rect.y - rect.h/2 ) {
                return true
        }
        return false
    }
    static isIntersection(rectA: Rectangle, rectB: Rectangle): boolean {
        const pointsA = []
        pointsA.push(new Point(rectA.x - rectA.w/2, rectA.y - rectA.h/2))
        pointsA.push(new Point(rectA.x + rectA.w/2, rectA.y - rectA.h/2))
        pointsA.push(new Point(rectA.x - rectA.w/2, rectA.y + rectA.h/2))
        pointsA.push(new Point(rectA.x + rectA.w/2, rectA.y + rectA.h/2))
        pointsA.some((point: Point) => {
            return rectB.hasPoint(point)
        })
        return false
    }
    constructor(x: number, y: number, w: number, h:number) {
        super(x ,y)
        this.w = w 
        this.h = h
    }

    protected setBoundingRect(x: number, y: number, w: number, h: number) {

    }
    protected getBoundingRect(x: number, y: number, w: number, h: number) {
        return this
    }
    
    protected hasPoint(point: Point): boolean {
        return Rectangle.isPointInRect(point, this)
    }
    protected intersectWith(rect: Rectangle) {
        return Rectangle.isIntersection(rect, this)
    }
}
export default Rectangle