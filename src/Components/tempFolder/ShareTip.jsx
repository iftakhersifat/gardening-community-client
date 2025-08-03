import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../Firebase/AuthProvider';

const ShareTip = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Loading user information...</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const tip = {
      title: form.title.value,
      plantType: form.plantType.value,
      difficulty: form.difficulty.value,
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      category: form.category.value,
      availability: form.availability.value,
      userEmail: user.email,
      userName: user.displayName || 'Anonymous',
    };

    try {
      const res = await fetch('http://localhost:3000/garden-tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tip),
      });

      if (res.ok) {
        toast.success('🌱 Garden tip shared successfully!');
        form.reset();
        navigate('/my-tips');
      } else {
        toast.error('Failed to submit tip.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 bg-white shadow-lg rounded-xl border border-green-100">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">➕ Share a Garden Tip</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="🌿 Tip Title"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="plantType"
          placeholder="🌱 Plant Type or Topic"
          required
          className="input input-bordered w-full"
        />

        <select name="difficulty" required className="select select-bordered w-full">
          <option disabled selected>
            🚦 Difficulty Level
          </option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <textarea
          name="description"
          placeholder="📝 Describe your tip..."
          required
          rows="4"
          className="textarea textarea-bordered w-full"
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="🖼️ Image URL"
          required
          className="input input-bordered w-full"
        />

        <select name="category" required className="select select-bordered w-full">
          <option disabled selected>
            📁 Select Category
          </option>
          <option>Composting</option>
          <option>Plant Care</option>
          <option>Vertical Gardening</option>
          <option>Soil Health</option>
        </select>

        <select name="availability" required className="select select-bordered w-full">
          <option disabled selected>
            🔒 Visibility
          </option>
          <option>Public</option>
          <option>Hidden</option>
        </select>

        <input
          type="text"
          value={user.displayName || 'Anonymous'}
          readOnly
          className="input text-black input-disabled w-full bg-gray-100"
        />
        <input
          type="email"
          value={user.email}
          readOnly
          className="input text-black input-disabled w-full bg-gray-100"
        />

        <button className="btn btn-success w-full text-white text-lg">🚀 Submit Tip</button>
      </form>
    </div>
  );
};

export default ShareTip;
