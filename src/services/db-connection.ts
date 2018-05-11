import { initialAdmin } from "../config/ini";
import { request } from "https";
import { promisifyAll, Promise } from "bluebird";
import * as UUID from "UUID";
import { config } from "../config/global";
import { TYPE_USER } from "../models/user";

const couch = require("couchbase");
const N1qlQuery = couch.N1qlQuery;

export interface Document<T> {
    id: string;
    doc: T;
}

export class DBConnection {

    private static _instance: DBConnection;
    static get instance(): DBConnection {
        if (DBConnection._instance == undefined) {
            DBConnection._instance = new DBConnection();
        }
        return DBConnection._instance;
    }

    private bucket: any;
    private bucketName = config.database.bucket;

    constructor(callback: (() => void) = undefined) {
        const database = config.database;
        const cluster: any = new couch.Cluster(`couchbase://${database.host}`);
        cluster.authenticate({ username: database.username, password: database.password });
        this.bucket = promisifyAll(cluster.openBucket(this.bucketName));

        this.setupBucket()
            .then(x => this.initalConfig())
            .then(x => { if (callback != undefined) callback(); })
            .catch(err => console.log(err));

    }

    private setupBucket(): Promise<any> {
        const findPK = "SELECT * FROM system:indexes WHERE name = $1";
        const createPK = "CREATE PRIMARY INDEX `" + this.bucketName + "-pi` ON `" + this.bucketName + "`";
        const createTypeIndex = "CREATE INDEX ix_type ON `" + this.bucketName + "`(type)";
        return this.bucket.queryAsync(N1qlQuery.fromString(findPK), [this.bucketName + "-pi"])
            .then((x: any) => x.length > 0 ? 0 :
                this.bucket.queryAsync(N1qlQuery.fromString(createPK))
                    .then((y: any) => this.bucket.queryAsync(N1qlQuery.fromString(createTypeIndex))));
    }

    private initalConfig(): Promise<string> {
        return this.typedOne(TYPE_USER)
            .then(x => x == undefined ? this.insert(initialAdmin) : "");

    }

    insertId(id: string, body: any): Promise<string> {
        return this.bucket.insertAsync(id, body)
            .then(() => id);
    }

    insert(body: any): Promise<string> {
        const id = UUID.v4();
        return this.bucket.insertAsync(id, body)
            .then((x: any) => id);
    }

    list<T>(where: string, params: any[], limit: number = undefined, offset: number = undefined): Promise<Document<T>[]> {
        return this.getByQuery(where, params, undefined, limit, offset);
    }

    listWithSlt<T>(select: string, where: string, params: any[], limit: number = undefined, offset: number = undefined): Promise<Document<T>[]> {
        return this.getByQuery(where, params, select, limit, offset);
    }

    ListByType<T>(type: string, where: string = undefined, params: any[] = [], limit: number = undefined, offset: number = undefined): Promise<Document<T>[]> {
        let whereQuery = "type = '" + type + "'";
        if (where) whereQuery += " AND " + where;
        return this.getByQuery(whereQuery, params, undefined, limit, offset);
    }

    ListWithSltByType<T>(type: string, select: string, where: string = undefined, params: any[] = [], limit: number = undefined, offset: number = undefined): Promise<Document<T>[]> {
        let whereQuery = "type = '" + type + "'";
        if (where) whereQuery += " AND " + where;
        return this.getByQuery(whereQuery, params, select, limit, offset);
    }

    one<T>(where: string, params: any[], select: string = undefined): Promise<Document<T>> {
        return this.getOneByQuery(where, params, select);
    }

    typedOne<T>(type: string, where: string = undefined, params: any[] = [], select: string = undefined): Promise<Document<T>> {
        let whereQuery = "type = '" + type + "'";
        if (where) whereQuery += " AND " + where;
        return this.getOneByQuery(whereQuery, params, select);
    }

    getById<T>(id: string): Promise<Document<T>> {
        return this.bucket.getAsync(id)
            .then((x: any) => { return { id: id, doc: x.value }; })
            .catch((err: any): any => {
                if (err.code != 13) throw err;
                return undefined;
            });
    }



    remove(id: string): Promise<string> {
        return this.bucket.removeAsync(id)
            .then((x: any) => id);
    }

    replace(id: string, body: any): Promise<string> {
        return this.bucket.replaceAsync(id, body)
            .then((x: any) => id);
    }

    update(set: string, params: any[], where: string): Promise<string> {
        const query = "UPDATE `" + config.database.bucket + "` " + `SET ${set} WHERE ${where}`;
        const n1ql = N1qlQuery.fromString(query);
        return this.bucket.queryAsync(n1ql, params)
            .then((x: any) => true);
    }

    updateById(id: string, set: string, params: any[], where: string = undefined): Promise<string> {
        let query = "UPDATE `" + this.bucketName + "` " + "SET "
            // + set
            + "cedula = 987"
            + " WHERE meta(`" + this.bucketName + "`).id = '" + id + "'";
        if (where) query += ` AND ${where}`;
        console.log("N1QL Update=> " + query);
        const n1ql = N1qlQuery.fromString(query);
        return this.bucket.queryAsync(n1ql, params)
            .then((x: any) => {
                console.log(JSON.stringify(x));
                return id;
            });
    }

    private getByQuery(where: string, params: any[], select: string = undefined, limit: number = undefined, offset: number = undefined): Promise<any> {
        let query = `SELECT ${select != undefined ? select : "meta(`" + this.bucketName + "`).id, *"} ` + "FROM `" + this.bucketName + "` WHERE " + `${where}`;
        if (limit) query += ` LIMIT ${limit}`;
        if (offset) query += ` LIMIT ${offset}`;
        console.log("QUERY=>" + query);
        const n1ql = N1qlQuery.fromString(query);
        return this.bucket.queryAsync(n1ql, params)
            .then((x: any[]) => { return x.map(y => { return { id: y.id, doc: y[this.bucketName] }; }); });
    }

    private getOneByQuery(where: string, params: any[], select: string = undefined) {
        const query = `SELECT ${select != undefined ? select : "meta(`" + this.bucketName + "`).id, *"} ` + "FROM `" + this.bucketName + "` WHERE " + `${where} LIMIT 1`;
        const n1ql = N1qlQuery.fromString(query);
        return this.bucket.queryAsync(n1ql, params)
            .then((x: any[]) => {
                return x.map(y => { return { id: y.id, doc: y[this.bucketName] }; });
            })
            .then((x: any[]) => x.length > 0 ? x[0] : undefined);
    }

}


