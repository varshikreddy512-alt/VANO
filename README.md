# AI Team Manager

A futuristic, high-quality frontend web application for managing hackathon teams with AI-powered project planning and real-time progress tracking.

## Features

- **Team Creation & Management**: Create teams as a lead or join existing teams as a member
- **AI-Powered Planning**: Generate structured project roadmaps with AI assistance
- **Real-Time Progress Tracking**: Track individual and team progress with live updates
- **Task Management**: Assign and complete tasks with member-wise checklists
- **Event Countdown**: Real-time countdown timer for hackathon deadlines
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS v4** for styling
- **Motion (Framer Motion)** for animations
- **Radix UI** components for accessibility
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Your existing Node.js backend running (optional - can use mock data mode)

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Configure the environment:
   
   **Option A: Using Mock Data (No Backend Required)**
   ```
   VITE_API_BASE_URL=http://localhost:3000
   VITE_USE_MOCK_DATA=true
   ```
   
   **Option B: Connect to Real Backend**
   ```
   VITE_API_BASE_URL=http://localhost:3000
   VITE_USE_MOCK_DATA=false
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Mock Data Mode

The application includes a built-in mock data mode for testing without a backend server:

- **Enable Mock Data**: Set `VITE_USE_MOCK_DATA=true` in your `.env` file
- **Features Available in Mock Mode**:
  - Create and join teams
  - Complete team setup
  - Generate AI project roadmaps
  - View and complete tasks
  - Track progress with simulated data
- **Perfect for**: Frontend development, testing, and demonstrations

To switch to real backend, set `VITE_USE_MOCK_DATA=false` and ensure your backend is running.

## Backend API Integration

This frontend integrates with the following backend endpoints:

### Auth
- `POST /api/auth/create-team` - Create a new team
- `POST /api/auth/join-team` - Join an existing team

### Team
- `POST /api/team/setup` - Submit project details and members
- `GET /api/team/:teamId` - Fetch team data

### AI
- `POST /api/ai/generate-project` - Generate AI roadmap and tasks

### Tasks
- `GET /api/task/:teamId` - Fetch member tasks
- `POST /api/task/complete` - Mark task as complete

## Application Flow

1. **Landing Page**: Choose to create or join a team
2. **Create Team** (Lead): Enter team details and credentials
3. **Join Team** (Member): Enter team name, password, and your name
4. **Team Setup** (Lead Only): Define problem statement and team member roles
5. **Dashboard**: View AI-generated project plan, manage tasks, and track progress

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── CountdownTimer.tsx
│   │   └── ui/              # Reusable UI components
│   ├── context/
│   │   └── TeamContext.tsx  # Global state management
│   ├── screens/
│   │   ├── Landing.tsx
│   │   ├── CreateTeam.tsx
│   │   ├── JoinTeam.tsx
│   │   ├── TeamSetup.tsx
│   │   └── Dashboard.tsx
│   ├── services/
│   │   └── api.ts           # API service layer
│   └── App.tsx              # Main app component
└── styles/
    ├── theme.css            # Theme variables
    └── tailwind.css         # Tailwind imports
```

## Key Features

### Dark Futuristic Theme
- Gradient backgrounds with cyan and blue accents
- Smooth animations and transitions
- Glass morphism effects on cards

### Progress Tracking
- Individual member progress calculation
- Overall team progress aggregation
- Visual progress bars and percentages

### Real-Time Updates
- Auto-refresh team data every 30 seconds
- Instant UI updates on task completion
- Live countdown timer

### State Persistence
- Team data stored in localStorage
- Maintains session across page refreshes
- Clean logout functionality

## Development

The application is built with modern React patterns:
- Functional components with hooks
- Context API for global state
- Type-safe API integration
- Modular component architecture

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Notes

- Ensure your backend server is running before using the app
- The app uses localStorage to persist team data
- All API calls include proper error handling with toast notifications
- The UI is fully responsive and works on mobile devices