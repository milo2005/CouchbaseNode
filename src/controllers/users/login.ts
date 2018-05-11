import { UserService } from "../../services/user-service";
import { Request, Response, NextFunction } from "express";
import { sign } from "jsonwebtoken";
import { sendFail, sendSuccess } from "../_common/ctrl-ext";


/**
 * @apiDefine Login
 * @apiParam {Object} Credentials JSON object
 * @apiParam {String} Credentials.username nombre de usuario
 * @apiParam {String} Credentials.password contraseña de usuario
 */
export interface Login {
    username: string;
    password: string;
}

export function login(req: Request, res: Response, next: NextFunction) {
    const body: Login = req.body;
    UserService.instace.login(body.username, body.password)
        .then(result => {
            if (result) {
                const secret = process.env.SESSION_SECRET;
                const token = sign({ id: result.id }, secret);
                sendSuccess(res, token);
            }
            else sendFail(res, "Usuario o contraseña erroneo");
        })
        .catch(err => {
            next(err);
        });
}