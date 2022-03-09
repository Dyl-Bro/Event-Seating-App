const supertest = require('supertest');
const server = require ('../server');
const {dbconnect,dbclose} = require ('./mock-db');
const { seedData, token} = require('./dbSeeder');
const request = supertest(server);
console.log('TOKEN RECEIVED IN TEST FILE------>' + token);



beforeAll (async () => {
    await dbconnect();
    setTimeout(() => {}, 90*1000);
    seedData();

});

afterAll (async () => await dbclose()); 


describe('TABLE', () => {
    let validTableId;
    it('Should return okay(200) status code, for table creation, w/ Auth Token ', async () => {
        const response = await request
        .post('/api/v1/tableRoute')
        .set({'Authorization':  `Bearer ${token}`})
        .send({  name: 'test table 1', guests: ['guest 1', 'guest 2', 'guest 3'] });
        expect(response.statusCode).toEqual(200);
        validTableId = response.body.id;
    });
    it('Should return UnAuthorized(401) status code, for table creation, w/o Auth Token', async () => {
        const response = await request
        .post('/api/v1/tableRoute')
        .send({  name: 'test table 1', guests: ['guest 1', 'guest 2', 'guest 3'] });
        expect(response.statusCode).toEqual(401);
    });
    it('Should return client error(400) status code, for table creation, w/o required request body', async () => {
        const response = await request
        .post('/api/v1/tableRoute')
        .set({'Authorization':  `Bearer ${token}`})
        .send({ guests: ['guest 1', 'guest 2', 'guest 3'] });
        expect(response.statusCode).toEqual(400);
    });
    it('Should return okay(200) status code, for table retreival, w/ Auth Token & valid table ID ', async () => {
        const response = await request
        .get(`/api/v1/tableRoute/`.concat(validTableId) )
        .set({'Authorization':  `Bearer ${token}`});
        expect(response.statusCode).toEqual(200);
        console.log(validTableId);
    });
    it('Should return okay(401) status code, for table retreival, w/o Auth Token', async () => {
        const response = await request
        .get(`/api/v1/tableRoute/`.concat(validTableId) );
        expect(response.statusCode).toEqual(401);
    });
    it('Should return Not Found(400) status code, for table retreival, w/ invalid table ID ', async () => {
        const response = await request
        .get(`/api/v1/tableRoute/12345`)
        .set({'Authorization':  `Bearer ${token}`});
        expect(response.statusCode).toEqual(400);
    });
    it('Should return okay(200) status code, for seat table update, w/ Auth Token & valid table ID ', async () => {
        const response = await request
        .put('/api/v1/tableRoute/'.concat(validTableId))
        .set({'Authorization':  `Bearer ${token}`})
        .send({  name: 'test table 1', guests: ['guest 1', 'guest 2', 'guest 3'] });
        expect(response.statusCode).toEqual(200);
    });
    it('Should return okay(401) status code, for seat table update, w/o Auth Token', async () => {
        const response = await request
        .put('/api/v1/tableRoute/'.concat(validTableId))
        .send({  name: 'test table 1', guests: ['guest 1', 'guest 2', 'guest 3'] });
        expect(response.statusCode).toEqual(401);
    });
    it('Should return Not Found(400) status code, for table update, w/ invalid table ID ', async () => {
        const response = await request
        .put(`/api/v1/tableRoute/12345`)
        .set({'Authorization':  `Bearer ${token}`})
        .send({  name: 'test table 1', guests: ['guest 1', 'guest 2', 'guest 3'] });
        expect(response.statusCode).toEqual(400);
    });
    it('Should return Not Found(400) status code, for table deletion, w/INVALID table ID ', async () => {
        const response = await request
        .delete(`/api/v1/tableRoute/12345`)
        .set({'Authorization':  `Bearer ${token}`});
        expect(response.statusCode).toEqual(400);
    });
    it('Should return okay(401) status code, for table deletion, w/o Auth Token', async () => {
        const response = await request
        .delete('/api/v1/tableRoute/'.concat(validTableId));
        expect(response.statusCode).toEqual(401);
    });
    it('Should return okay(200) status code, for table deletion, w/ Auth Token & valid tableID ', async () => {
        const response = await request
        .delete('/api/v1/tableRoute/'.concat(validTableId))
        .set({'Authorization':  `Bearer ${token}`});
        expect(response.statusCode).toEqual(200);
    });

})


