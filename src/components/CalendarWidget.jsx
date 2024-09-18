import React, { useEffect, useState } from 'react';
import Widget from './Widget';
import { fetchCalendarEvents } from '../api/calendarApi';

const CalendarWidget = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await fetchCalendarEvents();
        setEvents(eventsData);
      } catch (err) {
        setError('Failed to load calendar events');
        console.error(err);
      }
    };

    loadEvents();
  }, []);

  return (
    <Widget title="Calendar">
      {error ? (
        <div className="text-red-500 font-bold">{error}</div>
      ) : events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event, index) => (
            <li key={index} className="border-b pb-2">
              <h3 className="text-lg font-bold text-teal-600">{event.title}</h3>
              <p className="text-gray-600 text-sm">{new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-500 text-xs">
                {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No events available</p>
      )}
    </Widget>
  );
};

export default CalendarWidget;
