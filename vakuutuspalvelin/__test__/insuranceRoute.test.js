const request = require("supertest");
const app = require("../app");

describe('Insurance REST', () => {
    let id;

    it('should CREATE one insurance', () => {
        let insurance = {
            userid: "1234",
            insurancetype: "Testivakuutus",
            valid: "true",
            nextPaymentDate: "2018-12-12",
        };

        return request(app)
            .post("/insurances")
            .send(insurance)
            .expect(201)
            .expect("Content-Type", /json/)
            .then(res => {
                id = res.body._id;
                console.log("id", id);
            })
    })

    it('should GET the previously created insurance', function () {
        return request(app)
            .get("/insurances/" + id)
            .expect(200)
            .then(res => {
                expect(res).toBeDefined();
                expect(res.body).toHaveProperty("userid", "1234");
                expect(res.body).toHaveProperty("nextPaymentDate", "2018-12-12");
            })
    });

    it('should GET all insurances', () => {
        return request(app)
            .get("/insurances")
            .expect(200)
            .expect("Content-Type", /json/)
            .then(res => {
                expect(res).toBeDefined();
                expect(res.body).toBeInstanceOf(Array);
                expect(res.body.length).toBeGreaterThan(0);
            })
    });

    it('should UPDATE the previously created insurance', function () {
        let other = {
            _id: id,
            userid: "1234",
            insurancetype: "Testivakuutus",
            valid: "true",
            nextPaymentDate: "2019-12-12",
        };

        return request(app)
            .put("/insurances")
            .send(other)
            .expect(200)
            .then(res => {
                expect(res).toBeDefined();
                expect(res.body).toHaveProperty("userid", "1234");
                expect(res.body).toHaveProperty("nextPaymentDate", "2019-12-12");
            })

    });

    it('should DELETE the insurance that was created', function () {
        return request(app)
            .delete("/insurances/" + id)
            .expect(204);
    });

    // it('should not GET the insurance that was deleted', function () {
    //     return request(app)
    //         .get("/insurances/" + id)
    //         .expect(404)
    //         .then(res => {
    //             expect(res).toBe(undefined);
    //         })
    // });
});