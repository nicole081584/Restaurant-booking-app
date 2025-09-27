"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

var base = "/"; //api in production

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const {
  initializeDatabases,
} = require('./libraries/initializeDatabases');

// Initialize the databases
initializeDatabases();

const path = require('path');

const bookingSlotsRoutes = require('./routes/bookingSlots.js')
const makeBookingRoutes = require('./routes/makeBooking.js')

app.use(base + 'bookingSlots', bookingSlotsRoutes);
app.use(base + 'makeBooking', makeBookingRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

/**
 * Handler that makes the background image html accessible.
 * Unnecessary in production as background will be hosted online
 */

app.use('/assets', express.static(path.join(__dirname, 'assets')));

