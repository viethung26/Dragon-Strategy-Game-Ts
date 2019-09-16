// import santa from 'assets/characters/santa/data.json'
const AllSprite = {}
const Backgrounds = []
const Tiles = []
const BG_Link = require('assets/tileset/BG/BG.png')

const SIZE = 64
export interface IHeadSprite {
    sprites: [],
    framesTime: []
}
export const initData = async () => {
    await initBG()
    await initTile()
    await initSprite('santa')
}
// {name: {
//     status1: {sprites, framesTimes}
//     status2: {sprites, framesTimes}
// }}
const initBG = async() => {
    const image = new Image(1000,1000)
    image.src = BG_Link
    Backgrounds.push(image)
}

const initTile = async () => {
    await import (`assets/tileset/Tiles/data.json`).then(data => {
        const {length} = data
        for (let i = 1; i<= length; i++) {
            const src = require(`assets/tileset/Tiles/${i}.png`)
            const image = new Image(SIZE, SIZE)
            image.src = src
            Tiles.push(image)
        }
    })
}
const initSprite = async (name: string) => {
    AllSprite[name] = {}
    console.log(9779, 'init sprite', name)
    await import(`assets/characters/${name}/data.json`).then((data) => {
        data = data.default as []
        data.forEach(d => {
            const {head, length, framesTime} = d
            const sprites = []
            for (let i = 1; i<= length; i++) {
                const src = require(`assets/characters/santa/${head} (${i}).png`)
                const image = new Image(64, 64)
                image.src = src
                sprites.push(image)
            }
            Object.assign(AllSprite[name], {[head]: {sprites, framesTime} })
        })
    })
}
export const getSprite = async (name: string) => {
    if (AllSprite[name] && AllSprite[name].length > 0) return AllSprite[name]
    await initSprite(name)
    return AllSprite[name]
}

export const getBG = async(index: number = 0) => {
    return Backgrounds[index]
}

export const getTiles = async() => {
    return Tiles
}