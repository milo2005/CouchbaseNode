export class ResponseBody<T> {
    constructor(
        public success: boolean,
        public data: T,
        public error: string
    ) { }
}

