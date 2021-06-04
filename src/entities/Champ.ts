import GameObject from "framework/GameObject";
import { CHAMPION, FRAME } from 'src/defines';
import { getSprite } from 'framework/Sprites';
import Animation from 'framework/Animation'
import AnimationSets from 'framework/AnimationSets'
import GameWorld from 'src/main';
import Rectangle from 'framework/Rectangle';
import Point from 'framework/Point';
declare global {
    interface Window { 
        santa: any; 
    }
}
const offset = {x: CHAMPION.width/2, y: CHAMPION.height/2}
const slidingTime = 600
export default class Champ extends GameObject {
    animationSets: AnimationSets
    animation: Animation
    color: string
    team: number
    unit: any
    status: "Idle" | "Dead" | "Jump" | "Run" | "Slide" | "Walk"
    flip: boolean = false
    baseY = 0
    slideStart: number = null
    isDroping: boolean = false
    private speed: number
    private accelerate: number
    private speedY: number

    lastTime: number
    constructor(gameWorld: GameWorld, x: number, y: number, team: number, unit, color: string = '#fff', speed: number = 0, accelerate: number = 0, speedY: number = 0, accelerateY: number = 0) {
        super(gameWorld, x, y, CHAMPION.width, CHAMPION.height)
        this.baseY = y
        this.team = team
        this.unit = unit
        this.color = color
        this.speed = speed
        this.speedY = speedY
        this.accelerate = accelerate
        this.speedY = speedY
        this.status = "Idle"
        this.isDroping = true
        this.init()
        this.lastTime = new Date().getTime()
    }

    async init() {
        const santaSprites = await getSprite('santa')
        this.animationSets = new AnimationSets('santa', santaSprites, this.status)
        this.animationSets.play()
        window.santa = this.animationSets
    }

    handleAfterCollision(boundingObj: Rectangle) {

        console.log('9779 ', boundingObj, this.getBoundingRect())
        const {x, y, w, h} = boundingObj
        if (this.y < y) {
            // this.gameWorld.pause()
            this.isDroping = false
            this.speedY = 0
            this.y = y - w/2 - this.h/2
        }
    }

    updatePosition() {
        // console.log('9779 speed', this.speed, this.accelerate)
        const nextRect = new Rectangle(this.x + this.speed, this.y - this.speedY, this.w, this.h)
        this.speed  += this.accelerate
        this.speedY += CHAMPION.gravity
        const collisionObj = this.gameWorld.map.checkCollision(nextRect)
        if (collisionObj) this.handleAfterCollision(collisionObj)
        this.x += this.speed
        this.y -= this.speedY
         // Check speed over
         if (this.speed > CHAMPION.max_speed) this.speed = CHAMPION.max_speed
         else if (this.speed < - CHAMPION.max_speed) this.speed = - CHAMPION.max_speed
        //Check collision
        if (this.x > 1000) this.x = 0
        if (this.x < 0) this.x = 1000
        if (this.y > 800) this.y = 0
        
        
        if (this.slideStart) {
            if (this.slideStart < Date.now() - slidingTime) {
                this.slideStart = null
                this.accelerate = 0
                this.speed = 0
            } else {
                this.accelerate = (this.flip ? -1 : 1 ) * 2 * this.accelerate
            }
        }
        // if (this.speedY > CHAMPION.max_speedY) this.speedY = CHAMPION.max_speedY
        // else if (this.speedY < - CHAMPION.max_speedY) this.speedY = - CHAMPION.max_speedY
    }

    updateStatus() {
        if (this.speed === 0 && this.speedY === 0) this.setStatus('Idle')
        else if (this.speedY !== 0) this.setStatus('Jump')
        else if (this.speed !== 0 && this.speedY === 0) {
          if (this.slideStart) this.setStatus('Slide')
          else this.setStatus('Run')
        } 
    
    }

    update() {
        this.updatePosition()
        this.updateStatus()
    }

    render(c2d: CanvasRenderingContext2D): void {
        
        c2d.fillStyle = this.color
        if (this.animationSets) {
            if (this.animationSets.status !== this.status) {
                // console.log('9779 status', this.status)
                this.animationSets.changeStatus(this.status)
            }
            this.animationSets.render(c2d, this.x - offset.x, this.y - offset.y, this.flip)
        }
    }    
    
    handleClick(): void {
    }

    public run(speed, flip = false) {
        if (this.status === 'Slide') {
            return            
        }
        this.flip = flip
        if(typeof speed === 'number') this.speed = speed
        this.accelerate = (this.flip ? -1 : 1) * CHAMPION.accelerate
    }

    public setStatus(status) {
        console.log('9779 STATUS', status)
        if (status !== this.status) this.status = status
    }

    public stop() {
        this.speed = 0
        this.accelerate = 0
    }

    public jump() {
        if (this.status !== 'Jump' && this.status !== 'Slide') {
            this.status= 'Jump'
            this.speedY = 6
        }
    }
    public slide() {
        if (this.status !== 'Jump' && !this.slideStart) {
            this.status= 'Slide'
            this.slideStart = Date.now()
        }
    }
    
}