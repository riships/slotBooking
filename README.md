# Slot Booking Application

This is a full-stack slot booking application built with React, Node.js, Express, and Firestore (Firebase) as the database.

## Features

- Slot booking by users
- Responsive UI

## Technologies Used

**Frontend:**
- React
- Vite
- Bootstrap CSS

**Backend:**
- Node.js
- Express.js
- FireStore

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add the following environment variables:
   ```
   APIKEY="firestore-api-key"
   AUTHDOMAIN="your-auth-domain.firebaseapp.com"
   PROJECTID="your-project-id"
   STORAGEBUCKET="your-storage-bucket.appspot.com"
   MESSAGINGSENDERID="your-messaging-sender-id"
   APPID="your-app-id"
   ```
   Replace `api-key`, `your-auth-domain`, `your-project-id`, `your-storage-bucket`, `your-messaging-sender-id`, and `your-app-id` with your"

4. Start the backend server:
   ```bash
   npm start
   ```
   The backend server will run on `http://localhost:3000` (or the port you specified).

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` directory and add the following environment variable:
   ```
   VITE_API_URL=http://localhost:3000/api/v1
   ```
   Ensure this matches your backend server's URL.

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend application will open in your browser, usually at `http://localhost:5173`.

## Project Structure
