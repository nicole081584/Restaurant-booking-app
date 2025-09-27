const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt'); 

const bookingSlotsdb = new sqlite3.Database('./db/bookingSlots.db');
const bookingsdb = new sqlite3.Database('./db/bookings.db');

function initializeDatabases() {
  
  // Create BookingSlots table
  bookingSlotsdb.run(`
    CREATE TABLE IF NOT EXISTS bookingSlots (
      date TEXT PRIMARY KEY,
      "12:00" INTEGER,
      "12:30" INTEGER,
      "13:00" INTEGER,
      "13:30" INTEGER,
      "14:00" INTEGER,
      "14:30" INTEGER,
      "15:00" INTEGER,
      "15:30" INTEGER,
      "17:00" INTEGER,
      "17:30" INTEGER,
      "18:00" INTEGER,
      "18:30" INTEGER,
      "19:00" INTEGER,
      "19:30" INTEGER,
      "20:00" INTEGER,
      "20:30" INTEGER,
      "21:00" INTEGER
    )
  `);

  // Create Bookings table
  bookingsdb.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      title TEXT,
      firstName TEXT,
      lastName TEXT,
      phoneNumber TEXT,
      email TEXT,
      numberOfGuests REAL,
      date TEXT,
      time TEXT,
      comment TEXT,
      dateBookingWasMade TEXT
    )
  `);

}


// Export the database connections and the initializer
module.exports = {
  initializeDatabases,
  bookingSlotsdb,
  bookingsdb
};