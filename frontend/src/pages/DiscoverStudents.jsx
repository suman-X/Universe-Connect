import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import { FaSearch, FaGlobe, FaTimes } from 'react-icons/fa';

// Mock student data - replace with API call later
const mockStudents = [
  {
    id: 1,
    name: 'Sarah Chen',
    country: 'Singapore',
    countryFlag: '🇸🇬',
    university: 'National University of Singapore',
    fieldOfStudy: 'Computer Science',
    bio: 'Passionate about AI and machine learning. Looking to collaborate on innovative projects!',
    interests: ['AI', 'Machine Learning', 'Web Development', 'Hackathons'],
    profilePicture: 'https://i.pravatar.cc/150?img=1',
    mutualInterests: 2
  },
  {
    id: 2,
    name: 'Alex Rodriguez',
    country: 'Spain',
    countryFlag: '🇪🇸',
    university: 'Universidad Politécnica de Madrid',
    fieldOfStudy: 'Data Science',
    bio: 'Data enthusiast seeking team members for ML competitions and research.',
    interests: ['Data Science', 'Python', 'Research', 'Competitions'],
    profilePicture: 'https://i.pravatar.cc/150?img=33',
    mutualInterests: 3
  },
  {
    id: 3,
    name: 'Priya Sharma',
    country: 'India',
    countryFlag: '🇮🇳',
    university: 'IIT Bombay',
    fieldOfStudy: 'Software Engineering',
    bio: 'Full-stack developer interested in building impactful solutions for social good.',
    interests: ['Full Stack', 'React', 'Node.js', 'Social Impact'],
    profilePicture: 'https://i.pravatar.cc/150?img=5',
    mutualInterests: 1
  },
  {
    id: 4,
    name: 'James Wilson',
    country: 'United States',
    countryFlag: '🇺🇸',
    university: 'Stanford University',
    fieldOfStudy: 'Computer Science',
    bio: 'Building the future of web3. Always looking for co-founders and collaborators.',
    interests: ['Blockchain', 'Web3', 'Startups', 'Entrepreneurship'],
    profilePicture: 'https://i.pravatar.cc/150?img=12',
    mutualInterests: 0
  },
  {
    id: 5,
    name: 'Emma Müller',
    country: 'Germany',
    countryFlag: '🇩🇪',
    university: 'Technical University of Munich',
    fieldOfStudy: 'Robotics',
    bio: 'Robotics engineer passionate about autonomous systems and IoT.',
    interests: ['Robotics', 'IoT', 'Hardware', 'Innovation'],
    profilePicture: 'https://i.pravatar.cc/150?img=9',
    mutualInterests: 1
  },
  {
    id: 6,
    name: 'Yuki Tanaka',
    country: 'Japan',
    countryFlag: '🇯🇵',
    university: 'University of Tokyo',
    fieldOfStudy: 'Game Development',
    bio: 'Game developer and VR enthusiast. Let\'s create immersive experiences together!',
    interests: ['Game Dev', 'VR/AR', 'Unity', 'Graphics'],
    profilePicture: 'https://i.pravatar.cc/150?img=32',
    mutualInterests: 2
  },
  {
    id: 7,
    name: 'Lucas Silva',
    country: 'Brazil',
    countryFlag: '🇧🇷',
    university: 'University of São Paulo',
    fieldOfStudy: 'Cybersecurity',
    bio: 'Ethical hacker focused on securing the digital world. Open to collaboration!',
    interests: ['Cybersecurity', 'Ethical Hacking', 'CTF', 'Security'],
    profilePicture: 'https://i.pravatar.cc/150?img=15',
    mutualInterests: 1
  },
  {
    id: 8,
    name: 'Amara Okafor',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    university: 'University of Lagos',
    fieldOfStudy: 'Mobile Development',
    bio: 'Mobile app developer creating solutions for African markets. Join me!',
    interests: ['Mobile Dev', 'Flutter', 'Fintech', 'Africa Tech'],
    profilePicture: 'https://i.pravatar.cc/150?img=45',
    mutualInterests: 2
  },
  {
    id: 9,
    name: 'Sophie Laurent',
    country: 'France',
    countryFlag: '🇫🇷',
    university: 'École Polytechnique',
    fieldOfStudy: 'UX Design',
    bio: 'UX/UI designer with a love for human-centered design and accessibility.',
    interests: ['UX Design', 'UI Design', 'Figma', 'Accessibility'],
    profilePicture: 'https://i.pravatar.cc/150?img=48',
    mutualInterests: 3
  }
];

