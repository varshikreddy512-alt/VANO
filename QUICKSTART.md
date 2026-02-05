# Quick Start Guide

Get your AI Team Manager up and running in 5 minutes!

## Prerequisites

- Node.js v16 or higher
- npm or yarn
- Your backend server (or use mock data for testing)

## Step 1: Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-team-manager

# Install dependencies
npm install
```

## Step 2: Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

**For Quick Testing (Recommended):**

The `.env` file is already configured with mock data mode enabled:

```env
# Point to your backend server
VITE_API_BASE_URL=http://localhost:3000

# Mock data mode enabled by default for easy testing
VITE_USE_MOCK_DATA=true
```

**To Connect to Real Backend:**

Update `.env` to:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCK_DATA=false
```

## Step 3: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Step 4: Test the Application

### Option A: With Real Backend

1. Ensure your Node.js backend is running on port 3000 (or your configured port)
2. Open http://localhost:5173
3. Click "Create Team" and fill in the form
4. Complete team setup and generate AI roadmap
5. View your dashboard!

### Option B: With Mock Data (No Backend Required)

1. Set `VITE_USE_MOCK_DATA=true` in `.env`
2. Restart the dev server
3. The app will use mock data for all API calls
4. Perfect for frontend development and demos!

## Application Flow

```
Landing Page
    ├── Create Team (Lead)
    │   └── Team Setup (Define problem + members)
    │       └── Dashboard (View & manage)
    │
    └── Join Team (Member)
        └── Dashboard (View & complete tasks)
```

## Default Test Data (Mock Mode)

When using mock data, you can use any team name and password. Example:

- **Team Name**: Innovation Squad
- **Password**: test123
- **Member Name**: Your Name

## Key Features to Test

1. **Create Team**: Set up a new team with event details
2. **Join Team**: Join an existing team with credentials
3. **Team Setup**: Add problem statement and member roles
4. **AI Generation**: Generate project roadmap and tasks
5. **Task Management**: Check off completed tasks
6. **Progress Tracking**: Watch real-time progress updates
7. **Countdown Timer**: See time remaining for event

## Building for Production

```bash
npm run build
```

Files will be output to `dist/` directory.

## Common Issues

### Port Already in Use

If port 5173 is taken, Vite will automatically use the next available port.

### API Connection Error

- Check that your backend is running
- Verify `VITE_API_BASE_URL` in `.env`
- Check browser console for CORS errors
- Ensure your backend has CORS enabled

### Cannot Connect to Backend

Enable mock data mode temporarily:
```env
VITE_USE_MOCK_DATA=true
```

## Project Structure

```
src/
├── app/
│   ├── components/      # Reusable UI components
│   ├── config/          # App configuration
│   ├── context/         # React context for state
│   ├── screens/         # Main application screens
│   ├── services/        # API service layer
│   └── utils/           # Helper functions
└── styles/              # CSS and themes
```

## Next Steps

1. **Customize Branding**: Update colors and theme in `/src/styles/theme.css`
2. **Add Features**: Extend with your own components
3. **Backend Integration**: Follow `/BACKEND_INTEGRATION.md` for API details
4. **Deploy**: Build and deploy to your hosting platform

## Need Help?

- Check `/README.md` for detailed documentation
- Review `/BACKEND_INTEGRATION.md` for API specs
- Look at mock data in `/src/app/services/mockData.ts` for expected formats

## Tips

- Use React DevTools to inspect component state
- Check Network tab to debug API calls
- Console logs show API errors
- localStorage persists your team session

Happy coding! 🚀