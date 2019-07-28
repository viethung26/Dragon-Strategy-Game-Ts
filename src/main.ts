import House from './House'
import GameObject from './GameObject'
import { DEVICE } from './defines'
import { rejects } from 'assert';
import CanvasDragTs from './CanvasDragTs';
class Game {
    dragObject: { object: GameObject, dx: number, dy: number } = {object: null, dx: 0, dy: 0}
    c: CanvasRenderingContext2D
    display: HTMLElement
    houseManager: House[] = []
    constructor(id: string) {
        this.display = document.getElementById(id)
        if(this.display) this.createScreen()
        const house = new House(20, 20, 40, 40)
        const house2 = new House(500, 100, 40, 40)

        this.houseManager.push(house)
        this.houseManager.push(house2)
        this.render()
    }
    render() {
        this.c.fillStyle = '#fff'
        this.c.fillRect(0,0, 1050, 1050)
        this.houseManager.forEach(obj => obj.render(this.c))
        requestAnimationFrame(this.render.bind(this))
    }

    handleClickOnScreen = e => {
        console.log(9779, 'mosue click')
        const x = e.offsetX
        const y = e.offsetY
        this.houseManager.forEach(h => {
            if (h.isIntesect(x, y)) h.handleClick()
        })
    }

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

    createScreen() {
        const canvas = document.createElement('canvas')
        const newEl = document.createElement('p')
        newEl.id = 'adfad'
        canvas.id = 'gamescreen'
        canvas.width = DEVICE.width
        canvas.height = DEVICE.height
        canvas.style.border = '1px solid #ddd'

        this.c = canvas.getContext('2d')
        this.c.fillStyle = '#fff'
        this.c.fillRect(0,0, 1000, 1000)
        this.display.appendChild(canvas)
        this.display.appendChild(newEl)
        const canvasEl = document.getElementById('gamescreen') as HTMLCanvasElement
        new CanvasDragTs(canvasEl, this.isDragable.bind(this), this.setNewPosition.bind(this), {dragEnd: this.dragEnd.bind(this)})
    }
}

new Game('game')