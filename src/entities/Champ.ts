import GameObject from "framework/GameObject";
import { CHAMPION, FRAME } from 'src/defines';
import { getSprite } from 'framework/Sprites';
import Animation from 'framework/Animation'
import AnimationSets from 'framework/AnimationSets'
declare global {
    interface Window { 
        santa: any; 
    }
}

const accelerate = 0.1

export default class Champ extends GameObject {
    animationSets: AnimationSets
    animation: Animation
    color: string
    team: number
    unit: any
    status: "Idle" | "Dead" | "Jump" | "Run" | "Slide" | "Walk"
    speed: number
    lastTime: number
    constructor(x: number, y: number, team: number, unit, color: string = '#fff', speed: number = 1) {
        super(x, y, CHAMPION.width, CHAMPION.height)
        this.team = team
        this.unit = unit
        this.color = color
        this.speed = speed
        this.status = "Run"
        this.init()
        this.lastTime = new Date().getTime()
    }

    async init() {
        const santaSprites = await getSprite('santa')
        this.animationSets = new AnimationSets('santa', santaSprites, this.status)
        this.animationSets.play()
        window.santa = this.animationSets
    }

    update() {
        this.x += this.speed
        if (this.x > 1000) this.x = 0
        if (this.speed < CHAMPION.max_speed) {
            this.speed += accelerate
            if (this.speed > CHAMPION.max_speed) this.speed = CHAMPION.max_speed
        }
    }

    render(c2d: CanvasRenderingContext2D): void {
        c2d.fillStyle = this.color
        if (this.animationSets) {
            if (this.animationSets.status !== this.status) this.animationSets.changeStatus(this.status)
            this.animationSets.render(c2d, this.x, this.y)
        }
    }    
    
    handleClick(): void {
    }
    
}