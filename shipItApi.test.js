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
  // This simulates the data in the axios call and 
  // prevents axios from making a real web request to the shipit server.
  axiosMock.onPost(SHIPIT_SHIP_URL, { 
    itemId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789", 
    key: SHIPIT_API_KEY
  })
  // this simulates the response from the shipit server.  Receipt 
  // and shipId are the names we got from the response object
    .reply(200, {
      "receipt": {"shipId": 1628}
    });
  // calls shipProduct function from shipitApi.js with the order data 
  // we want to send to the simulated shipit server.
  const res = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789"
  });
  // the 1628 is all that was being returned instead of an object 
  // like we thought earlier.
  expect(res).toEqual(1628);
});

// {
//   "shipped": {
//     itemId: 1000,
//     name: 'Test Tester',
//     addr: '100 Test St',
//     zip: '12345-6789',
//     shipId: 1628
//   }
// }