import React from 'react';
import { CalendarCheck, Droplet, Leaf, BookOpen } from 'lucide-react';

const resources = [
  {
    icon: <CalendarCheck className="w-8 h-8 text-green-600" />,
    title: 'Planting Calendar',
    description: 'Find the best planting times for your zone and crop type.',
  },
  {
    icon: <Droplet className="w-8 h-8 text-green-600" />,
    title: 'Watering Guide',
    description: 'Learn optimal watering schedules to prevent over/underwatering.',
  },
  {
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    title: 'Soil Health Tips',
    description: 'Improve your soil with natural compost and mulching techniques.',
  },
  {
    icon: <BookOpen className="w-8 h-8 text-green-600" />,
    title: 'Gardening eBooks',
    description: 'Free PDFs and ebooks for beginner to advanced gardeners.',
  },
];

export default function ToolsResources() {
  return (
    <section className="py-14 bg-green-50 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-800">
          🌱 Gardening Tools & Resources
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {resources.map((tool, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center"
            >
              <div className="flex justify-center mb-4">{tool.icon}</div>
              <h3 className="text-lg font-semibold text-green-700">{tool.title}</h3>
              <p className="text-gray-600 mt-2">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
