import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { teamService } from '../services/teamService';
import { eventService } from '../services/eventService';
import { useGeolocation } from '../hooks/useGeolocation';

const TeamBuilder = () => {
  const navigate = useNavigate();
  const { location } = useGeolocation();
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  // Load hackathons
  useEffect(() => {
    const loadHackathons = async () => {
      if (!location) return;
      
      try {
        const response = await eventService.getEvents(
          location.latitude,
          location.longitude,
          500, // 500km radius
          'Hackathon'
        );
        setHackathons(response.data || []);
      } catch (err) {
        console.error('Error loading hackathons:', err);
      }
    };

    loadHackathons();
  }, [location]);

  const generateRecommendations = async (hackathonId) => {
    setLoading(true);
    setError('');
    setRecommendations([]);
    setSelectedMembers([]);
    
    try {
      const response = await teamService.getTeamRecommendations(hackathonId);
      setRecommendations(response.data || []);
      setSelectedHackathon(hackathons.find(h => h.id === hackathonId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate recommendations');
    } finally {
      setLoading(false);
    }
  };

  const toggleMember = (userId) => {
    setSelectedMembers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const createTeam = async () => {
    if (!teamName.trim()) {
      setError('Please enter a team name');
      return;
    }

    if (selectedMembers.length === 0) {
      setError('Please select at least one team member');
      return;
    }

    setCreating(true);
    setError('');

    try {
      await teamService.createTeam({
        hackathon_id: selectedHackathon.id,
        name: teamName,
        member_ids: selectedMembers
      });

      alert(`Team "${teamName}" created successfully! 🎉`);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create team');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            AI Team Builder 🤖
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Let AI analyze nearby students and recommend the perfect teammates for hackathons
          </p>
        </div>

        {/* Step 1: Select Hackathon */}
        <Card className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Step 1: Select a Hackathon</h2>
          
          {hackathons.length === 0 ? (
            <p className="text-sm sm:text-base text-gray-600">No hackathons found nearby. Try increasing your search radius.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hackathons.map((hackathon) => (
                <button
                  key={hackathon.id}
                  onClick={() => generateRecommendations(hackathon.id)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    selectedHackathon?.id === hackathon.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">{hackathon.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{hackathon.city}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(hackathon.start_at).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* Loading State */}
        {loading && (
          <Card className="text-center py-12">
            <Loader />
            <p className="mt-4 text-sm sm:text-base text-gray-600">AI is analyzing nearby students...</p>
          </Card>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Step 2: Review Recommendations */}
        {!loading && recommendations.length > 0 && (
          <>
            <Card className="mb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Step 2: Select Team Members ({selectedMembers.length} selected)
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((rec) => (
                  <div
                    key={rec.user?.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedMembers.includes(rec.user?.id)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => toggleMember(rec.user?.id)}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                          {rec.user?.full_name?.charAt(0) || '?'}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-sm sm:text-base truncate">{rec.user?.full_name}</h3>
                          <p className="text-xs text-gray-500">
                            {rec.user?.distance?.toFixed(1)} km away
                          </p>
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 ml-2">
                        {rec.score}% Match
                      </div>
                    </div>

                    {/* Reasoning */}
                    <p className="text-xs text-gray-600 italic mb-3 line-clamp-2">
                      "{rec.reasoning}"
                    </p>

                    {/* Skills */}
                    {rec.user?.skills && (
                      <div className="flex flex-wrap gap-1">
                        {rec.user.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Checkbox */}
                    <div className="mt-3 flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(rec.user?.id)}
                        onChange={() => toggleMember(rec.user?.id)}
                        className="mr-2"
                      />
                      <span className="text-sm">
                        {selectedMembers.includes(rec.user?.id) ? 'Selected' : 'Select'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Step 3: Create Team */}
            <Card>
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Step 3: Create Your Team</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g., Code Warriors, AI Innovators..."
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>

              <Button 
                onClick={createTeam} 
                disabled={creating || selectedMembers.length === 0 || !teamName.trim()}
                fullWidth
              >
                {creating ? (
                  <span className="flex items-center justify-center text-sm sm:text-base">
                    <Loader size="sm" /> Creating Team...
                  </span>
                ) : (
                  <span className="text-sm sm:text-base">🚀 Create Team with {selectedMembers.length} Members</span>
                )}
              </Button>
            </Card>
          </>
        )}

        {/* Empty State */}
        {!loading && recommendations.length === 0 && !error && !selectedHackathon && (
          <Card className="text-center py-12">
            <div className="text-4xl sm:text-6xl mb-4">🎯</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Ready to Find Teammates?</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 px-4">
              Select a hackathon above to let AI recommend the best teammates for you
            </p>
          </Card>
        )}

        {/* How it Works */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">How AI Team Matching Works</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="text-2xl sm:text-3xl mb-3">🔍</div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">1. Analyze Profiles</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                AI analyzes skills, location, and preferences of nearby students
              </p>
            </div>
            
            <div>
              <div className="text-2xl sm:text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">2. Match Skills</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Finds complementary skills that would strengthen your team
              </p>
            </div>
            
            <div>
              <div className="text-2xl sm:text-3xl mb-3">✨</div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">3. Get Recommendations</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Receive ranked recommendations with match scores and reasoning
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamBuilder;
