import Champ from 'entities/Champ';

export default class Blastic extends Champ {
    static unit: string = 'Blastic'
    constructor(x: number, y: number, team: number) {
        super(x, y, team, Blastic.unit, '#f00')
    }
}