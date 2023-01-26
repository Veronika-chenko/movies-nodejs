/* eslint-disable no-undef */
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const supertest = require('supertest');

const { app } = require('../../src/app');

mongoose.set("strictQuery", false);
const { HOST_TEST_URI } = process.env;
const { User } = require('../../src/models/user');

describe("register", () => {
    beforeAll(async () => {
        await mongoose.connect(HOST_TEST_URI)
        await User.deleteMany()
        console.log("contacted to db test")
    })
    afterAll(async () => {
        await mongoose.disconnect(HOST_TEST_URI)
        console.log("disconnect to db test")
    })
    it("should register new user", async() => {
        const response = await supertest(app).post("/api/auth/register").send({
            email: "user1@gmail.com",
            password: "user1123",
        });
        // console.log("body", response.body)

        expect(response.statusCode).toBe(201);
        expect(response.body.data.user.email).toBe('user1@gmail.com');

    })
    it("should not register the same user second time", async() => {
        await supertest(app).post("/api/auth/register").send({
            email: "user2@gmail.com",
            password: "user1123",
        });
        const response = await supertest(app).post("/api/auth/register").send({
            email: "user2@gmail.com",
            password: "user1123",
        });
        // console.log("body", response.body)

        expect(response.statusCode).toBe(409);
    })
});