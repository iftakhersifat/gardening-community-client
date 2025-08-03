import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = 'https://gardening-resource-hub-server.vercel.app/garden-tips';
    if (difficulty) {
      url += `?difficulty=${difficulty}`;
    }

    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setTips(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [difficulty]);

  return (
    <div className="container mx-auto px-4 md:px-8 mt-10 mb-16">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Browse Garden Tips</h2>

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
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
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
                tips.map((tip) => (
                  <tr key={tip._id} className="border-t hover:bg-green-50 transition">
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
                ))
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
  );
};

export default BrowseTips;
