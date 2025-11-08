const axios = require('axios');

/**
 * Service to fetch events from external APIs
 * Supports: Meetup, Eventbrite, Luma, Devfolio
 */

class ExternalEventService {
  constructor() {
    this.meetupApiKey = process.env.MEETUP_API_KEY;
    this.eventbriteApiKey = process.env.EVENTBRITE_API_KEY;
    this.lumaApiKey = process.env.LUMA_API_KEY;
    this.devfolioApiKey = process.env.DEVFOLIO_API_KEY;
  }

  /**
   * Fetch events from Meetup.com
   * Docs: https://www.meetup.com/api/
   */
  async fetchMeetupEvents(latitude, longitude, radius = 50) {
    try {
      if (!this.meetupApiKey) {
        console.log('⚠️ Meetup API key not configured');
        return [];
      }

      const response = await axios.get('https://api.meetup.com/find/events', {
        params: {
          lat: latitude,
          lon: longitude,
          radius: radius,
          fields: 'featured_photo,group_photo',
        },
        headers: {
          'Authorization': `Bearer ${this.meetupApiKey}`,
        },
      });

      return response.data.map(event => this.normalizeMeetupEvent(event));
    } catch (error) {
      console.error('❌ Error fetching Meetup events:', error.message);
      return [];
    }
  }

  /**
   * Fetch events from Eventbrite
   * Docs: https://www.eventbrite.com/platform/api
   */
  async fetchEventbriteEvents(latitude, longitude, radius = 50) {
    try {
      if (!this.eventbriteApiKey) {
        console.log('⚠️ Eventbrite API key not configured');
        return [];
      }

      const response = await axios.get('https://www.eventbriteapi.com/v3/events/search/', {
        params: {
          'location.latitude': latitude,
          'location.longitude': longitude,
          'location.within': `${radius}km`,
          'categories': '102,103', // Technology, Science & Tech
          expand: 'venue,organizer',
        },
        headers: {
          'Authorization': `Bearer ${this.eventbriteApiKey}`,
        },
      });

      return response.data.events.map(event => this.normalizeEventbriteEvent(event));
    } catch (error) {
      console.error('❌ Error fetching Eventbrite events:', error.message);
      return [];
    }
  }

  /**
   * Fetch events from Luma
   * Docs: https://docs.lu.ma/
   */
  async fetchLumaEvents(latitude, longitude, radius = 50) {
    try {
      if (!this.lumaApiKey) {
        console.log('⚠️ Luma API key not configured');
        return [];
      }

      // Note: Luma API endpoint - adjust based on actual API documentation
      const response = await axios.get('https://api.lu.ma/public/v1/calendar/list-events', {
        params: {
          lat: latitude,
          lng: longitude,
          radius_km: radius,
        },
        headers: {
          'x-luma-api-key': this.lumaApiKey,
        },
      });

      return response.data.entries.map(event => this.normalizeLumaEvent(event));
    } catch (error) {
      console.error('❌ Error fetching Luma events:', error.message);
      return [];
    }
  }

  /**
   * Fetch hackathons from Devfolio
   * Docs: https://devfolio.co/api
   */
  async fetchDevfolioHackathons() {
    try {
      if (!this.devfolioApiKey) {
        console.log('⚠️ Devfolio API key not configured');
        return [];
      }

      // Note: Devfolio uses GraphQL API
      const query = `
        query {
          hackathons(first: 50, status: UPCOMING) {
            edges {
              node {
                id
                name
                description
                startsAt
                endsAt
                location
                registrationDeadline
                maxTeamSize
                website
              }
            }
          }
        }
      `;

      const response = await axios.post('https://api.devfolio.co/graphql', 
        { query },
        {
          headers: {
            'Authorization': `Bearer ${this.devfolioApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.data.hackathons.edges.map(edge => 
        this.normalizeDevfolioEvent(edge.node)
      );
    } catch (error) {
      console.error('❌ Error fetching Devfolio hackathons:', error.message);
      return [];
    }
  }

  /**
   * Normalize Meetup event to our schema
   */
  normalizeMeetupEvent(event) {
    return {
      external_id: `meetup_${event.id}`,
      source: 'Meetup',
      title: event.name,
      description: event.description || '',
      type: this.categorizeEventType(event.name, event.description),
      start_at: new Date(event.time),
      end_at: new Date(event.time + (event.duration || 3 * 60 * 60 * 1000)), // Default 3 hours
      latitude: event.venue?.lat || event.group.lat,
      longitude: event.venue?.lon || event.group.lon,
      city: event.venue?.city || event.group.city,
      external_url: event.link,
      max_participants: event.rsvp_limit || null,
      image_url: event.featured_photo?.photo_link || event.group_photo?.photo_link,
    };
  }

  /**
   * Normalize Eventbrite event to our schema
   */
  normalizeEventbriteEvent(event) {
    return {
      external_id: `eventbrite_${event.id}`,
      source: 'Eventbrite',
      title: event.name.text,
      description: event.description.text || '',
      type: this.categorizeEventType(event.name.text, event.description.text),
      start_at: new Date(event.start.utc),
      end_at: new Date(event.end.utc),
      latitude: event.venue?.latitude || 0,
      longitude: event.venue?.longitude || 0,
      city: event.venue?.address?.city || '',
      external_url: event.url,
      max_participants: event.capacity || null,
      image_url: event.logo?.url,
    };
  }

  /**
   * Normalize Luma event to our schema
   */
  normalizeLumaEvent(event) {
    return {
      external_id: `luma_${event.api_id}`,
      source: 'Luma',
      title: event.name,
      description: event.description || '',
      type: this.categorizeEventType(event.name, event.description),
      start_at: new Date(event.start_at),
      end_at: new Date(event.end_at),
      latitude: event.geo_latitude || 0,
      longitude: event.geo_longitude || 0,
      city: event.geo_address_info?.city || '',
      external_url: event.url,
      max_participants: event.capacity || null,
      image_url: event.cover_url,
    };
  }

  /**
   * Normalize Devfolio event to our schema
   */
  normalizeDevfolioEvent(event) {
    // For Devfolio, we might need to geocode the location
    return {
      external_id: `devfolio_${event.id}`,
      source: 'Devfolio',
      title: event.name,
      description: event.description || '',
      type: 'Hackathon', // Devfolio is primarily hackathons
      start_at: new Date(event.startsAt),
      end_at: new Date(event.endsAt),
      latitude: 0, // Would need geocoding service
      longitude: 0, // Would need geocoding service
      city: event.location || '',
      external_url: event.website,
      max_participants: event.maxTeamSize || null,
      image_url: null,
    };
  }

  /**
   * Categorize event type based on title and description
   */
  categorizeEventType(title, description) {
    const text = `${title} ${description}`.toLowerCase();
    
    if (text.match(/hackathon|hack/i)) return 'Hackathon';
    if (text.match(/workshop|training|course/i)) return 'Workshop';
    if (text.match(/ai|machine learning|ml|artificial intelligence/i)) return 'AI Workshop';
    if (text.match(/meetup|networking|community/i)) return 'Meetup';
    
    return 'Meetup'; // Default
  }

  /**
   * Fetch events from all sources
   */
  async fetchAllEvents(latitude, longitude, radius = 50) {
    console.log('🌍 Fetching events from Eventbrite...');
    
    // Only fetch from Eventbrite since we only have that API key
    const eventbriteEvents = await this.fetchEventbriteEvents(latitude, longitude, radius);

    console.log(`✅ Fetched ${eventbriteEvents.length} events from Eventbrite`);
    return eventbriteEvents;
  }
}

module.exports = new ExternalEventService();
