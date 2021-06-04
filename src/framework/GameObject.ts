import Rectangle from './Rectangle'
import GameWorld from 'src/main'

export default abstract class GameObject extends Rectangle {
    gameWorld: GameWorld = null
    // lastTime: number =  null
    order: number
    constructor(gameWorld: GameWorld, x: number, y:number, w: number, h: number, order: number = 0) {
        super(x,y,w,h)
        this.gameWorld = gameWorld
        this.order = order
    }
    abstract update(): void
    abstract render(c2d: CanvasRenderingContext2D): void 
    abstract handleClick(): void


    public collisionWith(obj: Rectangle) {
        return this.intersectWith(obj)
    }
    public setPos(x: number,y: number) {
        this.setPoint(x, y)
    }
}