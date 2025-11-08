import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../components/layout/Navbar';
import Card from '../components/common/Card';
import userService from '../services/userService';
import { useAuth } from '../hooks/useAuth';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom user marker icon
const createUserIcon = (isCurrentUser = false) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${isCurrentUser ? '#3B82F6' : '#10B981'};
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: white;
      font-weight: bold;
    ">👤</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
};

const AVAILABLE_SKILLS = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning',
  'Data Science', 'UI/UX Design', 'Mobile Development', 'DevOps',
  'Cloud Computing', 'Blockchain', 'Cybersecurity', 'AI/ML',
  'Backend Development', 'Frontend Development', 'Full Stack',
  'Database Management', 'Game Development', 'IoT', 'AR/VR'
];

const GlobalNetwork = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [radiusFilter, setRadiusFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        search: searchTerm || undefined,
        skills: selectedSkills.length > 0 ? selectedSkills : undefined,
        radius: radiusFilter || undefined,
        userLat: user?.latitude,
        userLon: user?.longitude
      };
      
      const data = await userService.getGlobalNetwork(params);
      setUsers(data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    fetchUsers();
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSkills([]);
    setRadiusFilter('');
    fetchUsers();
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleUserClick = async (userId) => {
    try {
      const userData = await userService.getUserProfile(userId);
      setSelectedUser(userData.user);
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🌍 Global Network
          </h1>
          <p className="text-gray-600">
            Discover and connect with students from around the world
          </p>
        </div>

        {/* Filters Section */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>

          {showFilters && (
            <div className="space-y-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search by name or university
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Skills Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SKILLS.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedSkills.includes(skill)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Radius Filter */}
              {user?.latitude && user?.longitude && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance from you (km)
                  </label>
                  <select
                    value={radiusFilter}
                    onChange={(e) => setRadiusFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any distance</option>
                    <option value="10">Within 10 km</option>
                    <option value="50">Within 50 km</option>
                    <option value="100">Within 100 km</option>
                    <option value="500">Within 500 km</option>
                    <option value="1000">Within 1000 km</option>
                  </select>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleResetFilters}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Active Filters Summary */}
          {!showFilters && (searchTerm || selectedSkills.length > 0 || radiusFilter) && (
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Search: {searchTerm}
                </span>
              )}
              {selectedSkills.map(skill => (
                <span key={skill} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
              {radiusFilter && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Within {radiusFilter} km
                </span>
              )}
            </div>
          )}
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{users.length}</div>
              <div className="text-sm text-gray-600">Users Found</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {new Set(users.flatMap(u => u.skills || [])).size}
              </div>
              <div className="text-sm text-gray-600">Unique Skills</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {new Set(users.map(u => u.university)).size}
              </div>
              <div className="text-sm text-gray-600">Universities</div>
            </div>
          </Card>
        </div>

        {/* Map and Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* World Map */}
          <Card className="h-[600px]">
            <h3 className="text-lg font-semibold mb-4">World Map</h3>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-red-500 text-4xl mb-2">⚠️</div>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            ) : users.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-gray-400 text-4xl mb-2">🔍</div>
                  <p className="text-gray-600">No users found</p>
                </div>
              </div>
            ) : (
              <MapContainer
                center={[20, 0]}
                zoom={2}
                className="h-[520px] rounded-lg"
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Current user marker */}
                {user?.latitude && user?.longitude && (
                  <Marker
                    position={[user.latitude, user.longitude]}
                    icon={createUserIcon(true)}
                  >
                    <Popup>
                      <div className="text-center">
                        <strong>You</strong>
                        <div className="text-sm text-gray-600">{user.university}</div>
                      </div>
                    </Popup>
                  </Marker>
                )}
                
                {/* Other users markers */}
                {users.map(u => (
                  u.latitude && u.longitude && u.id !== user?.id && (
                    <Marker
                      key={u.id}
                      position={[u.latitude, u.longitude]}
                      icon={createUserIcon(false)}
                      eventHandlers={{
                        click: () => handleUserClick(u.id)
                      }}
                    >
                      <Popup>
                        <div className="min-w-[200px]">
                          <div className="font-semibold">{u.username}</div>
                          <div className="text-sm text-gray-600">{u.university}</div>
                          {u.distance && (
                            <div className="text-sm text-blue-600 mt-1">
                              📍 {u.distance.toFixed(1)} km away
                            </div>
                          )}
                          {u.skills && u.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {u.skills.slice(0, 3).map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                              {u.skills.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{u.skills.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  )
                ))}
              </MapContainer>
            )}
          </Card>

          {/* Users List */}
          <Card className="h-[600px] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Users</h3>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : users.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-gray-400 text-4xl mb-2">👥</div>
                  <p className="text-gray-600">No users found</p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {users.map(u => (
                  <div
                    key={u.id}
                    onClick={() => handleUserClick(u.id)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{u.username}</h4>
                          {u.id === user?.id && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{u.university}</p>
                        {u.bio && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{u.bio}</p>
                        )}
                      </div>
                      {u.distance && (
                        <div className="text-sm text-blue-600 font-medium ml-2">
                          {u.distance.toFixed(1)} km
                        </div>
                      )}
                    </div>
                    
                    {u.skills && u.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {u.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* User Profile Modal */}
        {selectedUser && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedUser(null)}
          >
            <div
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedUser.username}</h2>
                    <p className="text-gray-600">{selectedUser.email}</p>
                  </div>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">University</h3>
                    <p className="text-gray-900">{selectedUser.university}</p>
                  </div>

                  {selectedUser.bio && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">Bio</h3>
                      <p className="text-gray-900">{selectedUser.bio}</p>
                    </div>
                  )}

                  {selectedUser.skills && selectedUser.skills.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedUser.distance && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">Distance</h3>
                      <p className="text-blue-600 font-medium">
                        📍 {selectedUser.distance.toFixed(1)} km away from you
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <button
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      onClick={() => {
                        // TODO: Add connect/message functionality
                        alert('Connect functionality coming soon!');
                      }}
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalNetwork;
