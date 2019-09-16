import Champ from 'entities/Champ';
import GameWorld from 'src/main';

export default class Santa extends Champ {
    static unit: string = 'Santa'
    constructor(gameWorld: GameWorld, x: number, y: number, team: number) {
        super(gameWorld, x, y, team, Santa.unit, '#f00')
    }
}