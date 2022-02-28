process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");

let items = require("../model");

beforeEach(function () {
    let newItem = { name: "popsicle", price: 1.50 };
    items.addItem(newItem);
});

afterEach(function () {
    items.list.length = 0;
});

describe("GET /items", function () {
    test("Gets a list of items", async function () {
        const resp = await request(app).get(`/items`);

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([{ name: "popsicle", price: 1.50 }]);
    });
});

describe("POST /items/:name", function () {
    test("Gets specified item with name", async function () {
        const resp = await request(app).post(`/items`).send({ name: 'Cheerios', price: 4.00 });

        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({ added: { name: 'Cheerios', price: 4.00 } });
    });
});

describe("GET /items/:name", function () {
    test("Gets specified item with name", async function () {
        const resp = await request(app).get(`/items/popsicle`);

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ name: "popsicle", price: 1.50 });
    });

    test("Respond with 404 error if no item matches name", async function () {
        const resp = await request(app).get(`/items/watermelon`);

        expect(resp.statusCode).toBe(404);
    });
});

describe("PATCH /items/:name", function () {
    test("Updates specified item with name", async function () {
        const resp = await request(app).patch(`/items/popsicle`).send({ name: "popsicle", price: 2.00 });

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ updated: { name: "popsicle", price: 2.00 } });
    });

    test("Respond with 404 error if no item matches name", async function () {
        const resp = await request(app).patch(`/items/watermelon`).send({ name: "watermelon", price: 5.00 });

        expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", function () {
    test("Deletes specified item with name", async function () {
        const resp = await request(app).delete(`/items/popsicle`);

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    });

    test("Respond with 404 error if no item matches name", async function () {
        const resp = await request(app).delete(`/items/watermelon`);

        expect(resp.statusCode).toBe(404);
    });
});