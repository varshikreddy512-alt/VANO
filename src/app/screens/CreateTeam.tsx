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

export const CreateTeam: React.FC = () => {
  const navigate = useNavigate();
  const { setTeamData } = useTeam();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    teamName: '',
    password: '',
    leadName: '',
    eventName: '',
    eventDate: '',
    eventEndTime: '',
    numberOfMembers: 4,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response: any = await api.createTeam(formData);
      
      // Store team data in context
      setTeamData({
        teamId: response.teamId,
        teamName: formData.teamName,
        eventName: formData.eventName,
        eventDate: formData.eventDate,
        eventEndTime: formData.eventEndTime,
        isLead: true,
        memberName: formData.leadName,
        numberOfMembers: formData.numberOfMembers,
        members: [],
        overallProgress: 0,
      });

      toast.success('Team created successfully!');
      navigate('/team-setup');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create team');
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
        className="w-full max-w-2xl"
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
            <h1 className="text-3xl mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Create Your Team
            </h1>
            <p className="text-slate-400">Set up your team and start your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="teamName" className="text-slate-300">Team Name</Label>
                <Input
                  id="teamName"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  required
                  className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
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
                  className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
                  placeholder="Set a password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="leadName" className="text-slate-300">Team Lead Name</Label>
                <Input
                  id="leadName"
                  value={formData.leadName}
                  onChange={(e) => setFormData({ ...formData, leadName: e.target.value })}
                  required
                  className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventName" className="text-slate-300">Event Name</Label>
                <Input
                  id="eventName"
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  required
                  className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
                  placeholder="Hackathon name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate" className="text-slate-300">Event Date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  required
                  className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventEndTime" className="text-slate-300">Event End Time</Label>
                <Input
                  id="eventEndTime"
                  type="time"
                  value={formData.eventEndTime}
                  onChange={(e) => setFormData({ ...formData, eventEndTime: e.target.value })}
                  required
                  className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfMembers" className="text-slate-300">Number of Team Members</Label>
                <Input
                  id="numberOfMembers"
                  type="number"
                  min="2"
                  max="10"
                  value={formData.numberOfMembers}
                  onChange={(e) => setFormData({ ...formData, numberOfMembers: parseInt(e.target.value) })}
                  required
                  className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Team...
                </>
              ) : (
                'Create Team'
              )}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};
