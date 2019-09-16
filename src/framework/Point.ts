class Point {
    private _x: number = null
    private _y: number = null 
    get x(): number {
        return this._x
    }
    set x(x: number) {
        this._x = x
    }
    get y(): number {
        return this._y
    }
    set y(y: number) {
        this._y = y
    }
    constructor(x:number, y:number) {
        this.setPoint(x,y)
    }
    
    protected setPoint(x:number, y:number) {
        this._x = x 
        this._y = y
    }
}
export default Point