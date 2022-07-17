const supertest = require("supertest");
const server = require("../server");
const { dbconnect, dbclose } = require("./mock-db");
const { seedData, token, seedEventId } = require("./dbSeeder");
const request = supertest(server);
console.log("TOKEN RECEIVED IN TEST FILE------>" + token);

beforeAll(async () => {
  await dbconnect();
  setTimeout(() => {}, 90 * 1000);
  seedData();
});

afterAll(async () => await dbclose());

describe("TABLE", () => {
  let validTableId;
  it("Should return okay(200) status code, for table creation, w/ Auth Token ", async () => {
    const response = await request
      .post("/api/v1/tableRoute/".concat(seedEventId))
      .set({ Cookie: `AuthToken=${token}` })
      .send({
        tableName: "test table 1",
        tableGuests: [{ firstName: "Bob", lastName: "Jones" }],
      });
    expect(response.statusCode).toEqual(200);
    validTableId = response.body.id;
  });
  it("Should return UnAuthorized(401) status code, for table creation, w/o Auth Token", async () => {
    const response = await request
      .post("/api/v1/tableRoute/".concat(seedEventId))
      .set({ Cookie: `noValidAuthToken` })
      .send({
        tableName: "test table 1",
        tableGuests: [{ firstName: "Bob", lastName: "Jones" }],
      });
    expect(response.statusCode).toEqual(401);
  });
  it("Should return bad request error(400) status code, for table creation, w/o required request body", async () => {
    const response = await request
      .post("/api/v1/tableRoute/".concat(seedEventId))
      .set({ Cookie: `AuthToken=${token}` })
      .send({ tableGuests: ["guest 1", "guest 2", "guest 3"] });
    expect(response.statusCode).toEqual(400);
  });
  it("Should return okay(200) status code, for individual table retreival, w/ Auth Token & valid table ID ", async () => {
    const response = await request
      .get(`/api/v1/tableRoute/`.concat(validTableId))
      .set({ Cookie: `AuthToken=${token}` });
    expect(response.statusCode).toEqual(200);
    console.log(validTableId);
  });
  it("Should return okay(401) status code, for individual table retreival, w/o Auth Token", async () => {
    const response = await request
      .get(`/api/v1/tableRoute/`.concat(validTableId))
      .set({ Cookie: `noValidAuthToken` });
    expect(response.statusCode).toEqual(401);
  });
  it("Should return Client Error(400) status code, for individual table retreival, w/ invalid table ID ", async () => {
    const response = await request
      .get(`/api/v1/tableRoute/12345`)
      .set({ Cookie: `AuthToken=${token}` });
    expect(response.statusCode).toEqual(400);
  });
  it("Should return okay(200) status code, for event table retreival, w/ Auth Token & valid table ID ", async () => {
    const response = await request
      .get(`/api/v1/tableRoute/tables/`.concat(seedEventId))
      .set({ Cookie: `AuthToken=${token}` });
    expect(response.statusCode).toEqual(200);
    console.log(validTableId);
  });
  it("Should return unAuthorized(401) status code, for event table retreival, w/o Auth Token", async () => {
    const response = await request
      .get(`/api/v1/tableRoute/tables/`.concat(seedEventId))
      .set({ Cookie: `noValidAuthToken` });
    expect(response.statusCode).toEqual(401);
  });
  it("Should return Bad Request Error(400) status code, for event table retreival, w/ invalid table ID ", async () => {
    const response = await request
      .get(`/api/v1/tableRoute/tables/12345`)
      .set({ Cookie: `AuthToken=${token}` });
    expect(response.statusCode).toEqual(400);
  });
  it("Should return okay(200) status code, for seat table update, w/ Auth Token & valid table ID ", async () => {
    const response = await request
      .put("/api/v1/tableRoute/add_guest/".concat(validTableId))
      .set({ Cookie: `AuthToken=${token}` })
      .send({
        firstName: "Joe",
        lastName: "Doe",
      });
    expect(response.statusCode).toEqual(200);
  });
  it("Should return unAuthorized(401) status code, for seat table update, w/o Auth Token", async () => {
    const response = await request
      .put("/api/v1/tableRoute/add_guest/".concat(validTableId))
      .send({
        firstName: "Joe",
        lastName: "Doe",
      })
      .set({ Cookie: `noValidAuthToken` });
    expect(response.statusCode).toEqual(401);
  });
  it("Should return Bad Request(400) status code, for table update, w/ invalid table ID ", async () => {
    const response = await request
      .put(`/api/v1/tableRoute/add_guest/12345`)
      .set({ Cookie: `AuthToken=${token}` })
      .send({ firstName: "Joe" });
    expect(response.statusCode).toEqual(400);
  });
  it("Should return okay(200) status code, for seat table update, w/ Auth Token & valid table ID ", async () => {
    const response = await request
      .put("/api/v1/tableRoute/remove_guest/".concat(validTableId))
      .set({ Cookie: `AuthToken=${token}` })
      .send({
        firstName: "Joe",
        lastName: "Doe",
      });
    expect(response.statusCode).toEqual(200);
  });
  it("Should return unAuthorized(401) status code, for seat table update, w/o Auth Token", async () => {
    const response = await request
      .put("/api/v1/tableRoute/remove_guest/".concat(validTableId))
      .send({
        firstName: "Joe",
        lastName: "Doe",
      })
      .set({ Cookie: `noValidAuthToken` });
    expect(response.statusCode).toEqual(401);
  });
  it("Should return Bad Request(400) status code, for table update, w/ invalid table ID ", async () => {
    const response = await request
      .put(`/api/v1/tableRoute/remove_guest/12345`)
      .set({ Cookie: `AuthToken=${token}` })
      .send({ firstName: "Joe" });
    expect(response.statusCode).toEqual(400);
  });
  it("Should return Bad Request(400) status code, for table deletion, w/INVALID table ID ", async () => {
    const response = await request
      .delete(`/api/v1/tableRoute/remove_table/12345`)
      .set({ Cookie: `AuthToken=${token}` });
    expect(response.statusCode).toEqual(400);
  });
  it("Should return unAuthorized(401) status code, for table deletion, w/o Auth Token", async () => {
    const response = await request
      .delete("/api/v1/tableRoute/remove_table".concat(validTableId))
      .set({ Cookie: `noValidAuthToken` });
    expect(response.statusCode).toEqual(401);
  });
  it("Should return okay(200) status code, for table deletion, w/ Auth Token & valid tableID ", async () => {
    const response = await request
      .delete("/api/v1/tableRoute/remove_table/".concat(validTableId))
      .set({ Cookie: `AuthToken=${token}` });
    expect(response.statusCode).toEqual(200);
  });
});
