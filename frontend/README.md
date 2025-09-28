
---

# Booking App Frontend

This is the frontend of the Booking App, built with React Native (Expo) for Android only.
It provides a booking form, booking confirmation screen, and integration with a backend API to save bookings.

---

## 🚀 Features

Booking form with validation

Booking confirmation screen with details

Custom UI components (ThemedText, ThemedView, ButtonAndInputStyles, etc.)

API integration via backendService.ts

Jest tests with @testing-library/react-native

Written entirely in TypeScript

---

## 📂 Project Structure

```bash
frontend/
├── __mocks__/               # Jest mocks
├── __test__/                # Unit tests
├── app/                     # App entry points
│   ├── _layout.tsx
│   └── index.tsx
├── assets/                  # Images & static assets
├── components/              # Reusable UI & booking components
│   ├── BookingForm.tsx
│   ├── BookingConfirmation.tsx
│   ├── bookingCalender.tsx
│   ├── backendService.ts    # API calls to backend
│   ├── validateBookingForm.ts
│   └── ...
├── constants/               # Shared constants
├── hooks/                   # React hooks
├── scripts/                 # Utility scripts
├── jest.config.js           # Jest configuration
├── jest.setup.js            # Jest setup for React Native
├── app.json                 # Expo configuration
├── tsconfig.json            # TypeScript config
└── package.json             # Project dependencies

```
Some folders like .expo/ and node_modules/ are omitted from this overview for clarity.

---

## ⚙️ Setup & Installation
1. Prerequisites

Node.js
 (LTS recommended)

Expo CLI

Android Emulator or a physical Android device

2. Install dependencies

```bash
cd frontend
npm install
```

3. Run the app (Android only)

```bash
npx expo start
```


This will start the Expo development server.

Press a to open in Android emulator

Or scan the QR code in the Expo Go app (on Android device)

4. 🧪 Testing
We use Jest with @testing-library/react-native.

Run all tests:

```bash
npm test
```

Run specific test:
Tests are located in the __test__/ folder.

Example:

```bash
npm test __test__/index.test.tsx
```

---

## 🔗 Backend Integration

The frontend communicates with the backend via the API methods in components/backendService.ts.
Make sure the backend server is running before testing booking submission.

By default, the backend URL can be configured in .env Under APIBASE

---

## 📌 Notes

This app is only designed for Android.

iOS is not supported.

To run the entire project (frontend + backend), see the main Booking App README

---

## 👩‍🔧 Author

Built by Nicole Niebel — independent developer passionate about robust, testable mobile apps and resilient backend APIs.
