const superteste = require("supertest");
const app = require("../index");
describe("Get/", function () {

    it("Deverá retornar o status 200", function (done) {
        superteste(app)
        .get("/")
        .expect(200)
        .end(function (erro, response) { 
            if (erro) done(erro)
            done();
        });
    });




});