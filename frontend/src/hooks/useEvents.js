import { useState, useEffect } from 'react';
import { eventService } from '../services/eventService';
import { useGeolocation } from './useGeolocation';

export const useEvents = (radius = 500, type = null) => {
  const { location } = useGeolocation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!location) {
        console.warn('⚠️ No location available yet, skipping event fetch');
        return;
      }

      console.log('🌍 Fetching events with:', { location, radius, type });
      setLoading(true);
      try {
        const response = await eventService.getEvents(
          location.latitude,
          location.longitude,
          radius,
          type
        );
        console.log('📡 Raw API response:', response);
        
        // Backend returns { success: true, data: [...events] }
        // eventService already returns response.data, so we access .data here
        const eventsData = response.data || [];
        console.log('✅ Events received:', eventsData.length, 'events');
        
        setEvents(eventsData);
        setError(null);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch events';
        setError(errorMessage);
        console.error('❌ Error fetching events:', err);
        console.error('❌ Error details:', {
          message: errorMessage,
          response: err.response?.data,
          status: err.response?.status
        });
        setEvents([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [location, radius, type]);

  return { events, loading, error };
};
