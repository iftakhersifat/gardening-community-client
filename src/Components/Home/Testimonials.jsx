import React from 'react';
import { Quote } from 'lucide-react';
import { Zoom, Fade } from 'react-awesome-reveal';

const testimonials = [
  {
    name: 'Emma Leaf',
    message:
      'This platform transformed my balcony into a green haven. The community support is incredible!',
    location: 'Brooklyn, NY',
  },
  {
    name: 'David Sprout',
    message:
      'I never thought urban gardening could be this easy. Great tips and active members!',
    location: 'San Francisco, CA',
  },
  {
    name: 'Ava Greenfield',
    message:
      'The events and tutorials are top-notch. Highly recommend for beginners and experts alike.',
    location: 'Chicago, IL',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-green-50 mt-10 py-14 px-4 rounded-xl">
      <div className="max-w-5xl mx-auto text-center">
        {/* Animated heading */}
        <Zoom triggerOnce={false} duration={1000}>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 flex items-center justify-center gap-2 text-green-800">
            <Quote className="w-6 h-6 text-green-600" />
            What Gardeners Are Saying
          </h2>
        </Zoom>

        {/* Animated testimonial cards */}
        <Fade
          cascade
          damping={0.15}
          direction="up"
          triggerOnce={false}
          duration={1200}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="italic text-gray-700 mb-4">"{t.message}"</p>
                <div className="text-green-800 font-semibold">{t.name}</div>
                <div className="text-sm text-gray-500">{t.location}</div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}
