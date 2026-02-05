// Application Constants and Configuration

export const APP_CONFIG = {
  // Application Info
  APP_NAME: 'AI Team Manager',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'Your intelligent hackathon workflow companion',

  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true',

  // Refresh Intervals (in milliseconds)
  AUTO_REFRESH_INTERVAL: 30000, // 30 seconds
  COUNTDOWN_UPDATE_INTERVAL: 1000, // 1 second

  // Team Configuration
  MIN_TEAM_MEMBERS: 2,
  MAX_TEAM_MEMBERS: 10,
  MIN_PASSWORD_LENGTH: 4,

  // Progress Thresholds (for color coding)
  PROGRESS_HIGH: 80,
  PROGRESS_MEDIUM: 50,
  PROGRESS_LOW: 25,

  // Member Interests/Skills
  MEMBER_INTERESTS: [
    'Frontend',
    'Backend',
    'AI/ML',
    'Design',
    'DevOps',
    'Full Stack',
  ],

  // Toast Configuration
  TOAST_DURATION: 3000, // 3 seconds
  TOAST_POSITION: 'top-right' as const,

  // Animation Configuration
  ANIMATION_DURATION: 0.3,
  STAGGER_DELAY: 0.1,
};

export const ROUTES = {
  LANDING: '/',
  CREATE_TEAM: '/create-team',
  JOIN_TEAM: '/join-team',
  TEAM_SETUP: '/team-setup',
  DASHBOARD: '/dashboard',
};

export const API_ENDPOINTS = {
  AUTH: {
    CREATE_TEAM: '/api/auth/create-team',
    JOIN_TEAM: '/api/auth/join-team',
  },
  TEAM: {
    SETUP: '/api/team/setup',
    GET: (teamId: string) => `/api/team/${teamId}`,
  },
  AI: {
    GENERATE_PROJECT: '/api/ai/generate-project',
  },
  TASK: {
    GET: (teamId: string) => `/api/task/${teamId}`,
    COMPLETE: '/api/task/complete',
  },
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  INVALID_CREDENTIALS: 'Invalid credentials. Please try again.',
  TEAM_NOT_FOUND: 'Team not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION_ERROR: 'Please check your input and try again.',
};

export const SUCCESS_MESSAGES = {
  TEAM_CREATED: 'Team created successfully!',
  TEAM_JOINED: 'Successfully joined team!',
  ROADMAP_GENERATED: 'AI roadmap generated successfully!',
  TASK_UPDATED: 'Task updated successfully!',
  SETUP_COMPLETE: 'Team setup completed!',
};

export const STORAGE_KEYS = {
  TEAM_DATA: 'teamData',
  USER_PREFERENCES: 'userPreferences',
};
