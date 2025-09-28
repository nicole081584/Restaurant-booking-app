 /** 
 * This is the code to connect to the taxi service API provided seprately.
 * 
 * The following routes are supported:
 * 
 *  getBookingSlots - GET /bookingSlots
 *  makeBooking - POST /makeBooking
 * 
 **/

import Constants from 'expo-constants';
import { booking } from "./booking";


const apibase =Constants.expoConfig?.extra?.apiBaseUrl || "http://localhost:3001/";





/**
 * Checks the JSON response for errors and handles them
 *
 * @param  response  the JSON object recived from the service
 * @return processes response
 */
function checkResponse(response:any):any {
  if (response.status!="success") {
    throw(response.message);
  }
  else if (response.data) {
    return response.data;
  }
  else {
    return response;
  }
}

/**
 * Retrieves available Booking slots for a given date
 * 
 * error handling: throws an error if the service returns an error
 * 
 * @param   date            the date the user wants to book a table 
 * @param numberOfGuests    number of Guests in teh party to be booked
 * @returns bookingslots    all available time slots or that day
 */
export async function getBookingSlots(date:string, numberOfGuests: number)
            :Promise<string[]> {

    if (numberOfGuests == 0){
      console.log("Number of guests is 0.");
      alert ("Please select the number of Guests.");
      return [];
    }

    else {
  
   console.log("Requesting booking slots for: ", {date}, " and ",{numberOfGuests}, " Guests");

   const url = `${apibase}bookingSlots?date=${encodeURIComponent(date)}&numberOfGuests=${numberOfGuests}`;


  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

     // Check for success based on the actual API response, not HTTP status
    if (json.status !== "success") {
        console.log("Slots: " + json.message);
        return [json.message]; // Return the error message in an array
      }
    else {
      console.log("Slots: " + json.data.join(", "));
      return json.data;
    } 

  } 
  catch (error: any) {
    console.error("Fetch failed:", error);
    alert("Error sending retrieving booking slots: " + (error.message || String(error)));
    return []; // return an empty array so the app doesn't crash
  }
}

            }

/**
 * Makes a booking for a given date and time and obtain a booking number 
 * 
 * error handling: throws an error if the service returns an error
 * 
 * @param title           customers title
 * @param lastName        customers last name
 * @param firstName       customers first Name
 * @param phoneNumber     the contact phone number for the customer
 * @param email           the email address of the customer
 * @param numberOfGuests  number of guests in the party
 * @param date            Date of the booking
 * @param time            time of the booking
 * @param comment         any comment the guest would like to leave
 * @returns               the booking fully filled in, including number
 */
export async function makeBooking(
    title: string,
    firstName: string,
    lastName:string, 
    phoneNumber: string, 
    email: string, 
    numberOfGuests:number,
    date : string,
    time: string,
    comment: string)
            :Promise<booking> {
  
   console.log("Sending request body:", {
    title,
    firstName,
    lastName,
    phoneNumber,
    email,
    numberOfGuests,
    date,
    time,
    comment
  });

  try {
    const response = await fetch(apibase + "makeBooking", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        firstName,
        lastName,
        phoneNumber,
        email,
        numberOfGuests,
        date,
        time,
        comment
      }),
      
    });
    const json = await response.json();
    const data = checkResponse(json);
    console.log ("Booking made: " +JSON.stringify(data))
    return data;
    

  } 
  catch (error: any) {
    console.error("Fetch failed:", error);
    //alert("Error making booking: " + (error.message || String(error)));
    throw error;; // return an empty array so the app doesn't crash
  }
}

