# External Event APIs Integration Guide

This guide helps you integrate real-time event data from Meetup, Eventbrite, Luma, and Devfolio into your UniVerse Connect application.

## 🔑 Getting API Keys

### 1. **Meetup API**
- **Website:** https://www.meetup.com/api/
- **How to get key:**
  1. Go to https://www.meetup.com/api/
  2. Sign up for a Meetup account
  3. Create an OAuth Consumer
  4. Get your API key
- **Cost:** Free tier available (200 requests/hour)
- **Documentation:** https://www.meetup.com/api/guide

### 2. **Eventbrite API**
- **Website:** https://www.eventbrite.com/platform/api
- **How to get key:**
  1. Go to https://www.eventbrite.com/account-settings/apps
  2. Create a new app
  3. Get your Private Token (API key)
- **Cost:** Free for public events
- **Documentation:** https://www.eventbrite.com/platform/docs/introduction

### 3. **Luma API**
- **Website:** https://lu.ma/api
- **How to get key:**
  1. Go to https://lu.ma/
  2. Contact Luma for API access
  3. Request API credentials
- **Cost:** Contact Luma for pricing
- **Documentation:** https://docs.lu.ma/

### 4. **Devfolio API**
- **Website:** https://devfolio.co/api
- **How to get key:**
  1. Visit https://devfolio.co/
  2. Contact Devfolio team for API access
  3. Request GraphQL API credentials
- **Cost:** Free for hackathon listings
- **Documentation:** Contact Devfolio team

---

## 📝 Setup Instructions

### Step 1: Add API Keys to .env file

Open `backend/.env` and add your API keys:

```env
# External Event API Keys
MEETUP_API_KEY=your-meetup-api-key-here
EVENTBRITE_API_KEY=your-eventbrite-private-token-here
LUMA_API_KEY=your-luma-api-key-here
DEVFOLIO_API_KEY=your-devfolio-api-key-here
```

### Step 2: Test Without API Keys (Optional)

The integration is designed to work even without API keys. External events will simply be skipped if keys are not configured.

### Step 3: Restart Backend Server

After adding API keys:

```powershell
# Stop the current backend server (Ctrl+C)
# Then restart it
cd backend
node server.js
```

---

## 🧪 Testing the Integration

### Test in Dashboard

1. Go to http://localhost:5173/dashboard
2. Events will now include:
   - 🏠 Your local events (from database)
   - 🌐 External events (from Meetup, Eventbrite, Luma, Devfolio)

3. External events will have a badge showing their source (e.g., "🌐 Meetup")

### Test API Endpoint

Test the API directly:

```bash
# Get events with external sources
curl "http://localhost:5001/api/events?lat=12.9716&lng=77.5946&radius=50&includeExternal=true"

# Get events without external sources
curl "http://localhost:5001/api/events?lat=12.9716&lng=77.5946&radius=50&includeExternal=false"
```

---

## 🎨 Features

### What's Included:

✅ **Automatic Event Aggregation** - Combines events from multiple sources
✅ **Smart Type Categorization** - AI-based event type detection
✅ **Distance Filtering** - Shows events within your selected radius
✅ **Type Filtering** - Filter by Hackathon, Workshop, Meetup, AI Workshop
✅ **External Event Badges** - Visual indicators for external events
✅ **Direct Links** - Quick links to original event pages
✅ **Fallback Support** - Works even without API keys

---

## 🔧 Customization

### Add More Event Sources

To add more event sources, edit:
`backend/src/services/external-events.service.js`

Add a new method like:

```javascript
async fetchYourPlatformEvents(latitude, longitude, radius) {
  // Your implementation
}
```

### Modify Event Categorization

Edit the `categorizeEventType` method in:
`backend/src/services/external-events.service.js`

---

## 📊 Rate Limits & Best Practices

### Meetup
- 200 requests/hour (free tier)
- Cache results for 15-30 minutes

### Eventbrite
- 1000 requests/hour (free tier)
- Use pagination for large results

### Luma & Devfolio
- Check with providers for limits

### Recommended: Add Caching

Consider adding Redis caching to reduce API calls:

```javascript
// Example with node-cache
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 1800 }); // 30 minutes

// In your service
const cacheKey = `events_${lat}_${lng}_${radius}`;
const cached = cache.get(cacheKey);
if (cached) return cached;

// ... fetch from APIs ...
cache.set(cacheKey, events);
```

---

## 🐛 Troubleshooting

### Issue: No external events showing

**Solution:**
1. Check if API keys are set in `.env`
2. Check backend console for error messages
3. Verify API keys are valid
4. Check if `includeExternal=true` in API call

### Issue: "API key not configured" warnings

**Solution:**
This is normal if you haven't added all API keys. The app will work with whichever APIs you have configured.

### Issue: External events have wrong coordinates

**Solution:**
Some APIs (like Devfolio) don't provide coordinates. You may need to:
1. Use a geocoding service (Google Maps Geocoding API)
2. Add geocoding to the `normalizeDevfolioEvent` method

---

## 📈 Next Steps

1. **Get API keys** from the platforms you want to integrate
2. **Add keys to .env** file
3. **Restart backend server**
4. **Test in dashboard**
5. **Customize event categorization** if needed
6. **Add caching** for production use

---

## 💡 Pro Tips

- Start with one API (recommend Eventbrite - easiest to get)
- Test each API separately before combining
- Monitor your API usage to avoid rate limits
- Cache external events to improve performance
- Add error handling for API failures

---

## 🆘 Need Help?

If you encounter issues:
1. Check backend console logs
2. Check browser console
3. Verify API keys are correct
4. Test API endpoints directly with curl/Postman
5. Check API provider documentation

Good luck! 🚀
