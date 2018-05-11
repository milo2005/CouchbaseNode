import { Response, Request, NextFunction } from "express";
import { WordService } from "../../services/words-service";
import { Query } from "../_common/query";
import { Word } from "../../models/word";
import { sendSuccess } from "../_common/ctrl-ext";


export function addWord(req: Request, res: Response, next: NextFunction) {
    const word: Word = req.body;
    WordService.instace.insert(word)
        .then(x => sendSuccess(res, x))
        .catch(err => next(err));
}