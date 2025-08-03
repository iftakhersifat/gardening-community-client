import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';

const NUM_LEAVES = 20;

const generateLeaves = () => {
  return Array.from({ length: NUM_LEAVES }).map(() => ({
    size: 20 + Math.random() * 40,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    speedX: 0.2 + Math.random() * 0.4,
    speedY: 0.1 + Math.random() * 0.3,
    opacity: 0.3 + Math.random() * 0.3, // stronger opacity
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 0.2,
  }));
};

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(true);

  const animDataRef = useRef([]);
  const leaves = useRef(generateLeaves());
  const animationFrameId = useRef();
  const [, setTick] = useState(0);

  useEffect(() => {
    let url = 'https://gardening-resource-hub-server.vercel.app/garden-tips';
    if (difficulty) url += `?difficulty=${difficulty}`;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoading(false);
        animDataRef.current = data.map(() => ({
          speed: Math.random() * 0.015 + 0.005,
          direction: Math.random() > 0.5 ? 1 : -1,
          phase: Math.random() * 2 * Math.PI,
        }));
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [difficulty]);

  useEffect(() => {
    const animate = () => {
      animDataRef.current.forEach((anim) => {
        anim.phase += anim.speed * anim.direction;
        if (anim.phase > 2 * Math.PI) anim.phase -= 2 * Math.PI;
        else if (anim.phase < 0) anim.phase += 2 * Math.PI;
      });

      leaves.current.forEach((leaf) => {
        leaf.x += leaf.speedX;
        leaf.y += leaf.speedY;
        leaf.rotation += leaf.rotationSpeed;

        if (leaf.x > window.innerWidth) leaf.x = -leaf.size;
        if (leaf.y > window.innerHeight) leaf.y = -leaf.size;
        if (leaf.rotation > 360) leaf.rotation -= 360;
        if (leaf.rotation < 0) leaf.rotation += 360;
      });

      setTick((tick) => tick + 1);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  return (
    <>
      {/* Background leaves animation */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #cce7ff 0%, #a6f2d9 100%)' }} // light blue to mint green
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
            stroke="#008080" // teal stroke
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C8 4 2 7 2 12s6 10 10 10 10-6 10-10S16 4 12 2z" />
            <path d="M12 22c2-3 5-6 8-7" />
          </svg>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-10 mb-16 relative z-10">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Browse Garden Tips
        </h2>

        <div className="flex justify-center mb-6">
          <label className="mr-3 font-semibold text-green-900 text-lg">Filter by Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border border-green-300 rounded px-3 py-2 text-green-800 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-green-600"></span>
          </div>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full">
              <thead className="bg-green-100 text-green-900">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold">Title</th>
                  <th className="text-left px-6 py-3 font-semibold">Difficulty</th>
                  <th className="text-left px-6 py-3 font-semibold">Image</th>
                  <th className="text-center px-6 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {tips.length > 0 ? (
                  tips.map((tip, index) => {
                    const floatOffset = Math.sin(animDataRef.current[index]?.phase || 0) * 5;
                    return (
                      <tr
                        key={tip._id}
                        className="border-t hover:bg-green-50 transition"
                        style={{
                          transform: `translateY(${floatOffset}px)`,
                          willChange: 'transform',
                        }}
                      >
                        <td className="px-6 text-black py-4">{tip.title}</td>
                        <td className="px-6 text-black py-4">{tip.difficulty}</td>
                        <td className="px-6 py-4">
                          <img
                            src={tip.imageUrl}
                            alt={tip.title}
                            className="w-16 h-16 rounded object-cover border"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Link to={`/tip-details/${tip._id}`}>
                            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                              See More
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center px-6 py-8 text-gray-500">
                      No tips found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default BrowseTips;
