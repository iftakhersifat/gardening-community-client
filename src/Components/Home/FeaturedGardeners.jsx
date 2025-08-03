import React, { useEffect, useState } from 'react';
import { Zoom, Fade } from 'react-awesome-reveal';

const FeaturedGardeners = () => {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    fetch("gardeners.json")
      .then(res => res.json())
      .then(data => {
        const active = data.filter(g => g.status === 'active');
        setGardeners(active);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Heading*/}
      <Zoom triggerOnce={false} duration={1500}>
        <h1 className="text-4xl font-bold text-center text-green-600 mb-6 tracking-tight">Meet Our Active Gardeners</h1>
        <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">Explore the profiles of passionate gardeners actively contributing to our green community.</p>
      </Zoom>

      {/* Cards */}
      <Fade cascade damping={0.1} triggerOnce={false} duration={1000}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {gardeners.map(g => (
            <div key={g.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center border border-green-100">
              <img src={g.avatar} alt={g.name} className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-green-500 mb-4"/>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{g.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">{g.location}</p>
              <span className="inline-block mt-3 px-4 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full shadow-sm">Active Gardener</span>
            </div>
          ))}
        </div>
      </Fade>
    </div>
  );
};

export default FeaturedGardeners;
