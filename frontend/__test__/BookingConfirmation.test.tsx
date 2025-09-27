import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BookingConfirmation from '@/components/BookingConfirmation';
import type { booking } from '@/components/booking';

const mockBooking = {
  bookingNumber: '12345',
  title: 'Mr.',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '123456789',
  email: 'john@example.com',
  numberOfGuests: 2,
  dateOfBooking: '01/10/2025',
  time: '18:30',
  comment: '',
  dateBookingWasMade: '26/09/2025',
} as unknown as booking;

describe('BookingConfirmation', () => {
  it('renders booking details correctly', () => {
    const { getByText } = render(
      <BookingConfirmation booking={mockBooking} handleReset={jest.fn()} />
    );

    expect(getByText('Booking made')).toBeTruthy();
    expect(getByText(/Date: 01\/10\/2025/)).toBeTruthy();
    expect(getByText(/Time: 18:30/)).toBeTruthy();
    expect(getByText(/Number of Guests: 2/)).toBeTruthy();
    expect(getByText(/Booking Number: 12345/)).toBeTruthy();
  });

  it('calls handleReset when Return is pressed', () => {
    const mockReset = jest.fn();
    const { getByText } = render(
      <BookingConfirmation booking={mockBooking} handleReset={mockReset} />
    );

    fireEvent.press(getByText('Return'));
    expect(mockReset).toHaveBeenCalled();
  });
});
