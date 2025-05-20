import { useEffect, useState } from 'react';
import { Link } from 'react-router'; // ✅ use `react-router-dom` not `react-router`

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    let url = 'http://localhost:3000/garden-tips/public';
    if (difficulty) {
      url += `?difficulty=${difficulty}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => setTips(data))
      .catch(err => console.error(err));
  }, [difficulty]);

  return (
    <div className="p-4 container mx-auto md:p-0 mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-4">Browse Garden Tips</h2>

      <div className="mb-6">
        <label className="mr-2 font-semibold">Filter by Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-green-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Difficulty</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tips.length > 0 ? (
            tips.map((tip) => (
              <tr key={tip._id} className="hover:bg-green-50">
                <td className="border p-2">{tip.title}</td>
                <td className="border p-2">{tip.difficulty}</td>
                <td className="border p-2">
                  <img
                    src={tip.imageUrl}
                    alt={tip.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border p-2 text-center">
                  <Link to={`/tip-details/${tip._id}`}>
                    <button className="text-blue-600 hover:text-blue-800">👁️ See More</button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">No tips found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BrowseTips;
