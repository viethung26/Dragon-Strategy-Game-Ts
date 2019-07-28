import GameObject from "framework/GameObject";
import { CHAMPION } from 'src/defines';

export default class Champ extends GameObject {
    color: string
    team: number
    unit: any
    constructor(x: number, y: number, team: number, unit, color: string = '#fff') {
        super(x, y, CHAMPION.width, CHAMPION.height)
        this.team = team
        this.unit = unit
        this.color = color
    }

    render(c2d: CanvasRenderingContext2D): void {
        c2d.fillStyle = this.color
        c2d.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h)
    }    
    
    handleClick(): void {
    }

    
}