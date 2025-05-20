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

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this tip!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/garden-tips/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your tip has been deleted.', 'success');
              setTips(tips.filter(tip => tip._id !== id));
            }
          });
      }
    });
  };

  return (
    <div className="p-4 container mx-auto md:p-0 mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-4">My Garden Tips</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tips.map(tip => (
              <tr key={tip._id}>
                <td>{tip.title}</td>
                <td>{tip.category}</td>
                <td>{tip.availability}</td>
                <td>
                  <Link to={`/update-tip/${tip._id}`} className="btn btn-xs btn-warning mr-2 mb-4 md:mb-0">Update</Link>
                  <button onClick={() => handleDelete(tip._id)} className="btn btn-xs btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTips;
