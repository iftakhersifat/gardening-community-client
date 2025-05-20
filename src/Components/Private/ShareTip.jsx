import React, { use } from 'react';

import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../Firebase/AuthProvider';

const ShareTip = () => {
  const { user } = use(AuthContext);
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
      userName: user.displayName
    };

    try {
      const res = await fetch('http://localhost:3000/garden-tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tip)
      });

      if (res.ok) {
        toast.success("Garden tip shared successfully!");
        form.reset();
        navigate('/my-tips');
      } else {
        toast.error("Failed to submit tip.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">➕ Share a Garden Tip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" required className="input w-full" />
        <input type="text" name="plantType" placeholder="Plant Type/Topic" required className="input w-full" />

        <select name="difficulty" required className="select w-full">
          <option disabled selected>Difficulty Level</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <textarea name="description" placeholder="Description" required className="textarea w-full" rows="4" />

        <input type="text" name="imageUrl" placeholder="Image URL" required className="input w-full" />

        <select name="category" required className="select w-full">
          <option disabled selected>Select Category</option>
          <option>Composting</option>
          <option>Plant Care</option>
          <option>Vertical Gardening</option>
          <option>Soil Health</option>
        </select>

        <select name="availability" required className="select w-full">
          <option disabled selected>Availability</option>
          <option>Public</option>
          <option>Hidden</option>
        </select>

        <input type="text" value={user.displayName || "Anonymous"} readOnly className="input w-full" />
        <input type="email" value={user.email} readOnly className="input w-full" />

        <button className="btn btn-success w-full">Submit Tip</button>
      </form>
    </div>
  );
};

export default ShareTip;
