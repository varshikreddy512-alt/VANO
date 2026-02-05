import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../services/api';
import { useTeam } from '../context/TeamContext';
import { toast } from 'sonner';

export const JoinTeam: React.FC = () => {
  const navigate = useNavigate();
  const { setTeamData } = useTeam();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    teamName: '',
    password: '',
    memberName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response: any = await api.joinTeam(formData);
      
      // Fetch full team data
      const teamData: any = await api.getTeam(response.teamId);
      
      setTeamData({
        teamId: response.teamId,
        teamName: formData.teamName,
        eventName: teamData.eventName,
        eventDate: teamData.eventDate,
        eventEndTime: teamData.eventEndTime,
        isLead: false,
        memberName: formData.memberName,
        numberOfMembers: teamData.numberOfMembers,
        members: teamData.members || [],
        projectData: teamData.projectData,
        overallProgress: teamData.overallProgress || 0,
      });

      toast.success('Successfully joined team!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to join team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="bg-slate-900/80 border-slate-800 p-8">
          <div className="mb-8">
            <h1 className="text-3xl mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Join a Team
            </h1>
            <p className="text-slate-400">Enter team credentials to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="teamName" className="text-slate-300">Team Name</Label>
              <Input
                id="teamName"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                required
                className="bg-slate-800/50 border-slate-700 text-white focus:border-blue-500"
                placeholder="Enter team name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Team Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-slate-800/50 border-slate-700 text-white focus:border-blue-500"
                placeholder="Enter password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="memberName" className="text-slate-300">Your Name</Label>
              <Input
                id="memberName"
                value={formData.memberName}
                onChange={(e) => setFormData({ ...formData, memberName: e.target.value })}
                required
                className="bg-slate-800/50 border-slate-700 text-white focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Joining...
                </>
              ) : (
                'Join Team'
              )}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};
