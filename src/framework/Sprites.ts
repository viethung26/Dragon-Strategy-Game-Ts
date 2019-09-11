// import santa from 'assets/characters/santa/data.json'
const AllSprite = {}
export interface IHeadSprite {
    sprites: [],
    framesTime: []
}
// {name: {
//     status1: {sprites, framesTimes}
//     status2: {sprites, framesTimes}
// }}
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
