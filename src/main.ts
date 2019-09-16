import GameObject from 'framework/GameObject'
import { DEVICE, FRAME } from './defines'
import CanvasDragTs from 'framework/CanvasDragTs';
import Champ from 'entities/Champ';
import Santa from 'units/Santa';
import Map from 'entities/Map';
import { getSprite, initData } from 'framework/Sprites';
//time per frame
const TPF = Math.floor(1000/FRAME.fps)
const keyDefines = {
    ' ': ['jump'],
    'z': ['slide'],
    'ArrowRight': ['run', null],
    'ArrowLeft': ['run', null, true]
}


class ChampManager<Item> extends Array {
    call = (fn:string, ...args:any[]) => {
        this.forEach((obj:Item) => obj[fn](...args))
    }
}

class Game {
    initialing = false
    startTime: number = 0
    root: HTMLElement = null
    c: CanvasRenderingContext2D = null
    champManager: ChampManager<Champ> = new ChampManager
    dragObject: { object: GameObject, dx: number, dy: number } = {object: null, dx: 0, dy: 0}
    map: Map = null
    pressingkeys = new Set()
    removeKeys = new Set()

    constructor(id: string) {
        this.root = document.getElementById(id)
        ;(async() => {
            await this.init()
            this.render()
        })()
    }

    async init() {
        this.initialing = true

        await initData()
        if(this.root) this.initGameScreen()
        //key
        document.body.addEventListener('keyup', (e) => {
            this.pressingkeys.delete(e.key)
            this.removeKeys.add(e.key)
        })
        document.body.addEventListener('keydown', (e) => {
            this.pressingkeys.add(e.key)
        })
        this.initMap()
        await this.initChamp()
        this.initialing = false
    }

    update() {
        if (this.removeKeys.has('ArrowRight') || this.removeKeys.has('ArrowLeft') || this.removeKeys.has('z')) {
            this.champManager.call('stop') 
            this.removeKeys.clear()
        }
        Object.entries(keyDefines).forEach(([key, values]) => {
            if (this.pressingkeys.has(key)) {
                let [action, ...rest] = values
                action = String(action)
                this.champManager.call(action, ...rest)
            }
        } )
        this.champManager.call('update')
    }

    render() {
        if (this.initialing) return
        const now = Date.now()
        if(now >= TPF + this.startTime) {
            this.map.render(this.c)
            this.startTime = now
            this.update()
            // this.c.fillStyle = '#fff'
            // this.c.fillRect(0,0, DEVICE.width, DEVICE.height)
            this.champManager.forEach(obj => obj.render(this.c))
        }

        // this.houseManager.forEach(obj => obj.render(this.c))
    
        requestAnimationFrame(this.render.bind(this))
    }

    // handling methods
    initGameScreen() {
        const canvas = document.createElement('canvas')
       
        Object.assign(canvas, {
            id: 'gamescreen',
            width: DEVICE.width,
            height: DEVICE.height,
        })
        canvas.style.border = '1px solid #ddd'
        // add drag hanlde for canvas
        new CanvasDragTs(canvas, this.isDragable.bind(this), this.setNewPosition.bind(this), {dragEnd: this.dragEnd.bind(this)})

        this.c = canvas.getContext('2d')
        this.root.appendChild(canvas)
        
    }

    initMap() {
        this.map = new Map()
    }

    async initChamp() {
        const santa = new Santa(100, 200, 1)
        // const Santa2 = new Santa(100, 300, 1)
        this.champManager.push(santa)
        // this.champManager.push(Santa2)
    }

    handleClickOnScreen = e => {
        const {offsetX: x, offsetY: y} = e
        console.log(9779, 'mouse click')
        // this.houseManager.forEach(h => {
        //     if (h.isIntesect(x, y)) h.handleClick()
        // })
    }

    // 3 methods handle when drag object for CanvasDragTs Module
    isDragable(x: number, y: number) {
        return new Promise((resolve) => {
            // this.houseManager.forEach(h => {
            //     if (h.isIntesect(x, y)) {
            //         this.dragObject.object = h
            //         this.dragObject.dx = x - h.x
            //         this.dragObject.dy = y - h.y 
            //         console.log(9779, 'start dragging')
            //         resolve(true)
            //     }
            // })
            resolve(false)
        })
    }

    setNewPosition (x: number, y: number) {
        if (this.dragObject) {
            const {dx , dy } = this.dragObject
            this.dragObject.object.setPos(x - dx, y - dy)
        }
    }

    dragEnd() {
        console.log(9779, 'end drag')
    }
}

new Game('game')