export class Race {
    constructor(
        public id?: number,
        public date?: Date,
        public label?: string,
        public raceType?: string,
        public location?: string,
        public description?: string,
        public status?: string,
        public nrOfTimes?: number,
        public gender?: string,
        public deleted?: boolean
    ) {}
}