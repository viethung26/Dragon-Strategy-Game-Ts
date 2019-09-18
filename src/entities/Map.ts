import GameObject from 'framework/GameObject';
import { DEVICE } from 'src/defines';
import { getBG, getTiles } from 'framework/Sprites';
import Rectangle from 'framework/Rectangle';
const SIZE = 64
const MapArray = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,2,2,2,2,2,2,3,17,2,17,1,2,2,2,3],
    [4,5,5,5,5,5,5,6,18,5,18,4,5,5,5,6],
]
export default class Map extends GameObject {
    bg = null
    tiles = null
    initialing: boolean = false
    update(): void {
        throw new Error("Method not implemented.");
    }
    constructor() {
        super(null, 0, 0, DEVICE.width, DEVICE.height)
        this.init()
        // console.log('9779 this.get ', this.bg)
    }
    async init() {
        this.initialing = true
        this.tiles = await getTiles()
        this.bg = await getBG()
        this.initialing = false
    }
    render(c2d: CanvasRenderingContext2D): void {
        if (this.initialing) return
        c2d.drawImage(this.bg, 0,0)
        MapArray.forEach((arr, i) => {
            arr.forEach((v, j) => {
                if(typeof v === 'number' && v !== 0) {
                    const y = i * SIZE 
                    const x = j * SIZE
                    c2d.drawImage(this.tiles[v-1], x, y, SIZE, SIZE)
                }
            })
        })
        // const newC2d = document.createElement('canvas').getContext('2d')
        // newC2d.drawImage(this.mapImg, 0, 0, 1000, 1000)
        // console.log(9779, this.testFrame)
        // c2d.putImageData(this.testFrame, 0 ,0)
        // c2d.putImageData(newC2d.getImageData(0,0,50,50), 0 ,0)
        // c2d.drawImage(this.mapImg, 0, 0)
    }
    checkCollision(gameObject: GameObject): Rectangle {
        
        const {x, y, w, h} = gameObject
        let minX = Math.floor((x-w/2)/SIZE) 
        let minY = Math.floor((y-h/2)/SIZE) 
        let maxX = Math.ceil((x+w/2)/SIZE) 
        let maxY = Math.ceil((y+h/2)/SIZE) 
        if (minX < 0) minX = 0
        if (minY < 0) minY = 0
        if (maxX >= MapArray[0].length) maxX = MapArray[0].length - 1
        if (maxY >= MapArray.length) maxY = MapArray.length - 1
        // console.log(minX, minY, maxX, maxY);

        for(let i = minY; i<= maxY; i++) {
            for(let j = minX; j<= maxX; j++) {
                const v = MapArray[i][j]
                if(typeof v === 'number' && v !== 0) {
                    const y = i * SIZE + SIZE/2
                    const x = j * SIZE + SIZE/2
                    const rect = new Rectangle(x, y, SIZE, SIZE)
                    if (gameObject.collisionWith(rect)) {
                        return rect
                    }
                }
            }
        }
        return null
    }
    handleClick(): void {
    }


}