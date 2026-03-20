# Productivity Dashboard

A full-stack MERN application to manage tasks, notes, and goals.

## Tech Stack
- React (Vite)
- Node.js + Express
- MongoDB Atlas
- Tailwind CSS

## Features
- User Authentication (JWT)
- Task Management
- Notes System
- Goal Tracking

## Setup

### Backend
cd server
npm install
npm start

### Frontend
cd client
npm install
npm run dev

## Vercel deployment notes
1. Deploy from the `client` directory (or set Vercel project root to `client`).
2. Add environment variable `VITE_API_URL` set to your deployed backend URL (for example `https://productivity-dashboard-axx1.onrender.com/api`).
3. Do not hardcode port 5000 in production; Vercel uses your env var.
4. If you use React Router (BrowserRouter), Vercel should route correctly with `client/vercel.json` or root `vercel.json`.
5. Run `npm run build` in `client` for a local production test.

   