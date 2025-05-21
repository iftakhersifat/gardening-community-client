import { useParams } from 'react-router';
import { useEffect, useState} from 'react';
import toast from 'react-hot-toast';

const TipDetails = () => {
  const { id } = useParams();
  const [tip, setTip] = useState(null);

  // Fetch tip data
  useEffect(() => {
    fetch(`http://localhost:3000/garden-tips/public/${id}`)
      .then(res => res.json())
      .then(data => setTip(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:3000/garden-tips/${id}/like`, {
        method: "PATCH"
      });
      if (res.ok) {
        const updated = await res.json();
        setTip(prev => ({ ...prev, totalLiked: (prev.totalLiked || 0) + 1 }));
      } else {
        toast.error("Failed to like the tip.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error while liking the tip.");
    }
  };

  if (!tip) return <p className="text-center py-10">Loading...</p>;

  return (
    
    
    
    <div className="p-4 md:p-0">
      <div className="p-6 container mx-auto flex flex-col items-center bg-green-300 mt-10 mb-10 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-center">{tip.title}</h2>

        <img
          src={tip.imageUrl}
          alt={tip.title}
          className="w-full max-w-md mb-4 rounded-xl object-cover"
        />

        
          <p><strong>Plant Type/Topic:</strong> {tip.plantType}</p>
          <p><strong>Difficulty:</strong> {tip.difficulty}</p>
          <p><strong>Category:</strong> {tip.category}</p>
          <p><strong>Availability:</strong> {tip.availability}</p>
          <p><strong>Submitted by:</strong></p>
          <p>{tip.userName} ({tip.userEmail})</p>
          <p className="mt-4"><strong>Description:</strong></p>
          <p>{tip.description}</p>
      

        <button
          onClick={handleLike}
          className="mt-6 px-4 py-2 bg-white text-red-600 font-semibold border rounded hover:bg-red-50"
        >
          ❤️ Like ({tip.totalLiked || 0})
        </button>
      </div>
    </div>
  );
};

export default TipDetails;
