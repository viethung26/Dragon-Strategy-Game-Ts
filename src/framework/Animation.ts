import { FRAME, CHILD_CANVAS, CHAMPION } from 'src/defines';

export default class Animation {
    name: string 
    frames: Array<ImageData|any>
    type: 'ImageData' | 'Image'
    framesTime: Array<number>
    ignoreFrames: Array<boolean>
    beginTime: number 
    currentFrame: number
    playing: boolean
    repeated: boolean
    constructor(frames: Array<ImageData>, type: 'ImageData' | 'Image', framesTime?: Array<number>, repeated: boolean = true) {
        this.frames = [...frames]
        this.type = type
        this.framesTime = framesTime ? [...framesTime].map(f => f*FRAME.fps) : new Array(this.frames.length).fill(FRAME.fps)
        this.reset()
    }

    play() {
        this.playing = true
        this.beginTime = new Date().getTime()
    }

    pause() {
        this.playing = false
    }

    reset() {
        this.playing = false 
        this.currentFrame = 0
        this.ignoreFrames = new Array(frames.length).fill(false)
    }

    nextFrame() {
        // console.log(9779, 'next')
        this.currentFrame++
        if (this.currentFrame >= this.frames.length) this.currentFrame = 0
        if (this.ignoreFrames[this.currentFrame]) this.nextFrame()
    }

    setFrameIgnore(index: number) {
        this.ignoreFrames[index] = true
    }

    update() {
        if (!this.playing) return
        if (new Date().getTime() - this.beginTime > this.framesTime[this.currentFrame]) {
            this.nextFrame()
            this.beginTime = new Date().getTime()
        }
    }

    render(c2d: CanvasRenderingContext2D, x: number = 0, y: number = 0, flip: boolean = false) {
        this.update()
        const newCanvas = document.createElement('canvas')
        newCanvas.width = CHILD_CANVAS.width
        newCanvas.height = CHILD_CANVAS.height
        const c = newCanvas.getContext('2d')
        c.fillStyle = 'red'
        c.strokeRect(0, 0, CHAMPION.width, CHAMPION.height)
        if (flip) {
            c.translate(CHILD_CANVAS.width, 0);
            c.scale(-1, 1);
        }
        if (this.type === 'ImageData') {
            c.putImageData(this.frames[this.currentFrame], 0, 0)
        } else c.drawImage(this.frames[this.currentFrame], 120, 20, CHILD_CANVAS.subW, CHILD_CANVAS.subH, 0, 0, CHILD_CANVAS.width, CHILD_CANVAS.height)
        c.fillRect(CHAMPION.width/2-4,CHAMPION.height/2-4, 8,8)
        c2d.drawImage(newCanvas,x,y)
    }
}