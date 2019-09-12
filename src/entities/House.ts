import GameObject from 'framework/GameObject'
export default class House extends GameObject {
    update(): void {
        throw new Error("Method not implemented.");
    }
    isOpen: boolean
    index = 0
    animation: Array<string> = ['#000','#ff0', '#f0f', '#0ff', '#f00']
    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h)
        this.isOpen = false
    }

    render(c2d: CanvasRenderingContext2D): void {
        c2d.fillStyle = this.animation[(this.index)]
        c2d.fillRect(this.x-this.w/2, this.y-this.h/2, this.w, this.h)
        if (this.isOpen) this.renderModal(c2d)
    }

    renderModal(c2d: CanvasRenderingContext2D) {
        const width = 100
        const height = 100
        c2d.fillStyle = "#f00"
        c2d.fillRect(this.x-width/2, this.y-height/2, width, height)
    }

    handleClick() {
        // this.isOpen =  !this.isOpen
        // console.log(9779, 'click vao nha')
    }

}