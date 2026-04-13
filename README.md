# Eco Waste Management Platform

A full-stack web application designed to help households and businesses efficiently manage their waste, schedule pickups, and track their recycling impact.

## Features

- **User Authentication:** Secure signup and login with JWT and role-based access control (Customer vs. Admin).
- **Service Scheduling:** Book waste pickup requests for either *Residential* or *Business/Enterprise* needs.
- **Dashboard & Analytics:** 
  - Track total amount of waste recycled.
  - View potential earnings / completed requests.
  - Monitor upcoming schedules and history of orders.
- **Responsive UI:** Modern, accessible, and fast interface with smooth animations and dynamic routing.

## Tech Stack

### Frontend (User Interface)
- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing:** React Router v7
- **Styling:** TailwindCSS v4
- **Components:** [Radix UI](https://www.radix-ui.com/) (Headless UI for custom components)
- **Icons:** [Lucide React](https://lucide.dev/) & Heroicons
- **Animations:** Framer Motion

### Backend (API & Database)
- **Runtime & Framework:** Node.js + Express.js
- **Database:** PostgreSQL
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt for password hashing
- **Environment:** dotenv configuration

## Project Structure

```
eco-waste-management/
├── frontend/               # React (Vite) Application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Dashboard, etc.)
│   │   ├── contexts/       # React Context providers (e.g., AuthContext)
│   │   ├── lib/            # Utilities and API service wrappers
│   │   └── pages/          # Full page views
│   └── package.json
│
├── backend/                # Node/Express API
│   ├── src/
│   │   └── db/             # Drizzle schemas and DB connection
│   │       ├── schema.js   # Main database tables (users, orders, etc.)
│   │       └── index.js
│   ├── server.js           # Express App entry point
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running locally (or a cloud URL like Supabase/Neon).

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the `/backend` folder and add:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/ecowaste
   JWT_SECRET=your_super_secret_key
   PORT=5000
   ```
4. Run Database Migrations:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
   *(Server runs on `http://localhost:5000`)*

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *(App runs on `http://localhost:5173`)*

## Planned Enhancements
- Integration with Razorpay/Stripe for online payments and checkout.
- Eco-Coins Wallet to reward users for recycling.
- Expanded Environmental Impact charts (CO₂ saved).
- Live Driver tracking when an order is in progress.
