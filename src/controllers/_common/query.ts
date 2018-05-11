export class Query {
    offset: number;
    limit: number;
    constructor(query: any) {
        this.offset = query.offset ? query.offset : 0;
        this.limit = query.limit ? query.limit : 0;
    }
}