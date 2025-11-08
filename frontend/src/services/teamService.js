import api from './api';

export const teamService = {
  /**
   * Get AI-powered team recommendations for a hackathon
   */
  async getTeamRecommendations(hackathonId) {
    const response = await api.get(`/teams/recommendations/${hackathonId}`);
    return response.data;
  },

  /**
   * Create a new team
   */
  async createTeam(teamData) {
    const response = await api.post('/teams', teamData);
    return response.data;
  },

  /**
   * Get user's teams
   */
  async getMyTeams() {
    const response = await api.get('/teams/my-teams');
    return response.data;
  },
};
