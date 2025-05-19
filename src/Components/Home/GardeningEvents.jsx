import React from 'react';
import { MapPin, CalendarDays, Users } from 'lucide-react';

const events = [
  {
    title: 'Spring Plant Swap',
    date: 'June 10, 2025',
    location: 'Greenview Community Park, Seattle',
    attendees: 42,
    image: '/assets/event1.jpg',
  },
  {
    title: 'Urban Composting Workshop',
    date: 'June 15, 2025',
    location: 'GrowHub Center, Austin',
    attendees: 28,
    image: '/assets/event2.jpg',
  },
  {
    title: 'Kids Gardening Day',
    date: 'June 22, 2025',
    location: 'Botanic Garden, Portland',
    attendees: 65,
    image: '/assets/event3.jpg',
  },
];

export default function GardeningEvents() {
  return (
    <section className="py-14 bg-green-100 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-800">
          🌿 Join a Local Gardening Event
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-green-700">{event.title}</h3>
                <div className="mt-3 flex items-center text-sm text-gray-600 gap-2">
                  <CalendarDays className="w-4 h-4" /> {event.date}
                </div>
                <div className="flex items-center text-sm text-gray-600 gap-2 mt-1">
                  <MapPin className="w-4 h-4" /> {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-600 gap-2 mt-1">
                  <Users className="w-4 h-4" /> {event.attendees} going
                </div>
                <button className="mt-4 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full">
                  Reserve Spot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
