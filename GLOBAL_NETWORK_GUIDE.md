# 🌍 Global Network Feature - Complete Guide

## ✅ What We Built

The Global Network feature allows users to discover and connect with students from around the world!

### Features Implemented:

1. **Interactive World Map** 🗺️
   - Shows all users on a Leaflet map
   - Custom markers for current user (blue) and other users (green)
   - Click markers to see user details

2. **Advanced Filtering** 🔍
   - Search by name or university
   - Filter by skills (20+ tech skills)
   - Distance-based filtering (10km to 1000km radius)
   - Real-time filter application

3. **User Discovery** 👥
   - View all users in a scrollable list
   - See user profiles with bio, skills, university
   - Distance calculation from your location
   - User profile modal with full details

4. **Statistics Dashboard** 📊
   - Total users found
   - Unique skills across network
   - Number of universities represented

## 🚀 How to Access

1. **Login** to your Universe Connect account
2. Click **"Global Network"** in the navbar
3. The page will load with all users displayed on the world map

## 📍 Sample Users Added

We added 10 users from around the world:

| Username | University | Location | Skills |
|----------|-----------|----------|---------|
| alice_mit | MIT | Boston, USA | JavaScript, React, ML |
| bob_stanford | Stanford | California, USA | Python, Node.js |
| charlie_oxford | Oxford | UK | ML, Python, Data Science |
| diana_tokyo | U-Tokyo | Japan | Mobile Dev, IoT |
| eve_iitb | IIT Bombay | India | Blockchain, Data Science |
| frank_sydney | U-Sydney | Australia | Game Dev, AR/VR |
| grace_ethz | ETH Zurich | Switzerland | Cybersecurity, Cloud |
| henry_toronto | U-Toronto | Canada | Backend, Cloud, Node.js |
| iris_sorbonne | Sorbonne | Paris, France | UI/UX, Frontend, React |
| jack_nus | NUS | Singapore | DevOps, Cloud, Docker |

**Login credentials for testing:**
- Username: Any of the above (e.g., `bob_stanford`)
- Password: `password123`

## 🎨 User Interface

### Filter Panel
- **Collapsible** - Click "Show/Hide Filters" to expand/collapse
- **Active Filters Summary** - Shows applied filters when collapsed
- **Quick Reset** - Clear all filters with one click

### Map View
- **Zoom Controls** - Mouse wheel or +/- buttons
- **Popup Details** - Click markers to see user info
- **Distance Display** - Shows km distance from you (if you have coordinates)

### User List
- **Scrollable Panel** - Browse all users
- **Click to View Profile** - Opens detailed modal
- **Skill Tags** - Visual display of user skills
- **Distance Badge** - Shows proximity to each user

## 🔧 Technical Details

### Backend Routes
- `GET /api/users/global-network` - Get all users with filters
  - Query params: `search`, `skills`, `radius`, `userLat`, `userLon`
- `GET /api/users/:id` - Get specific user profile
- `GET /api/users/nearby` - Get nearby users
- `PUT /api/users/profile` - Update user profile

### Frontend Components
- **Page**: `frontend/src/pages/GlobalNetwork.jsx`
- **Service**: `frontend/src/services/userService.js`
- **Route**: `/global-network` (protected)

### Database Schema Updates
- Added `university` column (VARCHAR) to users table
- Added `bio` column (TEXT) to users table
- Existing: `latitude`, `longitude` for geolocation
- Existing: `user_skills` junction table for skills

## 🎯 How to Use Filters

### 1. Search Users
```
Type in the search box: "alice" or "MIT"
Click "Apply Filters"
```

### 2. Filter by Skills
```
Click skill tags like "React", "Python", "Machine Learning"
Selected skills turn blue
Click "Apply Filters"
```

### 3. Distance Filter
```
Select distance from dropdown (e.g., "Within 100 km")
Requires your account to have latitude/longitude
Click "Apply Filters"
```

### 4. Combine Filters
```
You can combine search + skills + distance!
Example: Search "stanford" + Skills "Python" + Within 500km
```

### 5. Reset Filters
```
Click "Reset" button to clear all filters
Or click individual filter tags to remove them
```

## 🌟 Key Features

### Distance Calculation
- Uses Haversine formula for accurate distance
- Displays in kilometers with 1 decimal place
- Only shows if both users have coordinates

### User Profile Modal
- Full name, email, university
- Complete bio
- All skills with visual tags
- Distance from you
- Connect button (coming soon)

### Responsive Design
- Desktop: Side-by-side map and user list
- Mobile: Stacked layout (map on top)
- Touch-friendly controls

## 🐛 Troubleshooting

### No users showing?
- Make sure you're logged in
- Check if backend is running on port 5001
- Try resetting filters

### Map not loading?
- Check browser console for errors
- Ensure Leaflet CSS is loaded
- Try refreshing the page

### Distance not showing?
- Your account needs latitude/longitude
- Register with "Get My Location" enabled
- Or update profile with coordinates

## 📱 Next Steps

Future enhancements planned:
- [ ] Direct messaging between users
- [ ] Connection requests (like LinkedIn)
- [ ] Filter by events attended
- [ ] Filter by teams joined
- [ ] Export user list as CSV
- [ ] User recommendations based on AI
- [ ] Real-time online status

## 🎉 Testing Checklist

- [x] Navigate to /global-network
- [x] See world map with user markers
- [x] Click on user markers
- [x] View user profile modal
- [x] Apply search filter
- [x] Apply skill filters
- [x] Apply distance filter
- [x] Reset filters
- [x] See statistics update
- [x] Responsive on mobile

## 📝 Notes

- All sample users have password: `password123`
- Skills are linked to the existing skills table
- Distance calculation requires both users to have valid coordinates
- Maximum 500 users returned per query (for performance)

---

**Enjoy connecting with students worldwide! 🌍✨**
