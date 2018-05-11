import { Response, Request, NextFunction } from "express";
import { WordService } from "../../services/words-service";
import { Query } from "../_common/query";
import { Word } from "../../models/word";
import { sendSuccess } from "../_common/ctrl-ext";


export function updateWord(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;
    const word: Word = req.body;
    WordService.instace.update(id, word)
        .then(x => sendSuccess(res, x))
        .catch(err => next(err));
}