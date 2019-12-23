import { Race } from './race';

export class Racelocation {
    constructor(
        public id: number,
        public location: string,
        public races?: Race[]
    ) {}
}