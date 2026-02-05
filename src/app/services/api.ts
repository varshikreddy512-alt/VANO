// API Service Layer for Backend Integration

import { APP_CONFIG } from '../config/constants';
import { 
  mockTeamData, 
  mockCreateTeamResponse, 
  mockJoinTeamResponse, 
  mockGenerateProjectResponse 
} from './mockData';

const API_BASE_URL = APP_CONFIG.API_BASE_URL;
const USE_MOCK_DATA = APP_CONFIG.USE_MOCK_DATA;

interface CreateTeamRequest {
  teamName: string;
  password: string;
  leadName: string;
  eventName: string;
  eventDate: string;
  eventEndTime: string;
  numberOfMembers: number;
}

interface JoinTeamRequest {
  teamName: string;
  password: string;
  memberName: string;
}

interface TeamSetupRequest {
  teamId: string;
  problemStatement: string;
  members: Array<{
    name: string;
    interest: string;
  }>;
}

interface GenerateProjectRequest {
  teamId: string;
  problemStatement: string;
  members: Array<{
    name: string;
    interest: string;
  }>;
}

interface CompleteTaskRequest {
  teamId: string;
  memberId: string;
  taskId: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      
      // If backend is not available and mock data is not enabled, show helpful error
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        if (!USE_MOCK_DATA) {
          throw new Error(
            'Backend server is not running. Please start your Node.js backend or enable mock data mode by setting VITE_USE_MOCK_DATA=true in your environment.'
          );
        }
      }
      
      throw error;
    }
  }

  // Simulate API delay for mock data
  private async mockDelay<T>(data: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 800);
    });
  }

  // Auth Endpoints
  async createTeam(data: CreateTeamRequest) {
    if (USE_MOCK_DATA) {
      console.log('🔧 Using mock data for createTeam');
      return this.mockDelay(mockCreateTeamResponse(data.teamName, data.leadName));
    }
    
    return this.request('/api/auth/create-team', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async joinTeam(data: JoinTeamRequest) {
    if (USE_MOCK_DATA) {
      console.log('🔧 Using mock data for joinTeam');
      return this.mockDelay(mockJoinTeamResponse(data.teamName));
    }
    
    return this.request('/api/auth/join-team', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Team Endpoints
  async setupTeam(data: TeamSetupRequest) {
    if (USE_MOCK_DATA) {
      console.log('🔧 Using mock data for setupTeam');
      return this.mockDelay({ success: true, message: 'Team setup completed' });
    }
    
    return this.request('/api/team/setup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getTeam(teamId: string) {
    if (USE_MOCK_DATA) {
      console.log('🔧 Using mock data for getTeam');
      return this.mockDelay(mockTeamData);
    }
    
    return this.request(`/api/team/${teamId}`, {
      method: 'GET',
    });
  }

  // AI Endpoints
  async generateProject(data: GenerateProjectRequest) {
    if (USE_MOCK_DATA) {
      console.log('🔧 Using mock data for generateProject');
      return this.mockDelay(mockGenerateProjectResponse);
    }
    
    return this.request('/api/ai/generate-project', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Task Endpoints
  async getTasks(teamId: string) {
    if (USE_MOCK_DATA) {
      console.log('🔧 Using mock data for getTasks');
      return this.mockDelay({ tasks: mockTeamData.members });
    }
    
    return this.request(`/api/task/${teamId}`, {
      method: 'GET',
    });
  }

  async completeTask(data: CompleteTaskRequest) {
    if (USE_MOCK_DATA) {
      console.log('🔧 Using mock data for completeTask');
      return this.mockDelay({ 
        success: true, 
        message: 'Task updated successfully',
        updatedProgress: Math.floor(Math.random() * 100)
      });
    }
    
    return this.request('/api/task/complete', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiService();