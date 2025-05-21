import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Firebase/AuthProvider';

const MyTips = () => {
  const { user } = useContext(AuthContext);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-tips?email=${user.email}`)
        .then(res => res.json())
        .then(data => setTips(data));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this tip!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/garden-tips/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your tip has been deleted.', 'success');
              const remaining = tips.filter((t) => t._id !== id);
              setTips(remaining);
            }
          });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">My Garden Tips</h2>

      {tips.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-green-100">
          <table className="table w-full text-sm">
            <thead className="bg-green-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">🌿 Title</th>
                <th className="py-3 px-4 text-left">📁 Category</th>
                <th className="py-3 px-4 text-left">🌐 Availability</th>
                <th className="py-3 px-4 text-center">⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {tips.map((tip) => (
                <tr key={tip._id} className="hover:bg-green-50 border-t">
                  <td className="py-3 px-4">{tip.title}</td>
                  <td className="py-3 px-4">{tip.category}</td>
                  <td className="py-3 px-4">{tip.availability}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <Link
                      to={`/update-tip/${tip._id}`}
                      className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white text-xs font-medium py-1 px-3 rounded transition"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(tip._id)}
                      className="inline-block bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-1 px-3 rounded transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-600">
          <p>You haven’t added any tips yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyTips;
