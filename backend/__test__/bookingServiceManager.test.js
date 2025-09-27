// __test__/bookingServiceManager.test.js
const { bookingServiceManager } = require("../libraries/bookingServiceManager");

// Mock DB connections BEFORE importing manager
jest.mock("../libraries/prepareDatabases", () => ({
  bookingsdb: { run: jest.fn() },
  bookingSlotsdb: { get: jest.fn(), run: jest.fn() },
}));

const { bookingsdb, bookingSlotsdb } = require("../libraries/prepareDatabases");

// Mock nodemailer
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

const nodemailer = require("nodemailer");

describe("bookingServiceManager", () => {
  let manager;

  beforeEach(() => {
    manager = new bookingServiceManager();
    jest.clearAllMocks();
  });

  // -------------------------
  // findBookingSlots
  // -------------------------
  describe("findBookingSlots", () => {
    it("should return default slots if no row exists", async () => {
      bookingSlotsdb.get.mockImplementation((query, values, cb) => cb(null, null));

      const slots = await manager.findBookingSlots("25/09/2025", 2);

      expect(Array.isArray(slots)).toBe(true);
      expect(slots.length).toBeGreaterThan(0);
    });

    it("should apply day rules (e.g., Tuesday filter)", async () => {
      bookingSlotsdb.get.mockImplementation((query, values, cb) => {
        cb(null, { date: "25/09/2025", "12:00": 0, "15:30": 0, "20:00": 0 });
      });

      const slots = await manager.findBookingSlots("23/09/2025", 2); // a Tuesday
      expect(slots.every((t) => t <= "15:00")).toBe(true);
    });

    it("should reject on DB error", async () => {
      bookingSlotsdb.get.mockImplementation((q, v, cb) => cb(new Error("DB error")));

      await expect(manager.findBookingSlots("25/09/2025", 2)).rejects.toThrow("DB error");
    });
  });

  // -------------------------
  // addBooking
  // -------------------------
  describe("addBooking", () => {
    const booking = {
      bookingNumber: "123",
      title: "Mr.",
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123456",
      email: "test@example.com",
      numberOfGuests: 2,
      dateOfBooking: "25/09/2025",
      time: "18:00",
      comment: "Window seat",
      dateBookingWasMade: "25/09/2025",
    };

    it("should resolve true on success", async () => {
      bookingsdb.run.mockImplementation((query, values, cb) => cb(null));

      const result = await manager.addBooking(booking, "bookings");

      expect(result).toBe(true);
      expect(bookingsdb.run).toHaveBeenCalled();
    });

    it("should reject on DB error", async () => {
      bookingsdb.run.mockImplementation((q, v, cb) => cb(new Error("DB error")));

      await expect(manager.addBooking(booking, "bookings")).rejects.toThrow("DB error");
    });
  });

  // -------------------------
  // deletBooking
  // -------------------------
  describe("deletBooking", () => {
    it("should resolve true if booking deleted", async () => {
      bookingsdb.run.mockImplementation((q, v, cb) => cb.call({ changes: 1 }, null));

      const result = await manager.deletBooking({ bookingNumber: "123" }, "bookings");
      expect(result).toBe(true);
    });

    it("should resolve false if no booking deleted", async () => {
      bookingsdb.run.mockImplementation((q, v, cb) => cb.call({ changes: 0 }, null));

      const result = await manager.deletBooking({ bookingNumber: "123" }, "bookings");
      expect(result).toBe(false);
    });

    it("should reject on DB error", async () => {
      bookingsdb.run.mockImplementation((q, v, cb) => cb(new Error("DB error")));

      await expect(
        manager.deletBooking({ bookingNumber: "123" }, "bookings")
      ).rejects.toThrow("DB error");
    });
  });

  // -------------------------
  // mailBooking
  // -------------------------
  describe("mailBooking", () => {
    const booking = {
      bookingNumber: "123",
      title: "Mr.",
      lastName: "Doe",
      email: "test@example.com",
      numberOfGuests: 2,
      dateOfBooking: "25/09/2025",
      time: "18:00",
    };

    it("should send email successfully", async () => {
      const sendMailMock = jest.fn().mockResolvedValue(true);
      nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

      const result = await manager.mailBooking(booking);

      expect(result).toBe(true);
      expect(sendMailMock).toHaveBeenCalled();
    });

    it("should throw if email fails", async () => {
      const sendMailMock = jest.fn().mockRejectedValue(new Error("SMTP error"));
      nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

      await expect(manager.mailBooking(booking)).rejects.toThrow("SMTP error");
    });
  });

  // -------------------------
  // addSlotsToDB
  // -------------------------
  describe("addSlotsToDB", () => {
    it("should insert new row if date not found", async () => {
      bookingSlotsdb.get.mockImplementation((q, v, cb) => cb(null, null));
      bookingSlotsdb.run.mockImplementation((q, v, cb) => cb(null));

      const result = await manager.addSlotsToDB("25/09/2025", "12:00", 2);

      expect(result).toBe(true);
      expect(bookingSlotsdb.run).toHaveBeenCalled();
    });

    it("should update row if date exists", async () => {
      bookingSlotsdb.get.mockImplementation((q, v, cb) =>
        cb(null, { date: "25/09/2025", "12:00": 1 })
      );
      bookingSlotsdb.run.mockImplementation((q, v, cb) => cb(null));

      const result = await manager.addSlotsToDB("25/09/2025", "12:00", 2);

      expect(result).toBe(true);
      expect(bookingSlotsdb.run).toHaveBeenCalled();
    });

    it("should reject on select error", async () => {
      bookingSlotsdb.get.mockImplementation((q, v, cb) => cb(new Error("DB error")));

      await expect(manager.addSlotsToDB("25/09/2025", "12:00", 2)).rejects.toThrow("DB error");
    });

    it("should reject on update error", async () => {
      bookingSlotsdb.get.mockImplementation((q, v, cb) =>
        cb(null, { date: "25/09/2025", "12:00": 1 })
      );
      bookingSlotsdb.run.mockImplementation((q, v, cb) => cb(new Error("Update error")));

      await expect(manager.addSlotsToDB("25/09/2025", "12:00", 2)).rejects.toThrow("Update error");
    });
  });
});
