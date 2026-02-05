import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Member {
  id: string;
  name: string;
  interest: string;
  tasks: Task[];
  progress: number;
}

export interface Task {
  id: string;
  description: string;
  fileName?: string;
  completed: boolean;
}

export interface ProjectData {
  problemStatement: string;
  explanation: string;
  whatIs: string;
  whyNeeded: string;
  whereUsed: string;
  roadmap: string[];
}

export interface TeamData {
  teamId: string;
  teamName: string;
  eventName: string;
  eventDate: string;
  eventEndTime: string;
  isLead: boolean;
  memberName: string;
  numberOfMembers: number;
  members: Member[];
  projectData?: ProjectData;
  overallProgress: number;
}

interface TeamContextType {
  teamData: TeamData | null;
  setTeamData: (data: TeamData | null) => void;
  updateMemberProgress: (memberId: string, progress: number) => void;
  updateOverallProgress: () => void;
  clearTeamData: () => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teamData, setTeamDataState] = useState<TeamData | null>(() => {
    const stored = localStorage.getItem('teamData');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (teamData) {
      localStorage.setItem('teamData', JSON.stringify(teamData));
    } else {
      localStorage.removeItem('teamData');
    }
  }, [teamData]);

  const setTeamData = (data: TeamData | null) => {
    setTeamDataState(data);
  };

  const updateMemberProgress = (memberId: string, progress: number) => {
    if (!teamData) return;

    const updatedMembers = teamData.members.map((member) =>
      member.id === memberId ? { ...member, progress } : member
    );

    setTeamDataState({
      ...teamData,
      members: updatedMembers,
    });
  };

  const updateOverallProgress = () => {
    if (!teamData || !teamData.members.length) return;

    const totalProgress = teamData.members.reduce(
      (sum, member) => sum + member.progress,
      0
    );
    const overallProgress = Math.round(totalProgress / teamData.members.length);

    setTeamDataState({
      ...teamData,
      overallProgress,
    });
  };

  const clearTeamData = () => {
    setTeamDataState(null);
    localStorage.removeItem('teamData');
  };

  return (
    <TeamContext.Provider
      value={{
        teamData,
        setTeamData,
        updateMemberProgress,
        updateOverallProgress,
        clearTeamData,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within TeamProvider');
  }
  return context;
};
