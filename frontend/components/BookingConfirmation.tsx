// components/BookingConfirmation.tsx
import React from 'react';
import { ImageBackground, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ButtonAndInputStyles from '@/components/ButtonAndInputStyles';
import ContainerStyles from '@/components/ContainerStyles';
import { booking } from '@/components/booking';

interface BookingConfirmationProps {
  booking: booking;
  handleReset: () => void;
}

export default function BookingConfirmation({ booking, handleReset }: BookingConfirmationProps) {
  return (
    <ThemedView>
        <ImageBackground
          source={require('@/assets/images/booking_background.png')} 
          style={ContainerStyles.voucherBackground}
          imageStyle={{ borderRadius: 10 }} 
        >
          <ThemedView style={{ marginBottom:40, backgroundColor: 'transparent' }}>
            <ThemedView style={{ backgroundColor: 'transparent' }}>
              <ThemedText type="voucherTitle">Booking made</ThemedText>
              <ThemedText type="voucherValue">Date: {booking.dateOfBooking}</ThemedText>
              <ThemedText type="voucherValue">Time: {booking.time}</ThemedText>
              <ThemedText type="voucher"> Number of Guests: {booking.numberOfGuests}</ThemedText>
              <ThemedText type="voucher">Booking Number: {booking.bookingNumber}</ThemedText>
              <ThemedText type="voucher">A confirmation email has been send, please check your spam folder if you can not see it in your inbox.</ThemedText>
              <ThemedText type="voucher">We are looking forward to welcome you to our award winning restaurant.</ThemedText>
              <ThemedText type="voucherFineprint">Or phone us directly on 022 222 22222 </ThemedText>
            </ThemedView>
          </ThemedView>

        </ImageBackground> 

          <ThemedView >
           <Pressable style={ButtonAndInputStyles.button} onPress={handleReset}>
              <ThemedText type= 'subtitle'>Return</ThemedText>
           </Pressable>
          </ThemedView>

      </ThemedView>
  );
}
