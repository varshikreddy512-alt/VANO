// Mock data for testing without backend
// Enable this by setting VITE_USE_MOCK_DATA=true in .env

export const mockTeamData = {
  teamId: 'team-mock-123',
  teamName: 'Innovation Squad',
  eventName: 'TechHack 2026',
  eventDate: '2026-02-15',
  eventEndTime: '18:00',
  numberOfMembers: 4,
  overallProgress: 45,
  members: [
    {
      id: 'member-1',
      name: 'Sarah Chen',
      interest: 'Frontend',
      progress: 60,
      tasks: [
        {
          id: 'task-1-1',
          description: 'Create responsive landing page',
          fileName: 'Landing.tsx',
          completed: true,
        },
        {
          id: 'task-1-2',
          description: 'Implement user authentication UI',
          fileName: 'Login.tsx',
          completed: true,
        },
        {
          id: 'task-1-3',
          description: 'Design and build dashboard components',
          fileName: 'Dashboard.tsx',
          completed: true,
        },
        {
          id: 'task-1-4',
          description: 'Add form validation and error handling',
          fileName: 'validation.ts',
          completed: false,
        },
        {
          id: 'task-1-5',
          description: 'Optimize images and assets',
          completed: false,
        },
      ],
    },
    {
      id: 'member-2',
      name: 'Marcus Johnson',
      interest: 'Backend',
      progress: 50,
      tasks: [
        {
          id: 'task-2-1',
          description: 'Set up Express.js server',
          fileName: 'server.js',
          completed: true,
        },
        {
          id: 'task-2-2',
          description: 'Create database schema and models',
          fileName: 'models.js',
          completed: true,
        },
        {
          id: 'task-2-3',
          description: 'Implement REST API endpoints',
          fileName: 'routes.js',
          completed: false,
        },
        {
          id: 'task-2-4',
          description: 'Add JWT authentication middleware',
          fileName: 'auth.js',
          completed: false,
        },
      ],
    },
    {
      id: 'member-3',
      name: 'Priya Patel',
      interest: 'AI/ML',
      progress: 25,
      tasks: [
        {
          id: 'task-3-1',
          description: 'Research and select ML model',
          completed: true,
        },
        {
          id: 'task-3-2',
          description: 'Collect and preprocess training data',
          fileName: 'preprocessing.py',
          completed: false,
        },
        {
          id: 'task-3-3',
          description: 'Train recommendation model',
          fileName: 'model.py',
          completed: false,
        },
        {
          id: 'task-3-4',
          description: 'Create API endpoint for predictions',
          fileName: 'predict.py',
          completed: false,
        },
      ],
    },
    {
      id: 'member-4',
      name: 'Alex Rivera',
      interest: 'Design',
      progress: 45,
      tasks: [
        {
          id: 'task-4-1',
          description: 'Create design system and style guide',
          fileName: 'design-system.figma',
          completed: true,
        },
        {
          id: 'task-4-2',
          description: 'Design user flow and wireframes',
          completed: true,
        },
        {
          id: 'task-4-3',
          description: 'Create high-fidelity mockups',
          completed: false,
        },
        {
          id: 'task-4-4',
          description: 'Design icons and illustrations',
          completed: false,
        },
      ],
    },
  ],
  projectData: {
    problemStatement:
      'Students and professionals struggle to find personalized learning resources that match their skill level and learning style, leading to inefficient learning and wasted time.',
    explanation:
      'We are building an AI-powered learning platform that uses machine learning to understand user preferences and recommend personalized content.',
    whatIs:
      'An intelligent learning recommendation system that analyzes user behavior, skill level, and learning patterns to suggest the most relevant courses, articles, and resources.',
    whyNeeded:
      'With the explosion of online learning content, learners are overwhelmed with choices. Our platform cuts through the noise by providing personalized, data-driven recommendations that accelerate learning.',
    whereUsed:
      'Educational institutions, corporate training programs, online learning platforms, and individual learners seeking efficient skill development.',
    roadmap: [
      'User authentication and profile setup',
      'Content aggregation from multiple sources',
      'ML model training for recommendation engine',
      'Frontend dashboard with personalized feed',
      'Analytics and progress tracking',
      'Social features and community integration',
    ],
  },
};

export const mockCreateTeamResponse = (teamName: string, leadName: string) => ({
  teamId: `team-${Date.now()}`,
  teamName,
  leadName,
  message: 'Team created successfully',
});

export const mockJoinTeamResponse = (teamName: string) => ({
  teamId: 'team-mock-123',
  teamName,
  message: 'Successfully joined team',
});

export const mockGenerateProjectResponse = {
  problemStatement:
    'Building a sustainable urban farming solution to address food security in densely populated cities.',
  explanation:
    'An IoT-enabled vertical farming system that maximizes space efficiency while minimizing resource consumption.',
  whatIs:
    'A smart farming platform combining hydroponics, automated climate control, and AI-driven crop monitoring to enable year-round urban agriculture.',
  whyNeeded:
    'Urban areas face growing food security challenges due to limited space, supply chain disruptions, and climate change. Local food production reduces carbon footprint and improves food access.',
  whereUsed:
    'Urban rooftops, abandoned buildings, community centers, restaurants, schools, and residential complexes.',
  roadmap: [
    'IoT sensor integration for environmental monitoring',
    'Automated irrigation and nutrient delivery system',
    'Mobile app for remote monitoring and control',
    'AI model for crop health prediction',
    'Data analytics dashboard',
    'Community marketplace integration',
  ],
  members: [
    {
      id: 'member-new-1',
      name: 'Member 1',
      interest: 'Frontend',
      tasks: [
        {
          id: 'task-new-1-1',
          description: 'Create responsive web dashboard',
          fileName: 'Dashboard.tsx',
          completed: false,
        },
        {
          id: 'task-new-1-2',
          description: 'Build mobile-first UI components',
          fileName: 'Components.tsx',
          completed: false,
        },
        {
          id: 'task-new-1-3',
          description: 'Implement real-time data visualization',
          fileName: 'Charts.tsx',
          completed: false,
        },
      ],
    },
  ],
};
