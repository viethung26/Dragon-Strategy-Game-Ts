import GameObject from 'framework/GameObject';
import { DEVICE } from 'src/defines';

export default class Map extends GameObject {
    constructor() {
        super(0, 0, DEVICE.width, DEVICE.height)
    }
    render(c2d: CanvasRenderingContext2D): void {
        // const newC2d = document.createElement('canvas').getContext('2d')
        // newC2d.drawImage(this.mapImg, 0, 0, 1000, 1000)
        // console.log(9779, this.testFrame)
        // c2d.putImageData(this.testFrame, 0 ,0)
        // c2d.putImageData(newC2d.getImageData(0,0,50,50), 0 ,0)
        // c2d.drawImage(this.mapImg, 0, 0)
    }
    handleClick(): void {
    }


}