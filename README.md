
--- 
# 🍽️ Booking App (Android)

A full-stack Android restaurant booking application where users can make reservations, receive confirmation emails and view booking confirmation.
---

## 🚨 Note: This app is written for Android only. It is not optimized for iOS.

---

## ✨ Features

📅 Booking Form – Collects user details and reservation preferences

✅ Validation – Ensures booking requests are valid before submission

📩 Email Confirmation – Sends users a confirmation email with a PDF voucher

🖼️ Booking Screen – Displays booking confirmation with details and booking number

🔄 Reset Flow – Users can return and make another booking

🧪 Full Test Coverage – Jest tests for backend logic and frontend components


---

## 🏗️ Tech Stack

### Frontend

Expo (React Native)
 – Android-only

React Navigation

Jest + @testing-library/react-native

### Backend

Express.js

Nodemailer (for sending booking confirmation emails)

PDFKit / ReportLab (for voucher PDF generation)

Jest + Supertest for testing

---

## 📂 Project Structure

```bash
booking-app/
├── backend/          # Express.js server
│   ├── routs/        # Routes, controllers, utils
|   ├── libraries/    # Components and service manager
│   ├── __tests__/    # Backend tests (Jest + Supertest)
│   └── package.json
│
├── frontend/         # Expo React Native app (Android only)
│   ├── components/   # Components and services
│   ├── app/          # Booking form & confirmation screens
│   ├── __tests__/    # Frontend tests (Jest + RTL)
│   └── package.json
│
└── README.md         # (this file)
```

---

## 🚀 Getting Started
### Prerequisites

Node.js (LTS recommended)

npm or yarn

Expo CLI (npm install -g expo-cli)

Android device with Expo Go or Android emulator

 ---
 
## 🔧 Backend Setup (Express.js)

### Go to the backend folder:

```bash
cd backend
```


### Install dependencies:

```bash
npm install
```


### Set up environment variables:
Create a .env file in /backend with at least:

- SERVER_URL= http://localhost:3001
- EMAIL_USER=your-email@example.com
- EMAIL_PASS=your-email-password-or-app-password


### Run the backend:

```bash
npm run dev
```

The API will be available at: http://localhost:3001


## 📱 Frontend Setup (Expo Android App)

### Go to the frontend folder:

```bash
cd frontend
```


### Install dependencies:

```bash
npm install
```


### Start Expo:

```bash
npx expo start
```


### Run the app:

On Android device: Open the Expo Go app, scan the QR code, and launch the app.

On Android emulator: Press a in the terminal to start in the emulator.

 ---
 
## 🧪 Running Tests
### Backend tests:

```bash
cd backend
npm test
```

### Frontend tests:

```bash
cd frontend
npm test
```

---

## 📌 Roadmap

 Add user accounts & login system

 Admin dashboard for managing reservations

 Push notifications for booking reminders

 Multi-language support

 (Future) iOS compatibility

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to change.

---

## 👩‍🔧 Author

Built by Nicole Niebel — independent developer passionate about robust, testable mobile apps and resilient backend APIs.

---

## 📜 License

MIT License © 2025 Nicole Niebel

