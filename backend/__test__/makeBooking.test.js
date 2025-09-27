const request = require("supertest");
const express = require("express");
const makeBookingRouter = require("../routes/makeBooking");

const app = express();
app.use(express.json()); // needed for POST
app.use("/makeBooking", makeBookingRouter);

describe("POST /makeBooking", () => {
  it("should return 200 when booking succeeds (mocked)", async () => {
    const bookingServiceManager = require("../libraries/bookingServiceManager").bookingServiceManager;
    bookingServiceManager.prototype.addBooking = jest.fn().mockResolvedValue(true);
    bookingServiceManager.prototype.mailBooking = jest.fn().mockResolvedValue(true);
    bookingServiceManager.prototype.addSlotsToDB = jest.fn().mockResolvedValue(true);

    const res = await request(app)
      .post("/makeBooking")
      .send({
        title: "Mr.",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "123456",
        email: "test@example.com",
        numberOfGuests: 2,
        date: "2025-12-01",
        time: "18:00",
        comment: "Window seat please"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body.data).toHaveProperty("firstName", "John");
  });

  it("should return 500 if addBooking fails", async () => {
    const bookingServiceManager = require("../libraries/bookingServiceManager").bookingServiceManager;
    bookingServiceManager.prototype.addBooking = jest.fn().mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .post("/makeBooking")
      .send({
        title: "Mr.",
        firstName: "Fail",
        lastName: "Case",
        phoneNumber: "123456",
        email: "fail@example.com",
        numberOfGuests: 2,
        date: "2025-12-01",
        time: "18:00",
        comment: ""
      });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("status", "error");
  });
});
