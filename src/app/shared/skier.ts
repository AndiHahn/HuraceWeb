export class Skier {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public country?: string,
        public birthDate?: Date,
        public sex?: string,
        public imageUrl?: string,
        public deleted?: boolean
    ) {}
}