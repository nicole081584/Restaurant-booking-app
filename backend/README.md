
---
# Booking App Backend

This is the backend of the Booking App, built with Node.js and Express.js.
It provides the REST API for handling bookings, storing data, and serving the frontend.
---
## 🚀 Features

REST API for booking slot retrival, booking creation and retrieval

Modular structure (routes/, db/, libraries/)

Environment-based configuration with .env

Jest unit tests

---
## 📂 Project Structure

```bash
backend/
├── __test__/         # Jest tests
├── db/               # Database logic (e.g., JSON/SQLite/other storage)
├── libraries/        # Helper libraries
├── routes/           # Express route handlers
├── .env              # Environment variables
├── server.js         # Express server entry point
├── jest.config.js    # Jest config
├── package.json      # Dependencies
└── .gitignore
```

---
## ⚙️ Setup & Installation
1. Prerequisites

Node.js
 (LTS recommended)

npm

2. Install dependencies

```bash
cd backend
npm install
```

3. Configure environment

Create a .env file in the backend root:

SERVER_URL= http://localhost:3001
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password-or-app-password

4. Run the backend server

```bash
npm run dev
```


The server will start on http://localhost:3001 (or the port set in .env).

5. Run tests

```bash
npm test
```

---
## 🔗 Frontend Integration

The frontend communicates with the backend through backendService.ts.
Ensure the backend is running before starting the frontend.

---
## 📌 Notes

Keep your .env file private (already ignored in .gitignore).

Backend is lightweight and can be extended with more routes/services if needed.

---
## 👩‍🔧 Author

Built by Nicole Niebel — independent developer passionate about robust, testable mobile apps and resilient backend APIs.