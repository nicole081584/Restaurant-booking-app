const request = require("supertest");
const express = require("express");
const bookingSlotsRouter = require("../routes/bookingSlots");

const app = express();
app.use("/bookingSlots", bookingSlotsRouter);

describe("GET /bookingSlots", () => {
  it("should return 400 if missing parameters", async () => {
    const res = await request(app).get("/bookingSlots");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("status", "error");
  });

  it("should return 200 with slots (mocked)", async () => {
    // mock bookingManager.findBookingSlots
    const bookingServiceManager = require("../libraries/bookingServiceManager").bookingServiceManager;
    bookingServiceManager.prototype.findBookingSlots = jest.fn().mockResolvedValue(["18:00", "19:00"]);

    const res = await request(app).get("/bookingSlots?date=2025-12-01&numberOfGuests=2");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body.data).toContain("18:00");
  });

  it("should return 404 if no slots available", async () => {
    const bookingServiceManager = require("../libraries/bookingServiceManager").bookingServiceManager;
    bookingServiceManager.prototype.findBookingSlots = jest.fn().mockResolvedValue([]);

    const res = await request(app).get("/bookingSlots?date=2025-12-01&numberOfGuests=2");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("status", "error");
  });
});
