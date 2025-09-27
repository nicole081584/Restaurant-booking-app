import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BookingForm from '@/components/BookingForm';

describe('BookingForm', () => {
  const defaultProps = {
    title: '',
    setTitle: jest.fn(),
    firstName: '',
    setFirstName: jest.fn(),
    lastName: '',
    setLastName: jest.fn(),
    phoneNumber: '',
    setPhoneNumber: jest.fn(),
    email: '',
    setEmail: jest.fn(),
    numberOfGuests: 0,
    setNumberOfGuests: jest.fn(),
    date: '',
    handleDateSelected: jest.fn(),
    time: '',
    setTime: jest.fn(),
    bookingSlots: ['18:00', '18:30'],
    comment: '',
    setComment: jest.fn(),
    bookingButtonInUse: false,
    handleSubmit: jest.fn(),
  };

  it('renders the form fields', () => {
    const { getByPlaceholderText, getByText } = render(<BookingForm {...defaultProps} />);

    expect(getByText('Make a Booking')).toBeTruthy();
    expect(getByPlaceholderText('Enter your first name')).toBeTruthy();
    expect(getByPlaceholderText('Enter your last name')).toBeTruthy();
    expect(getByPlaceholderText('Enter your phone number')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
  });

  it('triggers setFirstName when typing', () => {
    const setFirstName = jest.fn();
    const { getByPlaceholderText } = render(
      <BookingForm {...defaultProps} setFirstName={setFirstName} />
    );

    fireEvent.changeText(getByPlaceholderText('Enter your first name'), 'Alice');
    expect(setFirstName).toHaveBeenCalledWith('Alice');
  });

  it('calls handleSubmit when pressing Make Booking', () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(
      <BookingForm {...defaultProps} handleSubmit={handleSubmit} />
    );

    fireEvent.press(getByText('Make Booking'));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
