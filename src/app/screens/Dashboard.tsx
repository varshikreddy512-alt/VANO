import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';
import { CountdownTimer } from '../components/CountdownTimer';
import { 
  Users, 
  Target, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  Circle,
  LogOut,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTeam } from '../context/TeamContext';
import { api } from '../services/api';
import { toast } from 'sonner';
import { getRoleBadgeColor } from '../utils/helpers';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { teamData, setTeamData, clearTeamData } = useTeam();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!teamData) {
      navigate('/');
      return;
    }

    // Auto-refresh team data periodically
    const fetchTeamData = async () => {
      try {
        const response: any = await api.getTeam(teamData.teamId);
        setTeamData({
          ...teamData,
          members: response.members || teamData.members,
          projectData: response.projectData || teamData.projectData,
          overallProgress: response.overallProgress || calculateOverallProgress(response.members || teamData.members),
        });
      } catch (error) {
        // Silently fail on background refresh
      }
    };

    const interval = setInterval(fetchTeamData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [teamData]);

  if (!teamData) {
    return null;
  }

  const calculateOverallProgress = (members: any[]) => {
    if (!members.length) return 0;
    const totalProgress = members.reduce((sum, m) => sum + (m.progress || 0), 0);
    return Math.round(totalProgress / members.length);
  };

  const handleTaskComplete = async (memberId: string, taskId: string, currentStatus: boolean) => {
    try {
      await api.completeTask({
        teamId: teamData.teamId,
        memberId,
        taskId,
      });

      // Update local state
      const updatedMembers = teamData.members.map(member => {
        if (member.id === memberId) {
          const updatedTasks = member.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !currentStatus } : task
          );
          const completedCount = updatedTasks.filter(t => t.completed).length;
          const progress = Math.round((completedCount / updatedTasks.length) * 100);
          
          return {
            ...member,
            tasks: updatedTasks,
            progress,
          };
        }
        return member;
      });

      setTeamData({
        ...teamData,
        members: updatedMembers,
        overallProgress: calculateOverallProgress(updatedMembers),
      });

      toast.success('Task updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update task');
    }
  };

  const handleLogout = () => {
    clearTeamData();
    navigate('/');
  };

  const overallProgress = calculateOverallProgress(teamData.members);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {teamData.teamName}
              </h1>
              <p className="text-slate-400 text-sm">{teamData.eventName}</p>
            </div>
            <div className="flex items-center gap-4">
              <CountdownTimer
                eventDate={teamData.eventDate}
                eventEndTime={teamData.eventEndTime}
              />
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-slate-400 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300 text-sm">Overall Progress</span>
              <span className="text-cyan-400 text-sm">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Panel - Project Explanation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="bg-slate-900/80 border-slate-800 p-6 sticky top-32">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg text-white">Project Overview</h2>
              </div>
              
              <ScrollArea className="h-[calc(100vh-300px)]">
                {teamData.projectData ? (
                  <div className="space-y-4 text-sm pr-4">
                    <div>
                      <h3 className="text-cyan-400 mb-2">Problem Statement</h3>
                      <p className="text-slate-300">{teamData.projectData.problemStatement}</p>
                    </div>
                    <div>
                      <h3 className="text-cyan-400 mb-2">What is this?</h3>
                      <p className="text-slate-300">{teamData.projectData.whatIs}</p>
                    </div>
                    <div>
                      <h3 className="text-cyan-400 mb-2">Why is it needed?</h3>
                      <p className="text-slate-300">{teamData.projectData.whyNeeded}</p>
                    </div>
                    <div>
                      <h3 className="text-cyan-400 mb-2">Where can it be used?</h3>
                      <p className="text-slate-300">{teamData.projectData.whereUsed}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">No project data available yet</p>
                )}
              </ScrollArea>
            </Card>
          </motion.div>

          {/* Center Panel - Member Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="space-y-4">
              {teamData.members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="bg-slate-900/80 border-slate-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg text-white">{member.name}</h3>
                        <p className="text-sm text-slate-400">{member.interest}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl text-cyan-400">{member.progress}%</div>
                        <div className="text-xs text-slate-400">Complete</div>
                      </div>
                    </div>

                    <Progress value={member.progress} className="h-1.5 mb-4" />

                    <div className="space-y-2">
                      {member.tasks && member.tasks.length > 0 ? (
                        member.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
                          >
                            <Checkbox
                              checked={task.completed}
                              onCheckedChange={() => handleTaskComplete(member.id, task.id, task.completed)}
                              className="mt-0.5"
                            />
                            <div className="flex-1">
                              <p className={`text-sm ${task.completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                                {task.description}
                              </p>
                              {task.fileName && (
                                <p className="text-xs text-cyan-400 mt-1">
                                  <FileText className="w-3 h-3 inline mr-1" />
                                  {task.fileName}
                                </p>
                              )}
                            </div>
                            {task.completed && (
                              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-400 text-sm text-center py-4">No tasks assigned yet</p>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Panel - Progress Tracking */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card className="bg-slate-900/80 border-slate-800 p-6 sticky top-32">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg text-white">Progress Tracking</h2>
              </div>

              <div className="space-y-4">
                {/* Overall Status */}
                <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-lg border border-cyan-500/20">
                  <div className="text-center">
                    <div className="text-4xl mb-1 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      {overallProgress}%
                    </div>
                    <div className="text-sm text-slate-400">Team Progress</div>
                  </div>
                </div>

                {/* Member Progress List */}
                <div className="space-y-2">
                  <h3 className="text-sm text-slate-400 mb-3">Member Progress</h3>
                  {teamData.members.map((member) => (
                    <div key={member.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">{member.name}</span>
                        <span className="text-cyan-400">{member.progress}%</span>
                      </div>
                      <Progress value={member.progress} className="h-1" />
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="pt-4 border-t border-slate-800 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Members</span>
                    <span className="text-white">{teamData.members.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Tasks</span>
                    <span className="text-white">
                      {teamData.members.reduce((sum, m) => sum + (m.tasks?.length || 0), 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Completed Tasks</span>
                    <span className="text-green-400">
                      {teamData.members.reduce(
                        (sum, m) => sum + (m.tasks?.filter(t => t.completed).length || 0),
                        0
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};