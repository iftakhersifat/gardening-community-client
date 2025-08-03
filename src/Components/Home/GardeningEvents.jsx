import React from 'react';
import { MapPin, CalendarDays, Users } from 'lucide-react';
import { Fade, Zoom } from 'react-awesome-reveal';

const events = [
  {
    title: 'Spring Plant Swap',
    date: 'June 10, 2025',
    location: 'Greenview Community Park, Seattle',
    attendees: 42,
    image: '/assets/event-1.jpg',
  },
  {
    title: 'Urban Composting Workshop',
    date: 'June 15, 2025',
    location: 'GrowHub Center, Austin',
    attendees: 28,
    image: '/assets/event-2.jpg',
  },
  {
    title: 'Kids Gardening Day',
    date: 'June 22, 2025',
    location: 'Botanic Garden, Portland',
    attendees: 65,
    image: '/assets/event-3.jpg',
  },
];

export default function GardeningEvents() {
  return (
    <section className="py-14 bg-green-50 rounded-xl px-4 mt-10">
      <div className="max-w-6xl mx-auto">

<<<<<<< HEAD
        {/* Animated heading  */}
        <Zoom triggerOnce={false} duration={1200}>
          <h2 className="text-4xl font-bold text-center mb-2 text-green-800">Join a Local Gardening Event</h2>
          <p className="text-center text-gray-600 text-lg mb-10 max-w-2xl mx-auto">Explore upcoming gardening events in your area. Connect, learn, and grow with your community!
          </p>
        </Zoom>

        {/* Event cards animation */}
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Fade direction="up" triggerOnce={false} duration={800} delay={index * 100} key={index}>
=======
        {/* Animated heading and subtitle */}
        <Zoom triggerOnce={false} duration={1200}>
          <h2 className="text-4xl font-bold text-center mb-2 text-green-800">
            🌿 Join a Local Gardening Event
          </h2>
          <p className="text-center text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Explore upcoming gardening events in your area. Connect, learn, and grow with your community!
          </p>
        </Zoom>

        {/* Event cards with fade animation */}
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Fade
              direction="up"
              triggerOnce={false}
              duration={800}
              delay={index * 100}
              key={index}
            >
>>>>>>> f47b951601310ca28955233f7c1ecf9df02464e8
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
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
                  <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-full transition duration-200 transform hover:scale-105 shadow-sm hover:shadow-lg">
                    Reserve Spot
                  </button>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
