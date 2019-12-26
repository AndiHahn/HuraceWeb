import { Skier } from './skier';

export class StartlistEntry {
    constructor(
        public skier: Skier,
        public ordinal: number,
        public status: string
    ) {}
}