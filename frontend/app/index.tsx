// app/index.tsx

import { Image } from 'expo-image';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getBookingSlots, makeBooking } from '@/components/backendService';
import { booking } from '@/components/booking';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import  Footer  from '@/components/Footer';
import ContainerStyles from '@/components/ContainerStyles';
import { validateBookingForm } from '@/components/validateBookingForm';
import { emptyBooking } from '@/constants/emptyBooking';

import BookingForm from '@/components/BookingForm';
import BookingConfirmation from '@/components/BookingConfirmation';
import LoadingOverlay from '@/components/LoadingOverlay';


export default function BookingsScreen() {

const [title, setTitle] = useState('');
const [firstName, setFirstName] = useState('');  
const [lastName, setLastName] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [email, setEmail] = useState('');
const [numberOfGuests, setNumberOfGuests] = useState(0);
const [date, setDate] = useState('');
const [time, setTime] = useState(''); 
const [bookingSlots, setBookingSlots] = useState<string[]>([]);
const [booking, setBooking] = useState<booking>(emptyBooking);
const [stage, setStage] = React.useState("makeBooking");
const [comment, setComment] = useState('');

const [bookingButtonInUse, setBookingButtonInUse] = useState(false);
const [isLoading, setIsLoading] = useState(false);

// Format date to DD/MM/YYYY
const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
};

// Wrapper function to handle date selection and retrieval of booking slots
const handleDateSelected = async (selectedDate: string) => {
  const formattedDate = formatDate(selectedDate);
  setDate(formattedDate);

  try {
    const slotData = await getBookingSlots(formattedDate, numberOfGuests);
    setBookingSlots(slotData);
  } catch (error) {
    console.error('Failed to load booking slots:', error);
    setBookingSlots([]);
  }
};

 // function that handles the reset when the return Button is pressed 
  const handleReset = async () => {
    setTitle ('');
    setFirstName ('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setDate('');
    setTime('');
    setComment('');
    setNumberOfGuests(0);
    setBooking(emptyBooking);
    setBookingSlots([]);
    setStage("makeBooking");
  }

// function to handle the submit of a booking request
  const handleSubmit = async () => {

      //check and verify all fields are filled in correctly
        const error = validateBookingForm({
          title,
          firstName,
          lastName,
          phoneNumber,
          email,
          numberOfGuests,
          date,
          time
        });

      if (error) {
        alert(error);
        return;
        }
      else {
        setBookingButtonInUse(true);
        // show  loading screen
        setIsLoading(true);
        //submit booking and set the booking constant with returned values and display booking
        try{
        const b = await makeBooking (title, firstName, lastName, phoneNumber, email, numberOfGuests, date, time, comment);
          setBooking(b);
          alert("Booking made successfully!");
          setStage ("displayBooking");
        }
        catch {
          alert("An error occured, please try again!");
          setStage ("makeBooking");
        }
      }

      //stop showing loading screen
      setIsLoading(false);
      setBookingButtonInUse(false);

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#560324'}}>
    <ParallaxScrollView>

      <Image
            source={require('@/assets/images/bookings.png')}
            style={ContainerStyles.titleImage}
            />

      { stage == "makeBooking" && //stage make a booking 
      (
        <BookingForm
          title={title} setTitle={setTitle}
          firstName={firstName} setFirstName={setFirstName}
          lastName={lastName} setLastName={setLastName}
          phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
          email={email} setEmail={setEmail}
          numberOfGuests={numberOfGuests} setNumberOfGuests={setNumberOfGuests}
          date={date} handleDateSelected={handleDateSelected}
          time={time} setTime={setTime}
          bookingSlots={bookingSlots}
          comment={comment} setComment={setComment}
          bookingButtonInUse={bookingButtonInUse}
          handleSubmit={handleSubmit}
        />
      )}

      { stage == "displayBooking" && //stage to display the Booking

       <BookingConfirmation booking={booking} handleReset={handleReset} />
        
      }

      {/* Modal showing the loading screen while voucher is beeing processed*/}
          <LoadingOverlay visible={isLoading} />

      <Footer />
    </ParallaxScrollView>
    </SafeAreaView>
  );
}
