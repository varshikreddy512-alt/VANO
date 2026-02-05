// Utility functions for the AI Team Manager

/**
 * Calculate progress percentage for a member based on completed tasks
 */
export const calculateMemberProgress = (
  completedTasks: number,
  totalTasks: number
): number => {
  if (totalTasks === 0) return 0;
  return Math.round((completedTasks / totalTasks) * 100);
};

/**
 * Calculate overall team progress from member progress values
 */
export const calculateOverallProgress = (memberProgressValues: number[]): number => {
  if (memberProgressValues.length === 0) return 0;
  const sum = memberProgressValues.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / memberProgressValues.length);
};

/**
 * Format time remaining in a human-readable format
 */
export const formatTimeRemaining = (hours: number, minutes: number): string => {
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h`;
  }
  return `${hours}h ${minutes}m`;
};

/**
 * Validate team creation form data
 */
export const validateTeamCreation = (data: {
  teamName: string;
  password: string;
  leadName: string;
  eventName: string;
  eventDate: string;
  eventEndTime: string;
  numberOfMembers: number;
}): { isValid: boolean; error?: string } => {
  if (!data.teamName.trim()) {
    return { isValid: false, error: 'Team name is required' };
  }
  if (data.password.length < 4) {
    return { isValid: false, error: 'Password must be at least 4 characters' };
  }
  if (!data.leadName.trim()) {
    return { isValid: false, error: 'Lead name is required' };
  }
  if (!data.eventName.trim()) {
    return { isValid: false, error: 'Event name is required' };
  }
  if (!data.eventDate) {
    return { isValid: false, error: 'Event date is required' };
  }
  if (!data.eventEndTime) {
    return { isValid: false, error: 'Event end time is required' };
  }
  if (data.numberOfMembers < 2 || data.numberOfMembers > 10) {
    return { isValid: false, error: 'Team must have 2-10 members' };
  }
  return { isValid: true };
};

/**
 * Validate join team form data
 */
export const validateJoinTeam = (data: {
  teamName: string;
  password: string;
  memberName: string;
}): { isValid: boolean; error?: string } => {
  if (!data.teamName.trim()) {
    return { isValid: false, error: 'Team name is required' };
  }
  if (!data.password) {
    return { isValid: false, error: 'Password is required' };
  }
  if (!data.memberName.trim()) {
    return { isValid: false, error: 'Your name is required' };
  }
  return { isValid: true };
};

/**
 * Generate a unique ID (simple implementation)
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format time for display
 */
export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

/**
 * Get progress color based on percentage
 */
export const getProgressColor = (progress: number): string => {
  if (progress >= 80) return 'text-green-400';
  if (progress >= 50) return 'text-cyan-400';
  if (progress >= 25) return 'text-yellow-400';
  return 'text-slate-400';
};

/**
 * Get role badge color
 */
export const getRoleBadgeColor = (role: string): string => {
  const roleColors: Record<string, string> = {
    Frontend: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Backend: 'bg-green-500/20 text-green-400 border-green-500/30',
    'AI': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'AI/ML': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    Design: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    DevOps: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'Full Stack': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  };
  return roleColors[role] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
};
