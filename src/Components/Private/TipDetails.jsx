import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

const TipDetails = () => {
  const { id } = useParams();
  const [tip, setTip] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/garden-tips/public/${id}`)
      .then(res => res.json())
      .then(data => setTip(data));
  }, [id]);

  if (!tip) return <p>Loading...</p>;

  return (
    <div className="p-4 md:p-0">
        <div className="p-6 container mx-auto flex flex-col items-center bg-green-300 mt-10 mb-10 rounded-xl">
      <h2 className="text-3xl font-bold mb-4">{tip.title}</h2>
      <img src={tip.imageUrl} alt={tip.title} className="w-full max-w-md mb-4 rounded-xl" />
      <p><strong>Plant Type:</strong> {tip.plantType}</p>
      <p><strong>Difficulty:</strong> {tip.difficulty}</p>
      <p><strong>Category:</strong> {tip.category}</p>
      <p><strong>Availability:</strong> {tip.availability}</p>
      <p><strong>Submitted by:</strong> {tip.userName} ({tip.userEmail})</p>
      <p className="mt-4"><strong>Description:</strong></p>
      <p>{tip.description}</p>
    </div>
    </div>
  );
};

export default TipDetails;
