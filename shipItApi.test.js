"use strict";

const AxiosMockAdapter = require(
  "axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

const {
  shipProduct, SHIPIT_SHIP_URL, SHIPIT_API_KEY
} = require("./shipItApi");


// test("shipProduct", async function () {
//   const shipId = await shipProduct({
//     productId: 1000,
//     name: "Test Tester",
//     addr: "100 Test St",
//     zip: "12345-6789",
//   });

//   expect(shipId).toEqual(expect.any(Number));
// });


test("shipIt API Test", async function () {

  axiosMock.onPost(SHIPIT_SHIP_URL, {
    itemId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789", 
    key: SHIPIT_API_KEY
  })
    .reply(200, {
      "receipt": {"shipId": 1628}
    });

  const res = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789"
  });
  expect(res).toEqual({
    "shipped": {
      itemId: 1000,
      name: 'Test Tester',
      addr: '100 Test St',
      zip: '12345-6789',
      shipId: 1628
    }
  });
});