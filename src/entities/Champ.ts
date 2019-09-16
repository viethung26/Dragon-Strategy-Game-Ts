import GameObject from "framework/GameObject";
import { CHAMPION, FRAME } from 'src/defines';
import { getSprite } from 'framework/Sprites';
import Animation from 'framework/Animation'
import AnimationSets from 'framework/AnimationSets'
import GameWorld from 'src/main';
declare global {
    interface Window { 
        santa: any; 
    }
}

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
        this.init()
        this.lastTime = new Date().getTime()
    }

    async init() {
        const santaSprites = await getSprite('santa')
        this.animationSets = new AnimationSets('santa', santaSprites, this.status)
        this.animationSets.play()
        window.santa = this.animationSets
    }

    updatePosition() {
        // console.log('9779 speed', this.speed, this.accelerate)
        this.x += this.speed
        this.y -= this.speedY
        this.speed  += this.accelerate
        if (this.status === 'Jump') this.speedY += CHAMPION.gravity
         // Check speed over
         if (this.speed > CHAMPION.max_speed) this.speed = CHAMPION.max_speed
         else if (this.speed < - CHAMPION.max_speed) this.speed = - CHAMPION.max_speed
        //Check collision
        if (this.x > 1000) this.x = 0
        const collisionObj = this.gameWorld.map.checkCollision(this)
        if (collisionObj) {
            console.log('9779 colls', collisionObj)
            this.y = collisionObj.y + 1
            this.speedY = 0
        }
        // if (this.y > this.baseY) {
        //     console.log('9779 end jump')
        //     // this.setStatus('Idle')
        //     this.y = this.baseY 
        //     this.speedY = 0
        // }
        if (this.slideStart) {
            if (this.slideStart < Date.now() - slidingTime) {
                this.slideStart = null
                this.accelerate = 0
                this.speed = 0
            } else {
                this.accelerate = (this.flip ? -1 : 1 ) * 2 * CHAMPION.accelerate
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
            this.animationSets.render(c2d, this.x, this.y, this.flip)
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