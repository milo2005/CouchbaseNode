import { DBConnection } from "../src/services/db-connection";
import { config } from "../src/config/global";
import * as uuid from "uuid";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";


describe("Couchbase CRUD", function () {

    const docId = uuid.v4();
    let db: DBConnection;

    beforeAll(function (done) {
        chai.should();
        chai.use(chaiAsPromised);
        db = new DBConnection(() => { done(); });
    });

    /*afterAll(function (done) {
        db.remove(docId)
            .then(x => done())
            .catch(err => done(err));
    });*/

    it("Insert", function (done) {
        db.insertId(docId, { nombre: "Dario", type: "user", cedula: 123 })
            .then(x => db.updateById(docId, "cedula = $1", []))
            .then(x => {
                // console.log("ID=>" + docId);
                // console.log(JSON.stringify(x));
                done();
            })
            .catch(err => done(err));

    });

    it.skip("Get with ID", function (done) {
        db.getById(docId)
            .then(x => {
                console.log(JSON.stringify(x));
                done();
            })
            .catch(err => done(err));
    });

    it.skip("replace", function (done) {
        db.getById<any>(docId)
            .then(x => {
                x.doc.nombre = "Fernando";
                return db.replace(docId, x.doc);
            })
            .then(x => db.getById(docId))
            .then(x => {
                // console.log(JSON.stringify(x));
                done();
            })
            .catch(err => done(err));
    });

    it.skip("Get with QUERY", function (done) {
        db.list("type = $1 AND cedula = $2", ["user", 123])
            .then(x => {
                console.log(JSON.stringify(x));
                done();
            });
    });

    it.skip("Update", function (done) {
        db.updateById(docId, "cedula = $1", [567])
            .then(x => {
                console.log(JSON.stringify(x));
                done();
            })
            .catch(err => done(err));
    });

});


