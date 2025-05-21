import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';

const UpdateTip = () => {
  const { user } = useContext(AuthContext);
  const tip = useLoaderData();
  const navigate = useNavigate();

  if (!user || !tip) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  const handleUpdate = e => {
    e.preventDefault();
    const form = e.target;

    const updatedTip = {
      title: form.title.value,
      plantType: form.plantType.value,
      difficulty: form.difficulty.value,
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      category: form.category.value,
      availability: form.availability.value,
    };

    fetch(`http://localhost:3000/garden-tips/public/${tip._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTip),
    })
      .then(res => res.json())
      .then(data => {
        if (data.matchedCount) {
          Swal.fire('Updated!', 'Tip updated successfully.', 'success');
          navigate('/my-tips');
        }
      });
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 mb-20 px-6">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">🌿 Update Garden Tip</h2>

      <form onSubmit={handleUpdate} className="space-y-6 bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <input
          type="text"
          name="title"
          defaultValue={tip.title}
          placeholder="Title"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="plantType"
          defaultValue={tip.plantType}
          placeholder="Plant Type or Topic"
          required
          className="input input-bordered w-full"
        />

        <select name="difficulty" defaultValue={tip.difficulty} required className="select select-bordered w-full">
          <option disabled>Difficulty Level</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <textarea
          name="description"
          defaultValue={tip.description}
          placeholder="Description"
          required
          rows="4"
          className="textarea textarea-bordered w-full"
        />

        <input
          type="text"
          name="imageUrl"
          defaultValue={tip.imageUrl}
          placeholder="Image URL"
          required
          className="input input-bordered w-full"
        />

        <select name="category" defaultValue={tip.category} required className="select select-bordered w-full">
          <option disabled>Select Category</option>
          <option>Composting</option>
          <option>Plant Care</option>
          <option>Vertical Gardening</option>
          <option>Soil Health</option>
        </select>

        <select name="availability" defaultValue={tip.availability} required className="select select-bordered w-full">
          <option disabled>Availability</option>
          <option>Public</option>
          <option>Hidden</option>
        </select>

        <input
          type="text"
          value={user.displayName || "Anonymous"}
          readOnly
          className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
        />

        <input
          type="email"
          value={user.email}
          readOnly
          className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
        />

        <button type="submit" className="btn btn-success w-full mt-4">Update Tip</button>
      </form>
    </div>
  );
};

export default UpdateTip;
