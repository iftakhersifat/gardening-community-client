import React, { useEffect, useState } from "react";

const TopTrendingTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/garden-tips/public")
      .then((res) => res.json())
      .then((data) => {
        // Get the first 6 tips for trending section
        setTips(data.slice(0, 6));
      });
  }, []);

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-red-500 text-center">Top Trending Tips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip,i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            {tip.imageUrl && (
              <img
                src={tip.imageUrl}
                alt={tip.title}
                className="w-full h-60 object-cover"
              />
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-500">By {tip.userName}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopTrendingTips;
