export const TYPE_WORD = "word";

export class Word {
    constructor(
        public type: string,
        public text: string,
        public signImage: string,
        public meanImage: string) { }
}