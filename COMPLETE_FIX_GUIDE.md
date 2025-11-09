# 🚀 UniVerse Connect - Complete Startup & Fix Guide

## 📋 ISSUES DIAGNOSED & FIXED

### ✅ Issue 1: Login Failed
**Status:** FIXED
**Root Cause:** Environment variables not loading properly
**Solution:** Created `start.js` with proper env loading

### ⚠️ Issue 2: Events Not Loading  
**Status:** FIXING NOW
**Root Cause:** Backend server not staying running
**Solution:** Use batch file to keep server alive

---

## 🔧 STEP-BY-STEP FIX & STARTUP GUIDE

### Step 1: Start Docker (Database)
```bash
# Make sure Docker Desktop is running
# Check if database container is running:
docker ps

# You should see: universe_connect_db
```

###Step 2: Start Backend Server

**IMPORTANT:** The backend server must stay running in a separate window!

**Windows - Use Batch File (RECOMMENDED):**
1. Navigate to: `backend/run-backend.bat`
2. Double-click the file
3. A command window will open and stay open
4. You should see:
   ```
   ✅ Connected to PostgreSQL database
   🚀 Server running on http://localhost:5001
   ```
5. **KEEP THIS WINDOW OPEN!**

**Alternative - Manual Start:**
```bash
cd backend
node start.js
# Keep this terminal open!
```

### Step 3: Start Frontend Server

**In a NEW terminal:**
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x ready in XXX ms
➜ Local:   http://localhost:5173/
```

### Step 4: Test the Application

1. **Open browser:** http://localhost:5173
2. **Login with test account:**
   - Email: `bob@stanford.edu`
   - Password: `password123`
3. **Open Browser Console (F12)** to see debug logs
4. **Navigate to Dashboard** - you should see events!

---

## 🐛 DEBUGGING CHECKLIST

### If Login Fails:

1. **Check backend is running:**
   ```bash
   netstat -ano | findstr ":5001"
   # Should show: LISTENING
   ```

2. **Check backend logs:**
   - Look at the backend terminal window
   - Should see: `Login attempt for email: ...`

3. **Check browser console:**
   - Press F12
   - Look for error messages
   - Should see: 200 OK response

### If Events Don't Load:

1. **Check browser console (F12):**
   - Look for logs starting with 🌍 📡 ✅
   - Check for error messages

2. **Verify location:**
   - Console should show: `📍 Location: { latitude: ..., longitude: ... }`
   - Default is Bangalore: `12.9716, 77.5946`

3. **Check events API:**
   ```bash
   curl http://localhost:5001/api/events?lat=12.9716&lng=77.5946&radius=500
   ```
   Should return JSON with events

4. **Check network tab in browser:**
   - Open DevTools → Network tab
   - Filter: XHR
   - Look for `/api/events` request
   - Check response

---

## 🔍 DETAILED DIAGNOSTICS

### Test Backend Manually

**Test Database:**
```bash
cd backend
node check-events.js
```

**Expected output:**
```
✅ Connected to PostgreSQL database
Total events in database: 15
```

**Test Full System:**
```bash
cd backend
node system-test.js
```

**Expected output:**
```
✅ Database connected
✅ Login endpoint working  
✅ Events endpoint working
```

### Check Frontend API Calls

**In browser console (F12):**
```javascript
// Check if location is set
// Should see debug logs from Dashboard.jsx:
📍 Location: {latitude: 12.9716, longitude: 77.5946}
🎯 Selected Radius: 500
🏷️ Selected Type: null
📊 Events: Array(15)
```

---

## 📁 FILES MODIFIED

### Backend Files Created/Modified:
1. ✅ `backend/start.js` - Proper env loading + server startup
2. ✅ `backend/run-backend.bat` - Easy startup script
3. ✅ `backend/check-events.js` - Database test script
4. ✅ `backend/system-test.js` - Full system test
5. ✅ `backend/server.js` - Removed duplicate dotenv
6. ✅ `backend/src/config/database.js` - Removed duplicate dotenv

### Frontend Files Modified:
1. ✅ `frontend/src/hooks/useEvents.js` - Added detailed logging & error handling
2. ✅ `frontend/src/pages/Dashboard.jsx` - Added debug logging
3. ✅ `frontend/src/pages/Home.jsx` - Added navbar + debug info
4. ✅ `frontend/src/pages/DiscoverStudents.jsx` - NEW PAGE created

---

## 🎯 EXPECTED BEHAVIOR

### After Login:
1. Redirected to Dashboard
2. See loading spinner briefly
3. Map loads with event markers
4. Event cards appear on the right
5. Can filter by distance and type

### Console Logs (F12):
```
📍 Location: {latitude: 12.9716, longitude: 77.5946}
🌍 Fetching events with: {location: {...}, radius: 500, type: null}
📡 Raw API response: {success: true, data: Array(15)}
✅ Events received: 15 events
```

### If No Events:
- Check the debug info shown on page
- Should show your coordinates
- Should show search radius
- Any error will be displayed

---

## 🆘 COMMON ISSUES & SOLUTIONS

### Issue: "Unable to connect to server"
**Solution:** Backend not running
```bash
# Check if running:
netstat -ano | findstr ":5001"

# If not, start it:
backend/run-backend.bat
```

### Issue: "No events found"
**Possible causes:**
1. Location too far from Bangalore (all events are there)
2. Radius too small (try "Worldwide")
3. Event type filter excluding all events

**Solution:**
- Set radius to "Worldwide"
- Clear event type filter
- Check console for actual location coordinates

### Issue: Backend starts then immediately stops
**Solution:** 
- Use the batch file: `backend/run-backend.bat`
- Don't use `run_in_terminal` with `isBackground: true`
- Keep the terminal window open

---

## ✅ VERIFICATION STEPS

Run these commands to verify everything is working:

```bash
# 1. Check Docker
docker ps
# Expected: universe_connect_db (healthy)

# 2. Check Backend
netstat -ano | findstr ":5001"
# Expected: LISTENING on port 5001

# 3. Test Database
cd backend && node check-events.js
# Expected: 15 events found

# 4. Test Backend API
cd backend && node system-test.js
# Expected: All tests pass

# 5. Check Frontend
netstat -ano | findstr ":5173"
# Expected: LISTENING on port 5173
```

---

## 🎉 SUCCESS CRITERIA

You'll know everything is working when:

- ✅ Backend terminal shows: `🚀 Server running on http://localhost:5001`
- ✅ Frontend terminal shows: `➜ Local: http://localhost:5173/`
- ✅ Login successful - redirects to Dashboard
- ✅ Dashboard shows 15 events (or filtered amount)
- ✅ Can click events to see details
- ✅ Map shows event markers
- ✅ Filters work (distance & type)

---

## 📞 STILL HAVING ISSUES?

If problems persist, run the diagnostic and send me:

1. Output of `node backend/system-test.js`
2. Screenshot of browser console (F12)
3. Screenshot of Network tab showing `/api/events` request
4. Backend terminal output

This will help identify the exact issue!
