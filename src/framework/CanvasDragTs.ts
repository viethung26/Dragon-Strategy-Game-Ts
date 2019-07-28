interface IOptions {
    delayTime?: number,
    dragEnd?: () => void
}

export default class CanvasDragTs {
    options: IOptions = {
        delayTime: 100,
    }
    timeStart: number
    pressing: boolean = false
    dragging: boolean = false
    isDragable: (x: number, y: number) => boolean
    setPos: (x: number, y: number) => void
    constructor(el: HTMLCanvasElement, isDragable: (x: number, y: number) => boolean, setNewPosition: (x: number, y: number) => void, options?: IOptions) {
        this.isDragable = isDragable
        this.setPos = setNewPosition
        Object.assign(this.options, options)
        el.addEventListener('mouseout', this.handleMouseOut)
        el.addEventListener('mousedown', this.handleMouseDown)
        el.addEventListener('mouseup', this.handleMouseUp)
        el.addEventListener('mousemove', this.handleMouseMove)
    }
    
    handleMouseOut = e => {
        this.dragging && this.options.dragEnd && this.options.dragEnd()
        this.pressing = false
        this.dragging = false
    }

    handleMouseDown = e => {
        this.timeStart = new Date().getTime()
        this.pressing = true
        this.dragging = false
    }

    handleMouseUp = e => {
        this.dragging && this.options.dragEnd && this.options.dragEnd()
        this.dragging = false 
        this.pressing = false
    }

    handleMouseMove = async(e) => {
        if (this.pressing) {
            const x = e.offsetX 
            const y = e.offsetY
            if (this.dragging) {
                this.setPos(x, y)
            } else {
                const timeDelay = new Date().getTime() - this.timeStart
                if (timeDelay >= this.options.delayTime) {
                    this.dragging = await this.isDragable(x, y)
                    if (!this.dragging) this.pressing = false
                } else {
                    this.pressing = false 
                }
            }
        }
    }
}