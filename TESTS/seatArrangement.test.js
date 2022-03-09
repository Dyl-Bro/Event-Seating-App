const supertest = require('supertest');
const server = require('../server');
const { seedData, token, seeduserID} = require('./dbSeeder');
const { dbconnect, dbclose } = require('./mock-db');
const request = supertest(server);

beforeAll( async () => {
    await dbconnect();
    setTimeout(() => {}, 90*1000);
    seedData();
});
afterAll( async () => {
    await dbclose();
});


describe('SEAT ARRANGEMENT TESTS', () => {
    let validSeatArrangementID;
    it('Should return okay(200) status code for seat arrangement creation', async () => {
        const response = await request
        .post('/api/v1/seatArrangementRoute')
        .set({'Authorization':  `Bearer ${token}`})
        .send({
            eventName: 'Test Seating Arrangement', 
            user: seeduserID,
            tables: [
                {
                    "name": "table 1 for guest's wedding ",
                    "guests" : ["evangeline", "mama Odie", "ray"]
                },
                {
                    "name": "table 2 for guest's wedding ",
                    "guests" : ["naveen", "tiana", "charlotte", "carlotta"]
                }
            ] 
        });
        expect(response.statusCode).toEqual(200);
        validSeatArrangementID = response.body.id;
    });
    it('should return UnAuthorized(401) status code, for seat arrangeent creation,  w/o auth token', async() => {
        const response = await request
        .post('/api/v1/seatArrangementRoute')
        .send({
            eventName: 'Test Seating Arrangement', 
            user: seeduserID,
            tables: [
                {
                    "name": "table 1 for guest's wedding ",
                    "guests" : ["evangeline", "mama Odie", "ray"]
                },
                {
                    "name": "table 2 for guest's wedding ",
                    "guests" : ["naveen", "tiana", "charlotte", "carlotta"]
                }
            ]
        });
        expect(response.statusCode).toEqual(401)
    })
    it('Should return bad request(400) status code, for seat arrangement creation, w/o required request body ', async () => {
        const response = await request
        .post('/api/v1/seatArrangementRoute')
        .set({'Authorization':  `Bearer ${token}`})
        .send({
            user: seeduserID,
            tables: [
                {
                    "name": "table 1 for guest's wedding ",
                    "guests" : ["evangeline", "mama Odie", "ray"]
                },
                {
                    "name": "table 2 for guest's wedding ",
                    "guests" : ["naveen", "tiana", "charlotte", "carlotta"]
                }
            ] 
        });
        expect(response.statusCode).toEqual(400);
    });
    it('should return UnAuthorized(401) status code, for seat arrangement retreival, w/o auth token', async() => {
        const response = await request
        .get('/api/v1/seatArrangementRoute/'.concat(validSeatArrangementID));
        expect(response.statusCode).toEqual(401);
    });
    it('should return (400) status code, for seat arrangement retreival, w/ invalid ID in URL', async() => {
        const response = await request
        .get('/api/v1/seatArrangementRoute/12345')
        .set({'Authorization' : `Bearer ${token}`});
        expect(response.statusCode).toEqual(400);
    });

    it('Should return okay(200) status code, for seat arrangement retreival w/ vlaid seatArrangemetID, & Auth Token ', async () => {
        const response = await request
        .get('/api/v1/seatArrangementRoute/'.concat(validSeatArrangementID))
        .set({'Authorization':  `Bearer ${token}`});
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeTruthy();
        console.log("valid seating ID: " + validSeatArrangementID);
    });
    it('Should return okay(200) status code, for seat arrangement retreival w/ valid userID & Auth Token ', async () => {
        const response = await request
        .get('/api/v1/seatArrangementRoute/'.concat(seeduserID))
        .set({'Authorization':  `Bearer ${token}`});
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeTruthy();
        console.log("user ID: " + seeduserID);
    });
    it('should return UnAuthorized(401) status code, for seat arrangement update, w/o auth token ', async () => {
        const response = await request
        .put('/api/v1/seatArrangementRoute/'.concat(validSeatArrangementID))
        .send ( {
            eventName: 'Updated Test Seating Arrangement', 
            user: seeduserID, 
        });
        expect(response.statusCode).toEqual(401);
    });
    it('should return bad request(400) status code, for seat arrangement update, w/o invalid seat ID', async () => {
        const response = await request
        .put('/api/v1/seatArrangementRoute/12345')
        .set({'Authorization' : `Bearer ${token}`})
        .send ( {
            eventName: 'Updated Test Seating Arrangement', 
            user: seeduserID, 
        });
        expect(response.statusCode).toEqual(400);
    });
    it('should return okay(200) status code, for seat arrangement update w/ valid auth token, ID,& request body', async () => {
        const response = await request
        .put('/api/v1/seatArrangementRoute/'.concat(validSeatArrangementID))
        .set({'Authorization' : `Bearer ${token}`})
        .send ( {
            eventName: 'Updated Test Seating Arrangement', 
            user: seeduserID, 
        });
        expect(response.statusCode).toEqual(200);
    });
    it('should reutrn unAuthorized(401) status code, for seat arrangement deletion, w/o proper auth token', async () => {
        const response = await request
        .delete('/api/v1/seatArrangementRoute/'.concat(validSeatArrangementID))
        expect(response.statusCode).toEqual(401);
    });
    it('should reutrn bad request(400) status code, for seat arrangement deletion, w/o valid ID', async () => {
        const response = await request
        .delete('/api/v1/seatArrangementRoute/1234567890')
        .set({'Authorization' : `Bearer ${token}`});
        expect(response.statusCode).toEqual(400);
    });
    it('should reutrn okay(200) status code, for seat arrangement deletion', async () => {
        const response = await request
        .delete('/api/v1/seatArrangementRoute/'.concat(validSeatArrangementID))
        .set({'Authorization' : `Bearer ${token}`});
        expect(response.statusCode).toEqual(200);
    });

})

