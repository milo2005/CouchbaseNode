import { Response, Request, NextFunction } from "express";
import { WordService } from "../../services/words-service";
import { Query } from "../_common/query";
import { Word } from "../../models/word";
import { sendSuccess } from "../_common/ctrl-ext";


export function listWord(req: Request, res: Response, next: NextFunction) {
    const query = new Query(req.query);
    WordService
        .instace.list(query.limit, query.offset)
        .then(x => sendSuccess(res, x))
        .catch(err => next(err));
}