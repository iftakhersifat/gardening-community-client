import { useNavigate, useParams } from 'react-router';
import { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Firebase/AuthProvider';

const TipDetails = () => {
  const {user} = use(AuthContext)
  const navigate = useNavigate();
  const { id } = useParams();
  const [tip, setTip] = useState(null);

   useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch(`http://localhost:3000/garden-tips/public/${id}`)
      .then(res => res.json())
      .then(data => setTip(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:3000/garden-tips/${id}/like`, {
        method: 'PATCH',
      });
      if (res.ok) {
        setTip(prev => ({
          ...prev,
          totalLiked: (prev.totalLiked || 0) + 1,
        }));
        toast.success('Thanks for the like! 🌿');
      } else {
        toast.error('Failed to like the tip.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error while liking the tip.');
    }
  };

  if (!tip) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {
        user ? <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 max-w-4xl mx-auto border border-green-100">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">{tip.title}</h2>

        <img
          src={tip.imageUrl}
          alt={tip.title}
          className="w-full max-h-[400px] object-cover rounded-xl mb-6"
        />

        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold text-green-600">🌱 Plant Type/Topic:</span> {tip.plantType}</p>
          <p><span className="font-semibold text-green-600">📊 Difficulty:</span> {tip.difficulty}</p>
          <p><span className="font-semibold text-green-600">📁 Category:</span> {tip.category}</p>
          <p><span className="font-semibold text-green-600">🌐 Availability:</span> {tip.availability}</p>
          <p><span className="font-semibold text-green-600">👤 Submitted by:</span> {tip.userName} ({tip.userEmail})</p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">📝 Description:</h3>
          <p className="text-gray-600">{tip.description}</p>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleLike}
            className="px-6 py-2 bg-red-100 hover:bg-red-200 text-red-600 font-medium rounded-full shadow-sm transition duration-200"
          >
            ❤️ Like ({tip.totalLiked || 0})
          </button>
        </div>
      </div>: ""
        
      }
    </div>
  );
};

export default TipDetails;
