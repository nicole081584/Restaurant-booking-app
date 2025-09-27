// components/BookingForm.tsx
import React from 'react';
import { TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import BookingCalendar from '@/components/bookingCalender';
import ButtonAndInputStyles from '@/components/ButtonAndInputStyles';
import ContainerStyles from '@/components/ContainerStyles';

interface BookingFormProps {
  title: string;
  setTitle: (val: string) => void;
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  numberOfGuests: number;
  setNumberOfGuests: (val: number) => void;
  date: string;
  handleDateSelected: (date: string) => void;
  time: string;
  setTime: (val: string) => void;
  bookingSlots: string[];
  comment: string;
  setComment: (val: string) => void;
  bookingButtonInUse: boolean;
  handleSubmit: () => void;
}

export default function BookingForm({
  title, setTitle,
  firstName, setFirstName,
  lastName, setLastName,
  phoneNumber, setPhoneNumber,
  email, setEmail,
  numberOfGuests, setNumberOfGuests,
  date, handleDateSelected,
  time, setTime,
  bookingSlots,
  comment, setComment,
  bookingButtonInUse, handleSubmit
}: BookingFormProps) {
  return (
    <ThemedView>

      <ThemedView style={ContainerStyles.titleContainer}>
        <ThemedText type="title">Make a Booking</ThemedText>
      </ThemedView>

      <ThemedText type="subtitle">Title:</ThemedText>
      <ThemedView style={ButtonAndInputStyles.pickerWrapper}>
        <Picker
          selectedValue={title}
          onValueChange={(itemValue) => setTitle(itemValue)}
          style={ButtonAndInputStyles.picker}
          >
          <Picker.Item label="Choose title" value="" />
          <Picker.Item label="Mr." value="Mr." />
          <Picker.Item label="Mrs." value="Mrs." />
          <Picker.Item label="Miss" value="Miss" />
          <Picker.Item label="Ms." value="Ms." />
          <Picker.Item label="Mx." value="Mx." />
        </Picker>
      </ThemedView>
      
      <ThemedText type = "subtitle">Name:</ThemedText>
      <TextInput
        style={ButtonAndInputStyles.input}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
        autoComplete="given-name"   // Autofill first name
      />

      <TextInput
        style={ButtonAndInputStyles.input}
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
        autoComplete="family-name"  // Autofill last name
      />

      <ThemedText type = "subtitle">Phone Number: </ThemedText>
      <TextInput
        style={ButtonAndInputStyles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoComplete="tel"  // Autofill telephone number 
      />

     <ThemedText type = "subtitle">Email:</ThemedText>
      <TextInput
        style={ButtonAndInputStyles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"  // Autofill email
      />

       <ThemedText type = "subtitle">Select the number of Guests:</ThemedText>
       <ThemedView style={ButtonAndInputStyles.pickerWrapper}>
        <Picker
          selectedValue={numberOfGuests}
          onValueChange={(itemValue) => setNumberOfGuests(itemValue)}
          style={ButtonAndInputStyles.picker}
          >
            <Picker.Item label="Select number of guests" value="" />
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
            <Picker.Item label="7" value={7} />
            <Picker.Item label="8" value={8} />
            <Picker.Item label="9" value={9} />
            <Picker.Item label="10" value={10} />
        </Picker>
        </ThemedView>
        <ThemedText type = 'small'>Please count Children and Highchairs into your final number.</ThemedText>
        <ThemedText type = 'small'>For bookings of 11 Guests and above please phone the Restuarant directly on: 022 222 22222</ThemedText>

        <ThemedText type = "subtitle">Date:</ThemedText>
        <BookingCalendar onDateSelected={handleDateSelected} />
        <ThemedText type = 'small'>🔴 Closed </ThemedText>
        <ThemedText type = 'small'>🟢 Online booking unavailable, please phone 022 222 22222 to book a table </ThemedText>
        

        <ThemedText type = "subtitle">Time:</ThemedText>
        <ThemedView style={ButtonAndInputStyles.pickerWrapper}>
        <Picker
          selectedValue={time}
          onValueChange={(itemValue) => setTime(itemValue)}
          style={ButtonAndInputStyles.picker}
        >
          { bookingSlots.map((val) => (
            <Picker.Item key={val} label={val.toString()} value={val} />
          ))}
        </Picker>
        </ThemedView>

        <ThemedText type="subtitle">Additional Comments (Optional):</ThemedText>
          <TextInput
            style={[ButtonAndInputStyles.input, { height: 100, textAlignVertical: 'top' }]} // Adjust height for multiline input
            placeholder="Let us know anything else we should be aware of..."
            value={comment}
            onChangeText={setComment}
            multiline={true}
            numberOfLines={4}
          />

        <ThemedView>
          <Pressable  style={[!bookingButtonInUse && ButtonAndInputStyles.button, bookingButtonInUse && ButtonAndInputStyles.buttonInUse]}  
            onPress={handleSubmit}>
              <ThemedText type= 'subtitle'>Make Booking</ThemedText>
          </Pressable>
        </ThemedView>

        </ThemedView>

  );
}
