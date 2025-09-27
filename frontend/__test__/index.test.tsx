import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import BookingsScreen from '../app/index';
import * as backendService from '@/components/backendService';

// Mock the backend service
jest.mock('@/components/backendService', () => ({
  makeBooking: jest.fn(),
  getBookingSlots: jest.fn(() => Promise.resolve([])),
}));

// Mock validation to always pass (no error)
jest.mock('@/components/validateBookingForm', () => ({
  validateBookingForm: jest.fn(() => null),
}));

// Mock the booking type and emptyBooking
jest.mock('@/constants/emptyBooking', () => ({
  emptyBooking: {
    bookingNumber: '',
    title: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    numberOfGuests: 0,
    dateOfBooking: '',
    time: '',
    comment: '',
    dateBookingWasMade: '',
  },
}));

// Mock child components to avoid rendering issues
jest.mock('@/components/BookingForm', () => {
  const { Text, TouchableOpacity } = require('react-native');
  return ({ handleSubmit, bookingButtonInUse }: any) => (
    <>
      <Text>Make a Booking</Text>
      <TouchableOpacity 
        onPress={handleSubmit} 
        disabled={bookingButtonInUse}
        testID="make-booking-button"
      >
        <Text>Make Booking</Text>
      </TouchableOpacity>
    </>
  );
});

jest.mock('@/components/BookingConfirmation', () => {
  const { Text, TouchableOpacity, View } = require('react-native');
  return ({ booking, handleReset }: any) => (
    <View testID="booking-confirmation">
      <Text>Booking made</Text>
      <Text>Booking Number: {booking.bookingNumber}</Text>
      <TouchableOpacity onPress={handleReset} testID="return-button">
        <Text>Return</Text>
      </TouchableOpacity>
    </View>
  );
});

jest.mock('@/components/ParallaxScrollView', () => {
  const { View } = require('react-native');
  return ({ children }: { children: React.ReactNode }) => <View>{children}</View>;
});

jest.mock('@/components/Footer', () => {
  return () => null;
});

jest.mock('@/components/LoadingOverlay', () => {
  const { Text } = require('react-native');
  return ({ visible }: { visible: boolean }) => 
    visible ? <Text testID="loading">Loading...</Text> : null;
});

jest.mock('@/components/ContainerStyles', () => ({
  titleImage: {},
}));

// Mock expo-image
jest.mock('expo-image', () => ({
  Image: () => null,
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, style }: { children: React.ReactNode, style: any }) => (
    <>{children}</>
  ),
}));

// Mock alert
global.alert = jest.fn();

describe('BookingsScreen stage logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.alert as jest.Mock).mockClear();
  });

  it('renders booking form initially', () => {
    const { getByText, queryByTestId } = render(<BookingsScreen />);
    
    expect(getByText('Make a Booking')).toBeTruthy();
    expect(getByText('Make Booking')).toBeTruthy();
    expect(queryByTestId('booking-confirmation')).toBeNull();
  });

  it('switches to booking confirmation after successful booking', async () => {
    // Mock successful booking response
    const mockBooking = {
      bookingNumber: '123',
      title: 'Mr.',
      firstName: 'Test',
      lastName: 'User',
      phoneNumber: '123456',
      email: 'test@example.com',
      numberOfGuests: 2,
      dateOfBooking: '01/10/2025',
      time: '19:00',
      comment: '',
      dateBookingWasMade: '26/09/2025',
    };

    (backendService.makeBooking as jest.Mock).mockResolvedValue(mockBooking);

    const { getByText, getByTestId, queryByText } = render(<BookingsScreen />);

    // Initially should show booking form
    expect(getByText('Make a Booking')).toBeTruthy();

    // Submit the booking
    await act(async () => {
      fireEvent.press(getByTestId('make-booking-button'));
    });

    // Wait for the booking confirmation to appear
    await waitFor(() => {
      expect(getByTestId('booking-confirmation')).toBeTruthy();
    }, { timeout: 3000 });

    // Check that confirmation content is displayed
    expect(getByText('Booking made')).toBeTruthy();
    expect(getByText('Booking Number: 123')).toBeTruthy();
    
    // Booking form should no longer be visible
    expect(queryByText('Make a Booking')).toBeNull();
  });

  it('goes back to booking form when Return is pressed', async () => {
    // Mock successful booking response
    const mockBooking = {
      bookingNumber: '123',
      title: 'Mr.',
      firstName: 'Test',
      lastName: 'User',
      phoneNumber: '123456',
      email: 'test@example.com',
      numberOfGuests: 2,
      dateOfBooking: '01/10/2025',
      time: '19:00',
      comment: '',
      dateBookingWasMade: '26/09/2025',
    };

    (backendService.makeBooking as jest.Mock).mockResolvedValue(mockBooking);

    const { getByText, getByTestId } = render(<BookingsScreen />);

    // Make a booking first
    await act(async () => {
      fireEvent.press(getByTestId('make-booking-button'));
    });

    // Wait for booking confirmation
    await waitFor(() => {
      expect(getByTestId('booking-confirmation')).toBeTruthy();
    });

    // Press Return button
    await act(async () => {
      fireEvent.press(getByTestId('return-button'));
    });

    // Should be back to booking form
    await waitFor(() => {
      expect(getByText('Make a Booking')).toBeTruthy();
    });

    expect(getByText('Make Booking')).toBeTruthy();
  });

  it('handles booking error correctly', async () => {
    // Mock booking failure
    (backendService.makeBooking as jest.Mock).mockRejectedValue(
      new Error('Booking failed')
    );

    const { getByText, getByTestId } = render(<BookingsScreen />);

    // Submit the booking
    await act(async () => {
      fireEvent.press(getByTestId('make-booking-button'));
    });

    // Wait for error handling
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('An error occured, please try again!');
    });

    // Should stay on booking form
    expect(getByText('Make a Booking')).toBeTruthy();
  });

  it('shows loading overlay during booking submission', async () => {
    // Create a promise we can control
    let resolveBooking: (value: any) => void;
    const bookingPromise = new Promise((resolve) => {
      resolveBooking = resolve;
    });

    (backendService.makeBooking as jest.Mock).mockReturnValue(bookingPromise);

    const { getByTestId } = render(<BookingsScreen />);

    // Submit the booking
    await act(async () => {
      fireEvent.press(getByTestId('make-booking-button'));
    });

    // Should show loading
    expect(getByTestId('loading')).toBeTruthy();

    // Resolve the booking
    await act(async () => {
      resolveBooking!({
        bookingNumber: '123',
        title: 'Mr.',
        firstName: 'Test',
        lastName: 'User',
        phoneNumber: '123456',
        email: 'test@example.com',
        numberOfGuests: 2,
        dateOfBooking: '01/10/2025',
        time: '19:00',
        comment: '',
        dateBookingWasMade: '26/09/2025',
      });
    });

    // Loading should be gone, confirmation should show
    await waitFor(() => {
      expect(getByTestId('booking-confirmation')).toBeTruthy();
    });
  });
});