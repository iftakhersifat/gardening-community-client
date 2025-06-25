import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const TopTrendingTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetch("https://gardening-resource-hub-server.vercel.app/public")
      .then((res) => res.json())
      .then((data) => {
        setTips(data.slice(0, 6));
      });
  }, []);

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Title with animation */}
      <Fade direction="up" triggerOnce={false} duration={2000}>
        <h2 className="text-4xl font-bold text-center text-green-600 mb-10 tracking-tight">
          🌿 Top Trending Garden Tips
        </h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
          Explore the most liked tips shared by passionate gardeners around the community.
        </p>
      </Fade>

      {/* Cards grid with animation */}
      <Fade direction="up" cascade damping={0.1} triggerOnce={false} duration={1000}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md  transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {tip.imageUrl && (
                <img
                  src={tip.imageUrl}
                  alt={tip.title}
                  className="w-full h-52 object-cover"
                />
              )}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1 line-clamp-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                  By <span className="font-medium">{tip.userName}</span>
                </p>
                <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-semibold text-green-600">
                     {tip.totalLiked || 0} Likes
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fade>
    </section>
  );
};

export default TopTrendingTips;
