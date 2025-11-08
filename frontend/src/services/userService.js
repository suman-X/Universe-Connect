import api from './api';

class UserService {
  async getGlobalNetwork(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.skills && params.skills.length > 0) {
      queryParams.append('skills', params.skills.join(','));
    }
    if (params.radius) queryParams.append('radius', params.radius);
    if (params.userLat) queryParams.append('userLat', params.userLat);
    if (params.userLon) queryParams.append('userLon', params.userLon);
    
    const response = await api.get(`/users/global-network?${queryParams.toString()}`);
    return response.data;
  }

  async getNearbyUsers(radius = 50) {
    const response = await api.get(`/users/nearby?radius=${radius}`);
    return response.data;
  }

  async getUserProfile(userId) {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  }

  async updateProfile(profileData) {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  }
}

export default new UserService();
