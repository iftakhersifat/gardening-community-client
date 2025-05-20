import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const BrowseTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/garden-tips/public')
      .then(res => res.json())
      .then(data => setTips(data));
  }, []);

  return (
    <div className="p-4 container mx-auto md:p-0 mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-4">Browse Garden Tips</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-green-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tips.map(tip => (
            <tr key={tip._id} className="hover:bg-green-50">
              <td className="border p-2">{tip.title}</td>
              <td className="border p-2">{tip.category}</td>
              <td className="border p-2">
                <img src={tip.imageUrl} alt={tip.title} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="border p-2 text-center">
                <Link to={`/tip/${tip._id}`}>
                  <button className="text-blue-600 hover:text-blue-800">👁️ See More</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrowseTips;
