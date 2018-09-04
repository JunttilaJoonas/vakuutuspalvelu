const request = require("supertest");
const app = require('../app');

describe('Application REST', () => {
    it('should create one application', () => {
        let application = {
            insurancetype: "Testivakuutus",
            userid: '2323'
        };
        return request(app)
            .post('/application/create')
            .send(application)
            .expect("Content-type, /json/")
            .then(res => {
                id = res.body_id;
            })
    })
});