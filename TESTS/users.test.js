const supertest = require('supertest');
const server = require('../server');
const { dbconnect, dbclose } = require('./mock-db');
const request = supertest(server);


beforeAll( async () => await dbconnect(), setTimeout(() => {}, 90*1000));
afterAll(async () => await dbclose());

describe('USER TESTS', () => {
    
    let userPassword;
    it('return ok(200) status code for user registration', async () => {
        const response = await request.post('/api/v1/userRoute/register')
        .send({
            name: 'test-name',
            email: 'test-email@gmail.com',
            password: 'test-password'
        })
        expect(response.statusCode).toEqual(200);
        userPassword = response.body.password;
        console.log("HASHED REGISTERED USER " + userPassword);
    });
    it('Should return bad request(400) status code, for user registration, w/o required request body', async () => {
        const response = await request.post('/api/v1/userRoute/register')
        .send ({
            email: 'test-email@gmail.com',
            password: 'test-password'
        });
        expect(response.statusCode).toEqual(400);
    });
    it('should reutrn ok(200) status code, for user login, while returning an Authentication TOKEN', async () => {
        const response = await request.post('/api/v1/userRoute/login')
        .send ({
            email: 'test-email@gmail.com',
            password: 'test-password'
        })
        expect(response.statusCode).toEqual(200);
        expect(response.body.token).toBeTruthy();
        console.log("AUTHENTICATION TOKEN RECEIVED ---> " + response.body.token)
    });
    it('should reutrn bad request(400) status code, for user login, w/ invalid password', async () => {
        const response = await request.post('/api/v1/userRoute/login')
        .send ({
            email: 'test-email@gmail.com',
            password: 'incorrect-test-password'
        })
        expect(response.statusCode).toEqual(400);
    });
})