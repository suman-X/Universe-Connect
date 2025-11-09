import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      'Hackathon': 'bg-purple-100 text-purple-800',
      'Workshop': 'bg-blue-100 text-blue-800',
      'Meetup': 'bg-green-100 text-green-800',
      'AI Workshop': 'bg-orange-100 text-orange-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card hover onClick={() => navigate(`/events/${event.id}`)}>
      <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 break-words">{event.title}</h3>
          {event.is_external && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">
              🌐 {event.source || 'External Event'}
            </span>
          )}
        </div>
        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${getEventTypeColor(event.type)}`}>
          {event.type}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {event.description}
      </p>

      <div className="space-y-2 text-xs sm:text-sm text-gray-600">
        <div className="flex items-center">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="truncate">{formatDate(event.start_at)}</span>
        </div>

        <div className="flex items-center">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{event.city} • {event.distance ? `${event.distance.toFixed(1)} km away` : 'Distance N/A'}</span>
        </div>

        {event.organizer_name && (
          <div className="flex items-center">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="truncate">{event.organizer_name}</span>
          </div>
        )}

        {event.external_url && (
          <a 
            href={event.external_url} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-xs break-all"
          >
            View on {event.source} →
          </a>
        )}
      </div>
    </Card>
  );
};

export default EventCard;
