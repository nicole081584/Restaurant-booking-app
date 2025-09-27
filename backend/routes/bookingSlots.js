// routes/bookingSlots.js
"use strict";

const express = require('express');
const router = express.Router();
const { bookingServiceManager } = require ('../libraries/bookingServiceManager.js')

const bookingManager = new bookingServiceManager();

/**
 * GET /bookingSlots route.
 * To get all available booking slots on the date for the number of people
 * 
 * @param date           the date we want to retrieve the booking slots for
 * @param numberOfGuests the number of guests the booking is for
 * @returns              A json string representing an array of the available booking slots for the date
 */

  router.get("/", async (req, res) => {
  const { date, numberOfGuests } = req.query;

    console.log("Request to GET available booking slots: Date: "+date+", Number of Guests: "+numberOfGuests);

    if (!date || !numberOfGuests) {
    return res.status(400).json({
      status: "error",
      message: "Missing required parameters: date and numberOfGuests",
    });
  }

  try {
    const slots = await bookingManager.findBookingSlots(date, numberOfGuests);
    
    console.log("Available slots: ", slots);

    if (slots && slots.length > 0) {
      return res.status(200).json({
        status: "success",
        data: slots,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "No booking slots available online. Please contact the Restaurant to book",
      });
    }
  } catch (error) {
    console.error("Error in GET /bookingSlots:", error);
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
});

module.exports = router;
