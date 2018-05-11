import { DBConnection } from "./db-connection";
import { TYPE_USER } from "../models/user";

export class UserService {

    private static _instance: UserService;
    static get instace(): UserService {
        if (UserService._instance == undefined) {
            UserService._instance = new UserService(DBConnection.instance);
        }
        return UserService._instance;
    }

    constructor(private db: DBConnection) { }

    login(username: string, password: string) {
        return this.db.typedOne<any>(TYPE_USER, "username = $1 AND pass = $2", [username, password]);
    }

}
