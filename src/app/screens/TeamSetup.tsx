import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Sparkles, Loader2, Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../services/api';
import { useTeam } from '../context/TeamContext';
import { toast } from 'sonner';
import { APP_CONFIG } from '../config/constants';

interface MemberInput {
  name: string;
  interest: string;
}

export const TeamSetup: React.FC = () => {
  const navigate = useNavigate();
  const { teamData, setTeamData } = useTeam();
  const [loading, setLoading] = useState(false);
  const [problemStatement, setProblemStatement] = useState('');
  
  const [members, setMembers] = useState<MemberInput[]>(
    Array.from({ length: teamData?.numberOfMembers || 4 }, () => ({
      name: '',
      interest: '',
    }))
  );

  if (!teamData || !teamData.isLead) {
    navigate('/');
    return null;
  }

  const handleMemberChange = (index: number, field: 'name' | 'interest', value: string) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const handleGenerateRoadmap = async () => {
    if (!problemStatement.trim()) {
      toast.error('Please enter a problem statement');
      return;
    }

    const filledMembers = members.filter(m => m.name && m.interest);
    if (filledMembers.length === 0) {
      toast.error('Please add at least one team member');
      return;
    }

    setLoading(true);

    try {
      const response: any = await api.generateProject({
        teamId: teamData.teamId,
        problemStatement,
        members: filledMembers,
      });

      // Update team data with project info and members
      setTeamData({
        ...teamData,
        members: response.members.map((m: any, index: number) => ({
          id: m.id || `member-${index}`,
          name: m.name,
          interest: m.interest,
          tasks: m.tasks || [],
          progress: 0,
        })),
        projectData: {
          problemStatement: response.problemStatement,
          explanation: response.explanation,
          whatIs: response.whatIs,
          whyNeeded: response.whyNeeded,
          whereUsed: response.whereUsed,
          roadmap: response.roadmap || [],
        },
      });

      toast.success('AI roadmap generated successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate roadmap');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Team Setup
            </h1>
            <p className="text-slate-400">Configure your project and team members</p>
          </div>

          <div className="space-y-6">
            {/* Problem Statement */}
            <Card className="bg-slate-900/80 border-slate-800 p-6">
              <Label className="text-slate-300 mb-3 block">Problem Statement</Label>
              <Textarea
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                placeholder="Describe the problem your team will solve..."
                className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500 min-h-32"
              />
            </Card>

            {/* Team Members */}
            <Card className="bg-slate-900/80 border-slate-800 p-6">
              <h2 className="text-xl mb-4 text-white">Team Members</h2>
              <div className="space-y-4">
                {members.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid md:grid-cols-2 gap-4 p-4 bg-slate-800/30 rounded-lg"
                  >
                    <div className="space-y-2">
                      <Label className="text-slate-300 text-sm">Member {index + 1} Name</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        placeholder="Enter name"
                        className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300 text-sm">Interest / Skill</Label>
                      <Select
                        value={member.interest}
                        onValueChange={(value) => handleMemberChange(index, 'interest', value)}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500">
                          <SelectValue placeholder="Select skill" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="Frontend">Frontend</SelectItem>
                          <SelectItem value="Backend">Backend</SelectItem>
                          <SelectItem value="AI">AI/ML</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="DevOps">DevOps</SelectItem>
                          <SelectItem value="Full Stack">Full Stack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={handleGenerateRoadmap}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating AI Roadmap...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate AI Roadmap
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};