import { ResponseBody } from "./response-body";
import { Response } from "express";

export function sendSuccess<T>(res: Response, data: T) {
    res.send(new ResponseBody(true, data, undefined));
}

export function sendFail(res: Response, error: any) {
    if (error instanceof Error) {
        res.send(new ResponseBody(false, undefined, error.message));
    } else {
        res.send(new ResponseBody(false, undefined, error));
    }
}

