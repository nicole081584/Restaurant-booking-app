// routes/makeBookings.js
"use strict";

const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid'); // for booking number
const booking_js = require("../libraries/booking.js");
const bodyParser = require('body-parser');
const { bookingServiceManager } = require ('../libraries/bookingServiceManager.js');

const jsonParser = bodyParser.json();
const bookingManager = new bookingServiceManager();

/**
* POST /makeBooking route.
* To make a Booking, the customer must provide full name, phone Number, email address, numbere Of Guests, Date and Time.
*
*This will add a new booking to the data base,
 * send a confirmation email and return the full booking details
 * including booking number and date it was booked.
 *
 * @param title           title of the customer
 * @param firstName       first name of the customer
 * @param lastName        lastName of the customer
 * @param phoneNumber     phone Number of the Customer
 * @param email           email of the customer
 * @param numberOfGuests  number of guests in the party
 * @param date            date of booking
 * @param time            time of booking
 * @returns               if sucessful a JSON string representing a booking
 */


  router.post("/", jsonParser, async (req, res) => {
    const {
      title,
      firstName,
      lastName,
      phoneNumber,
      email,
      numberOfGuests,
      date,
      time,
      comment,
    } = req.body;

    //log Post voucher and values
    console.log("Request to POST booking: " + title + ", " + firstName + ", " + lastName + ", " + phoneNumber + ", " + email + ", " + numberOfGuests + ", " + date + ", " + time + ", " + comment);
   
    // Basic validation
  if (!title || !firstName || !lastName || !phoneNumber || !email || !numberOfGuests || !date || !time) {
    return res.status(400).json({
      status: "error",
      message: "Missing required booking details",
    });
  }

  try {
    const bookingNumber = nanoid(12);
    const bookingDate = new Date().toLocaleDateString("en-GB");

    const booking = new booking_js.booking(
      title,
      firstName,
      lastName,
      phoneNumber,
      email,
      numberOfGuests,
      date,
      time,
      comment
    );

    booking.bookingNumber = bookingNumber;
    booking.dateBookingWasMade = bookingDate;

    const success = await bookingManager.addBooking(booking, "bookings");
    if (!success) {
      return res.status(500).json({
        status: "error",
        message: "Booking unsuccessful",
      });
    }

    // Mail confirmation
    try {
      await bookingManager.mailBooking(booking);
    } catch (err) {
      await bookingManager.deletBooking(booking, "bookings");
      return res.status(500).json({
        status: "error",
        message: "Failed to send booking confirmation email",
      });
    }

    // Add slots to DB
    try {
      await bookingManager.addSlotsToDB(booking.dateOfBooking, booking.time, booking.numberOfGuests);
    } catch (err) {
      await bookingManager.deletBooking(booking, "bookings");
      return res.status(500).json({
        status: "error",
        message: "Failed to add booking slots to DB",
      });
    }
    
        //log what happened and respons error if unsucessfull
    console.log("Response from POST makeBooking:", booking);
    return res.status(201).json({
      status: "success",
      data: booking, // you can expose .stringify() if you prefer
    });
  } catch (error) {
    console.error("Error in POST /makeBooking:", error);
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
});

  
module.exports = router;