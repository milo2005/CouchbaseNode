export const TYPE_USER = "user";

export class User {
    constructor(
        public type: string,
        public name: string,
        public username: string,
        public pass: string) { }
}