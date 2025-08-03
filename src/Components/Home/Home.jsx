import React, { useState, useEffect } from 'react';
import BannerSlider from './BannerSlider';
import FeaturedGardeners from './FeaturedGardeners';
import Testimonials from './Testimonials';
import GardeningEvents from './GardeningEvents';
import TopTrendingTips from './TopTrendingTips';

const leafPaths = [
  "M12 2C8 4 2 7 2 12s6 10 10 10 10-6 10-10S16 4 12 2z",
  "M12 2L7 22L17 22L12 2z",
  "M12 2C6 10 10 20 16 14S18 6 12 2z",
];

const randomRange = (min, max) => Math.random() * (max - min) + min;

const Leaf = ({ size, style, pathIndex, rotation }) => {
  const leafId = `leafGradient${pathIndex}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
      xmlns="http://www.w3.org/2000/svg"
      fill={`url(#${leafId})`}
      className="opacity-60"
    >
      <defs>
        <linearGradient id={leafId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path d={leafPaths[pathIndex]} />
    </svg>
  );
};

const Home = () => {
  const [leaves, setLeaves] = useState(
    Array.from({ length: 12 }).map(() => ({
      x: randomRange(0, 100),
      y: randomRange(0, 100),
      speedX: randomRange(-0.05, 0.05),
      speedY: randomRange(-0.03, 0.03),
      size: randomRange(40, 90),
      rotation: randomRange(0, 360),
      rotationSpeed: randomRange(-0.3, 0.3),
      pathIndex: Math.floor(randomRange(0, leafPaths.length)),
      opacity: randomRange(0.3, 0.7),
    }))
  );

  useEffect(() => {
    let animFrame;

    const animate = () => {
      setLeaves((prevLeaves) =>
        prevLeaves.map((leaf) => {
          let { x, y, speedX, speedY, size, rotation, rotationSpeed, pathIndex, opacity } = leaf;

          x += speedX;
          y += speedY;
          rotation += rotationSpeed;

          if (x > 105) x = -5;
          else if (x < -5) x = 105;

          if (y > 105) y = -5;
          else if (y < -5) y = 105;

          return { x, y, speedX, speedY, size, rotation, rotationSpeed, pathIndex, opacity };
        })
      );
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <>
      {/* Full screen animated leaves background */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-br from-green-100 via-green-200 to-green-300 dark:from-green-900 dark:via-green-800 dark:to-green-900 overflow-hidden"
      >
        {leaves.map(({ x, y, size, rotation, pathIndex, opacity }, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}vw`,
              top: `${y}vh`,
              transform: 'translate(-50%, -50%)',
              userSelect: 'none',
              opacity,
              filter: `drop-shadow(0 0 3px rgba(16, 185, 129, ${opacity}))`,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            <Leaf size={size} rotation={rotation} pathIndex={pathIndex} />
          </div>
        ))}
      </div>

      {/* Page content container */}
      <div className="relative container mx-auto mt-10 min-h-screen">
        <BannerSlider />
        <FeaturedGardeners />
        <TopTrendingTips />
        <GardeningEvents />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;
