import { DBConnection } from "./db-connection";
import { Word, TYPE_WORD } from "../models/word";
import { Document } from "./db-connection";

export class WordService {

    private static _instance: WordService;
    static get instace(): WordService {
        if (WordService._instance == undefined) {
            WordService._instance = new WordService(DBConnection.instance);
        }
        return WordService._instance;
    }

    constructor(private db: DBConnection) { }

    insert(word: Word) {
        return this.db.insert(word);
    }

    update(id: string, word: Word) {
        return this.db.replace(id, word);
    }

    remove(id: string) {
        return this.db.remove(id);
    }

    list(limit: number, offset: number): Promise<Document<Word>[]> {
        return this.db.ListByType<Word>(TYPE_WORD, undefined, undefined, limit, offset);
    }

}