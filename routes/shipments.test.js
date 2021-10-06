"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("productId is too low", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 900,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([
      "instance.productId must be greater than or equal to 1000"
    ]);
  });

  test("productId is not a integer", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: "not an integer",
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([
      "instance.productId is not of a type(s) integer"
    ]);
  });

  test("name is not a string", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: 1,
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([
      "instance.name is not of a type(s) string"
    ]);
  });

  test("addr is not a string", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: ["not a string"],
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([
      "instance.addr is not of a type(s) string"
    ]);
  });

  test("zip is not a string", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: ["not a string"],
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([
      "instance.zip is not of a type(s) string"
    ]);
  });


});
