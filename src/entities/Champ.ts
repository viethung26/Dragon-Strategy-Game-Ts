import GameObject from "framework/GameObject";
import { CHAMPION } from 'src/defines';
import { getSprite } from 'framework/Sprites';
import Animation from 'framework/Animation'
declare global {
    interface Window { 
        santa: any; 
    }
}

export default class Champ extends GameObject {
    animation: Animation
    color: string
    team: number
    unit: any
    status: "Idle" | "Dead" | "Jump" | "Run" | "Slide" | "Walk"
    accelerate: number
    constructor(x: number, y: number, team: number, unit, color: string = '#fff', accelerate: number = 0) {
        super(x, y, CHAMPION.width, CHAMPION.height)
        this.team = team
        this.unit = unit
        this.color = color
        this.accelerate = accelerate
        this.status = "Idle"
        this.init()
    }

    async init() {
        const santaSprites = await getSprite('santa')
        const {sprites, frameTimes} = santaSprites[this.status]
        this.animation = new Animation(sprites, 'Image', frameTimes)
        this.animation.play()
        window.santa = this.animation
    }

    update() {
        // if (this.accelerate !== 0) {
        //     this.animation.setFrameIgnore(0)
        // }
        this.x += this.accelerate
    }

    render(c2d: CanvasRenderingContext2D): void {
        c2d.fillStyle = this.color
        if (this.animation) this.animation.render(c2d, this.x, this.y)
    }    
    
    handleClick(): void {
    }
    
}