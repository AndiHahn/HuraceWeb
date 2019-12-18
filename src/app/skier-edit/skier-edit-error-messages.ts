export class ErrorMessage {
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
      ) { }
}

export const SkierEditErrorMessages = [
    new ErrorMessage('firstName', 'required', 'Ein Vorname muss eingegeben werden'),
    new ErrorMessage('lastName', 'required', 'Ein Nachname muss eingegeben werden'),
    new ErrorMessage('sex', 'required', 'Ein Geschlecht muss eingegeben werden'),
    new ErrorMessage('country', 'required', 'Ein Ort muss eingegeben werden'),
    new ErrorMessage('birthDate', 'required', 'Ein Geburtsdatum muss eingegeben werden')
]; 