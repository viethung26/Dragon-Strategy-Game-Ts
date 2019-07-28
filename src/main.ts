import House from 'entities/House'
import GameObject from 'framework/GameObject'
import { DEVICE } from './defines'
import CanvasDragTs from 'framework/CanvasDragTs';
import Champ from 'entities/Champ';
import Blastic from 'units/Blastic';
class Game {

    root: HTMLElement = null
    c: CanvasRenderingContext2D = null
    champManager: Champ[] = []
    houseManager: House[] = []
    dragObject: { object: GameObject, dx: number, dy: number } = {object: null, dx: 0, dy: 0}

    constructor(id: string) {
        this.root = document.getElementById(id)
        this.init()
        this.render()
    }

    init() {
        if(this.root) this.initGameScreen()
        this.initHouse()
        this.initChamp()
    }

    render() {
        this.c.fillStyle = '#fff'
        this.c.fillRect(0,0, DEVICE.width, DEVICE.height)
        this.houseManager.forEach(obj => obj.render(this.c))
        this.champManager.forEach(obj => obj.render(this.c))
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

    initHouse() {
        const house = new House(20, 20, 40, 40)
        const house2 = new House(500, 100, 40, 40)
        this.houseManager.push(house)
        this.houseManager.push(house2)
    }

    initChamp() {
        const blastic = new Blastic(100, 100, 1)
        this.champManager.push(blastic)
    }

    handleClickOnScreen = e => {
        const {offsetX: x, offsetY: y} = e
        console.log(9779, 'mouse click')
        this.houseManager.forEach(h => {
            if (h.isIntesect(x, y)) h.handleClick()
        })
    }

    // 3 methods handle when drag object for CanvasDragTs Module
    isDragable(x: number, y: number) {
        return new Promise((resolve) => {
            this.houseManager.forEach(h => {
                if (h.isIntesect(x, y)) {
                    this.dragObject.object = h
                    this.dragObject.dx = x - h.x
                    this.dragObject.dy = y - h.y 
                    console.log(9779, 'start dragging')
                    resolve(true)
                }
            })
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