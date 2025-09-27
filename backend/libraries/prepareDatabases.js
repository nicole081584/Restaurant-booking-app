
//Prepare bookingSlots Data base
const sqlite3 = require('sqlite3').verbose();
//Connect to database
const bookingSlotsdb = new sqlite3.Database('./db/bookingSlots.db', (err) => {
  if (err) {
    console.error('Could not connect to bookingSlots.db:', err);
  } else {
    console.log('Connected to bookingSlots.db');
  }
});

//Prepare bookings Data base
const sqlite3_1 = require('sqlite3').verbose();
//Connect to database
const bookingsdb = new sqlite3_1.Database('./db/bookings.db', (err) => {
  if (err) {
    console.error('Could not connect to bookings.db:', err);
  } else {
    console.log('Connected to bookings.db');
  }
});

module.exports = {
  bookingSlotsdb,
  bookingsdb
};

