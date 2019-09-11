import { IHeadSprite } from './Sprites';
import Animation from 'framework/Animation'
class AnimationSets {
    name: string
    sets = {}
    status: string = ''
    allStatus: string[] = []
    animation: Animation
    constructor(name, allSprites: object, defaultStatus: string = '') {
        this.name = name
        this.status = defaultStatus
        this.init(allSprites)
    }
    init(all) {
        this.allStatus = [...Object.keys(all)]
        if (this.allStatus && !this.allStatus.some(key => key === this.status)) {
            this.status = this.allStatus[0]
        } 
        Object.entries(all).forEach(([headKey, headValue]: [string, IHeadSprite]) => {
            const {sprites, framesTime} = headValue
            const set = new Animation(sprites, 'Image', framesTime)
            this.sets[headKey] = set
            if (this.status === headKey) this.animation = set
        })
    }
    play() {
        if (this.status && this.allStatus.includes(this.status)) {
            this.animation.play()
            console.log('9779 ', this.animation)
            console.log('9779 play')
        }
    }
    changeStatus(newStatus: string) {
        if (this.allStatus.includes(newStatus)) {
            console.log('9779 new', newStatus)
            this.animation.reset()
            this.status = newStatus
            this.animation = this.sets[this.status]
            this.play()
        }
    }
    render(c2d: CanvasRenderingContext2D, x: number = 0, y: number = 0) {
        if(this.animation && this.animation.render) {
            this.animation.render(c2d, x, y)
        }
    }
}

export default AnimationSets