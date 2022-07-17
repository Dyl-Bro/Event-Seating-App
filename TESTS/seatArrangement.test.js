const supertest = require("supertest");
const server = require("../server");
const { seedData, token, seeduserID } = require("./dbSeeder");
const { dbconnect, dbclose } = require("./mock-db");
const request = supertest(server);

beforeAll(async () => {
  await dbconnect();
  setTimeout(() => {}, 90 * 1000);
  seedData();
});
afterAll(async () => {
  await dbclose();
});

describe("SEAT ARRANGEMENT TESTS", () => {
  let validSeatArrangementID;
  it("Should return okay(200) status code for seat arrangement creation", async () => {
    const response = await request
      .post("/api/v1/seatArrangementRoute")
      .set({ Cookie: `AuthToken=${token}` })
      .send({
        eventName: "Test Seating Arrangement",
        eventDescription: "mock description for testing seat arrangement",
      });
    expect(response.statusCode).toEqual(200);
    validSeatArrangementID = response.body._id;
  });
  it("should return UnAuthorized(401) status code, for seat arrangeent creation,  w/o auth token", async () => {
    const response = await request
      .post("/api/v1/seatArrangementRoute")
      .set({ Cookie: `no valid auth token` })
      .send({
        eventName: "Test Seating Arrangement",
        eventDescription: "mock description for testing seat arrangement",
      });
    expect(response.statusCode).toEqual(401);
  });
  it("Should return bad request(400) status code, for seat arrangement creation, w/o required request body ", async () => {
    const response = await request
      .post("/api/v1/seatArrangementRoute")
      .set({ Cookie: `AuthToken=${token}` })
      .send({
        eventDescription: "mock description for testing seat arrangement",
      });
    expect(response.statusCode).toEqual(400);
  });
  it("should return UnAuthorized(401) status code, for seat arrangement retreival, w/o auth token", async () => {
    const response = await request
      .get("/api/v1/seatArrangementRoute/".concat(seeduserID))
      .set({ Cookie: `no valid auth token` });
    expect(response.statusCode).toEqual(401);
  });
  it("should return (400) status code, for seat arrangement retreival, w/ invalid userID in URL", async () => {
    const response = await request
      .get("/api/v1/seatArrangementRoute/12345")
      .set({ Cookie: `AuthToken=${token}` });
    expect(response.statusCode).toEqual(400);
  });

  it("Should return okay(200) status code, for seat arrangement retreival w/ vlaid seatArrangemetID, & Auth Token ", async () => {
    const response = await request
      .get("/api/v1/seatArrangementRoute/".concat(seeduserID))
      .set({ Cookie: `AuthToken=${token}` });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeTruthy();
  });
  it("should reutrn unAuthorized(401) status code, for seat arrangement deletion, w/o proper auth token", async () => {
    const response = await request
      .delete("/api/v1/seatArrangementRoute/".concat(seeduserID))

      .set({ Cookie: `no valid auth token` });
    expect(response.statusCode).toEqual(401);
  });
  it("should reutrn bad request(400) status code, for seat arrangement deletion, w/o valid ID", async () => {
    const response = await request
      .delete("/api/v1/seatArrangementRoute/1234567890")
      .set({ Cookie: `AuthToken=${token}` });
    expect(response.statusCode).toEqual(400);
  });
  it("should reutrn okay(200) status code, for seat arrangement deletion", async () => {
    const response = await request
      .delete("/api/v1/seatArrangementRoute/".concat(validSeatArrangementID))
      .set({ Cookie: `AuthToken=${token}` });
    expect(response.statusCode).toEqual(200);
  });
});
