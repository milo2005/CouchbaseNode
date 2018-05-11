import { Response, Request, NextFunction } from "express";
import { WordService } from "../../services/words-service";
import { Query } from "../_common/query";
import { Word } from "../../models/word";
import { sendSuccess } from "../_common/ctrl-ext";


export function removeWord(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    WordService
        .instace.remove(id)
        .then(x => sendSuccess(res, x))
        .catch(err => next(err));
}