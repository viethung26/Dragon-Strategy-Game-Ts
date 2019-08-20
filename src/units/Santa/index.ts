import Champ from 'entities/Champ';

export default class Santa extends Champ {
    static unit: string = 'Santa'
    constructor(x: number, y: number, team: number) {
        super(x, y, team, Santa.unit, '#f00')
    }
}