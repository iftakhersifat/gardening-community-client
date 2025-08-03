import React, { useEffect, useState } from 'react';

const Explore = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('gardeners.json')
      .then(res => res.json())
      .then(data => {
        setGardeners(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading gardeners:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (<div className="flex justify-center items-center h-[70vh]">
      <span className="loading loading-spinner loading-xl text-green-500"></span>
    </div>
    );
  }

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {gardeners.map(gardener => (
<<<<<<< HEAD
        <div key={gardener.id} className="bg-white shadow-md rounded-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-lg duration-300 flex flex-col">
          <img src={gardener.avatar} alt={gardener.name} className="w-full h-72 object-cover"/>
=======
        <div
          key={gardener.id}
          className="bg-white shadow-md rounded-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-lg duration-300 flex flex-col"
        >
          <img
            src={gardener.avatar}
            alt={gardener.name}
            className="w-full h-72 object-cover"
          />
>>>>>>> f47b951601310ca28955233f7c1ecf9df02464e8
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-xl font-bold mb-1 text-green-800">{gardener.name}</h2>
            <p className="text-gray-600 mb-1 italic">{gardener.location}</p>
            <p className="text-gray-700">
              <span className="font-semibold">Age:</span> {gardener.age}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Gender:</span> {gardener.gender}
            </p>
            <p className="text-gray-700 capitalize">
              <span className="font-semibold">Status:</span> {gardener.status}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Experience:</span> {gardener.experiences}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Total Shared Tips:</span> {gardener.totalSharedTips}
            </p>
            {gardener.otherInfo && (
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Other Info:</span> {gardener.otherInfo}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Explore;
