<div align="center">
  <img src="public/favicon.ico" alt="Momentum Logo" width="100"/>
  <h1>Master Your Monkey Brain.</h1>
  <p>A productivity system built on psychology, streak power, and gamification. No noise, just execution.</p>
</div>

---

## What is Momentum?

Momentum is not another typical to-do list. It isn't here to motivate you with inspirational quotes or abstract "productivity frameworks". 

It is designed to outsmart your procrastination. If your brain loves streaks, levels, and "not losing progress"—Momentum uses that against you (nicely). We eliminate the noise so you only focus on execution. 

<br />

## Why Momentum Actually Works

1. **Behavior Hacking**
   Momentum uses gamified psychology. Your brain gets tricked into wanting to stay consistent because breaking a streak hurts more than doing the work.
   
2. **Leagues & Levels System**
   Rank up from *Gold-fish* to *OUTLIER*. You level up daily based on your consistency, penalizing you when you disappear but rewarding you for showing up.

3. **Study Space**
   A dedicated focus zone equipped with a timer session and immersive backgrounds, allowing you to lock in without distractions.

4. **Todos & "Don'ts"**
   Track tasks based on their importance, while also tracking "Don'ts" (anti-habits that you must avoid to keep your streak intact).
   
5. **Clean AF UI**
   A dark-mode, glassmorphic design built with Framer Motion and Tailwind CSS. No clutter, zero noise. Just you and an interface that keeps you completely honest.

<br />

## Tech Stack

Momentum is built as a fast, robust full-stack application relying on the modern React ecosystem. 

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Database**: [MongoDB](https://www.mongodb.com/) via Mongoose
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Full Multi-User Auth)
- **Styling**: Tailwind CSS V4, Framer Motion, Vanilla CSS
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Visuals**: React Three Fiber, Vanta, OGL

<br />

## Project Structure

- `app/` – Core Next.js App Router application
  - `page.tsx` - Sleek Landing Page with Framer Motion animations
  - `dashboard/` - Main gamified application view
    - `study-space/` - Immersive Pomodoro / Timer Area
    - `todos/` - Task management 
    - `progress/` - Charts and league standings
  - `api/` – Mongoose-backed API routes for handling `Todos`, `Donts`, `Habits`, `Users`, and NextAuth
  - `lib/models/` – Database Schemas
- `components/` – Reusable UI pieces, Navigation
- `public/` – Icons, backgrounds, gamification badges (League tiers)

<br />

## Setup & Local Development

1. **Clone the repo**
   ```bash
   git clone https://github.com/ritik-2407/momentum.git
   cd momentum
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env.local` file in the root. Example needed variables:
   ```env
   MONGODB_URI=your_mongo_url
   NEXTAUTH_SECRET=your_nextauth_string
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

<br />

## The Philosophy

Momentum acts as a **discipline engine**. 
It doesn't ask "How do you feel today?"
It asks **"Did you show up?"**
And then it remembers the answer.


