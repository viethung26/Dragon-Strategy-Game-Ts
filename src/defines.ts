const DEVICE = {
    width: 1024,
    height: 768
}

const CHAMPION = {
    width: 60, 
    height: 100,
    jump: {width: 119, height: 100},
    accelerate: 0.1,
    gravity: -0.3,
    max_speed: 5,
    // max_speedY: 15,
    max_jump: 500
}

const CHILD_CANVAS = {
    width: 100,
    height: 100,
    subW: {from: 160, to:480}, 
    offset: {x: 18},
    subH: 570
}

const FRAME = {
    fps: 120
}

export {
    DEVICE,
    CHAMPION,
    FRAME,
    CHILD_CANVAS

}