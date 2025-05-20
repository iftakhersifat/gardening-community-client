import React, { useEffect, useState } from 'react';

const Explore = () => {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    fetch("gardeners.json")
      .then(res => res.json())
      .then(data => setGardeners(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container mx-auto p-4">
      {gardeners.map(gardener => (
        <div
          key={gardener.id}
          className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
        >
          <img
            src={gardener.avatar}
            alt={gardener.name}
            className="w-full h-80 object-cover"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-xl font-semibold mb-1">{gardener.name}</h2>
            <p className="text-gray-600 mb-1">{gardener.location}</p>
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
              <span className="font-semibold">Experience:</span>{" "}
              {gardener.experiences}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Total Shared Tips:</span>{" "}
              {gardener.totalSharedTips}
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
