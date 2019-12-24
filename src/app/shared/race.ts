import { RaceApi } from './race-api';

export class Race {
    constructor(
        public race: RaceApi,
        public resultAvailable?: boolean
    ) {}
}
