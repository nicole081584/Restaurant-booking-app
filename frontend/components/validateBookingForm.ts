import { isValidEmail, isValidPhoneNumber } from './validationServices';

export type BookingFormData = {
  title: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  numberOfGuests: number ;
  date: string;
  time: string;
};

export function validateBookingForm(data: BookingFormData): string | null {
  //check and verify all fields are filled in correctly
        if (data.title ===''){
          return "Please select your title";
        }
        else if (data.firstName === ''){
          return "Please enter your first name.";
        }
        else if (data.lastName === ''){
          return "Please enter your last name.";
        }
        else if (data.phoneNumber==='' || !isValidPhoneNumber(data.phoneNumber)){
          return "Please enter a valid UK mobile or landline number (e.g. 07700 900123 or 020 7946 0958).";
        }
        else if (data.email ==='' || !isValidEmail(data.email)){
          return "Please provide a valid email address";
        }
        else if (data.numberOfGuests === 0) {
          return "Please select number of Guests";
          }
         else if (data.date === '') {
          return "Please select a date";
          }
          else if (data.time === '') {
          return "Please select a time for your booking";
          }
  return null;
}