const countries = ['All Countries', 'United States', 'India', 'Singapore', 'Germany', 'Japan', 'Spain', 'Brazil', 'Nigeria', 'France'];
const fieldsOfStudy = ['All Fields', 'Computer Science', 'Data Science', 'Software Engineering', 'Robotics', 'Game Development', 'Cybersecurity', 'Mobile Development', 'UX Design'];
const allInterests = ['AI', 'Machine Learning', 'Web Development', 'Hackathons', 'Data Science', 'Python', 'Research', 'Full Stack', 'React', 'Node.js', 'Blockchain', 'Web3', 'Robotics', 'IoT', 'Game Dev', 'VR/AR', 'Cybersecurity', 'Mobile Dev', 'UX Design'];

const DiscoverStudents = () => {
  const [students, setStudents] = useState(mockStudents);
  const [filteredStudents, setFilteredStudents] = useState(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedField, setSelectedField] = useState('All Fields');
  const [selectedInterest, setSelectedInterest] = useState('All Interests');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filter students based on search and filters
  useEffect(() => {
    let filtered = students;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Country filter
    if (selectedCountry !== 'All Countries') {
      filtered = filtered.filter(student => student.country === selectedCountry);
    }

    // Field of study filter
    if (selectedField !== 'All Fields') {
      filtered = filtered.filter(student => student.fieldOfStudy === selectedField);
    }

    // Interest filter
    if (selectedInterest !== 'All Interests') {
      filtered = filtered.filter(student => student.interests.includes(selectedInterest));
    }

    setFilteredStudents(filtered);
  }, [searchQuery, selectedCountry, selectedField, selectedInterest, students]);

  const handleConnect = (studentId) => {
    // TODO: Implement backend connection logic
    console.log('Connecting with student:', studentId);
    alert('Connection request sent! (Backend integration pending)');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />

      {/* Hero Header with Globe Theme */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl sm:text-9xl">🌍</div>
          <div className="absolute bottom-10 right-10 text-6xl sm:text-9xl">🌎</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-9xl opacity-5">🌏</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-3 sm:gap-4">
              <FaGlobe className="text-4xl sm:text-6xl" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Discover & Connect
              </h1>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl opacity-90">
              Connect with Students Around the World
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
            <input
              type="text"
              placeholder="Search by name, country, or interest..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-sm sm:text-lg shadow-lg"
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 sm:mb-8 bg-white/70 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-lg"
        >
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-800">Filters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Field of Study Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
              >
                {fieldsOfStudy.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>

            {/* Interest Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interest</label>
              <select
                value={selectedInterest}
                onChange={(e) => setSelectedInterest(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
              >
                <option value="All Interests">All Interests</option>
                {allInterests.map(interest => (
                  <option key={interest} value={interest}>{interest}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-sm sm:text-base text-gray-600">
            Found <span className="font-bold text-blue-600">{filteredStudents.length}</span> students
          </p>
        </div>

        {/* Student Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredStudents.map((student) => (
            <motion.div
              key={student.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-white/50"
              onClick={() => setSelectedStudent(student)}
            >
              {/* Profile Picture */}
              <div className="flex items-center mb-4">
                <img
                  src={student.profilePicture}
                  alt={student.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-blue-100 flex-shrink-0"
                />
                <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                  <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">{student.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    {student.countryFlag} {student.country}
                  </p>
                </div>
              </div>

              {/* University and Field */}
              <div className="mb-3">
                <p className="text-xs sm:text-sm text-gray-700 font-medium truncate">{student.university}</p>
                <p className="text-xs text-gray-500 truncate">{student.fieldOfStudy}</p>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">{student.bio}</p>

              {/* Interests Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {student.interests.slice(0, 3).map((interest, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs rounded-full font-medium"
                  >
                    {interest}
                  </span>
                ))}
                {student.interests.length > 3 && (
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                    +{student.interests.length - 3} more
                  </span>
                )}
              </div>

              {/* Mutual Interests Indicator */}
              {student.mutualInterests > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-green-600 font-semibold">
                    ✨ {student.mutualInterests} mutual interest{student.mutualInterests > 1 ? 's' : ''}
                  </p>
                </div>
              )}

              {/* Connect Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleConnect(student.id);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                Connect
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No students found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedStudent(null)}
                className="float-right text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={24} />
              </button>

              {/* Profile Header */}
              <div className="flex items-center mb-6">
                <img
                  src={selectedStudent.profilePicture}
                  alt={selectedStudent.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
                />
                <div className="ml-6">
                  <h2 className="text-3xl font-bold text-gray-800">{selectedStudent.name}</h2>
                  <p className="text-lg text-gray-600">
                    {selectedStudent.countryFlag} {selectedStudent.country}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">University</h3>
                <p className="text-gray-600">{selectedStudent.university}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Field of Study</h3>
                <p className="text-gray-600">{selectedStudent.fieldOfStudy}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">About</h3>
                <p className="text-gray-600">{selectedStudent.bio}</p>
              </div>

              {/* All Interests */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connect Button */}
              <button
                onClick={() => {
                  handleConnect(selectedStudent.id);
                  setSelectedStudent(null);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-lg"
              >
                Send Connection Request
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscoverStudents;
