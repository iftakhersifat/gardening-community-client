import React, { useEffect, useState, useRef } from 'react';

const NUM_LEAVES = 20;

const generateLeaves = () => {
  return Array.from({ length: NUM_LEAVES }).map(() => ({
    size: 20 + Math.random() * 40, // 20 to 60px
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    speedX: 0.2 + Math.random() * 0.4, // horizontal speed
    speedY: 0.1 + Math.random() * 0.3, // vertical speed
    opacity: 0.1 + Math.random() * 0.2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 0.2, // rotation direction and speed
  }));
};

const ExploreWithBackground = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation data for cards
  const animDataRef = useRef([]);
  // Leaves animation data
  const leaves = useRef(generateLeaves());
  const animationFrameId = useRef();

  // Re-render trigger for card animations
  const [, setTick] = useState(0);

  useEffect(() => {
    fetch('gardeners.json')
      .then(res => res.json())
      .then(data => {
        setGardeners(data);
        setLoading(false);

        animDataRef.current = data.map(() => ({
          speed: Math.random() * 0.02 + 0.01,
          direction: Math.random() > 0.5 ? 1 : -1,
          phase: Math.random() * 2 * Math.PI,
        }));
      })
      .catch(err => {
        console.error('Error loading gardeners:', err);
        setLoading(false);
      });
  }, []);

  // Animation loop for both leaves and cards
  useEffect(() => {
    const animate = () => {
      // Animate cards' floating
      animDataRef.current.forEach((anim) => {
        anim.phase += anim.speed * anim.direction;
        if (anim.phase > 2 * Math.PI) anim.phase -= 2 * Math.PI;
        else if (anim.phase < 0) anim.phase += 2 * Math.PI;
      });
      setTick(tick => tick + 1);

      // Animate leaves floating
      leaves.current.forEach((leaf) => {
        leaf.x += leaf.speedX;
        leaf.y += leaf.speedY;
        leaf.rotation += leaf.rotationSpeed;

        // Wrap leaves around screen
        if (leaf.x > window.innerWidth) leaf.x = -leaf.size;
        if (leaf.y > window.innerHeight) leaf.y = -leaf.size;
        if (leaf.rotation > 360) leaf.rotation -= 360;
        if (leaf.rotation < 0) leaf.rotation += 360;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-xl text-green-500"></span>
      </div>
    );
  }

  return (
    <>
      {/* Background leaves animation */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #d0f0c0 0%, #a1d490 100%)' }}
      >
        {leaves.current.map((leaf, i) => (
          <svg
            key={i}
            style={{
              position: 'absolute',
              top: leaf.y,
              left: leaf.x,
              width: leaf.size,
              height: leaf.size,
              opacity: leaf.opacity,
              transform: `rotate(${leaf.rotation}deg)`,
              transition: 'opacity 0.3s ease',
              filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.1))',
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C8 4 2 7 2 12s6 10 10 10 10-6 10-10S16 4 12 2z" />
            <path d="M12 22c2-3 5-6 8-7" />
          </svg>
        ))}
      </div>

      {/* Gardeners grid */}
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
        {gardeners.map((gardener, index) => {
          const floatOffset = Math.sin(animDataRef.current[index]?.phase || 0) * 10;
          return (
            <div
              key={gardener.id}
              className="bg-white shadow-md rounded-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-lg duration-300 flex flex-col"
              style={{
                transform: `translateY(${floatOffset}px)`,
                willChange: 'transform',
              }}
            >
              <img src={gardener.avatar} alt={gardener.name} className="w-full h-72 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-1 text-green-800">{gardener.name}</h2>
                <p className="text-gray-600 mb-1 italic">{gardener.location}</p>
                <p className="text-gray-700">
                  <span className="font-semibold">Age:</span> {gardener.age}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Gender:</span> {gardener.gender}
                </p>
                <p className="text-gray-700 capitalize">
                  <span className="font-semibold">Status:</span> {gardener.status}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Experience:</span> {gardener.experiences}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Total Shared Tips:</span> {gardener.totalSharedTips}
                </p>
                {gardener.otherInfo && (
                  <p className="text-gray-700 mt-2">
                    <span className="font-semibold">Other Info:</span> {gardener.otherInfo}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ExploreWithBackground;
