import React, { useEffect, useState } from 'react';

const FeaturedGardeners = () => {
    const [gardeners, setGardeners] = useState([]);
    useEffect(()=>{
        fetch("gardeners.json")
        .then(res=>res.json())
        .then(data=>{
            const active = data.filter(g => g.status === 'active');
        setGardeners(active);
        })
    },[])
    console.log(gardeners)
    return (
        <div>
            <h1>Active gardeners : {gardeners.length}</h1>
            <div className='grid grid-cols-3 gap-4'>
                {
                    gardeners.map(g=>
                    <div key={g.id} className="bg-gray-100 border border-green-100 mt-10 shadow-md rounded-2xl p-4 text-center">
                    <img src={g.avatar} alt="" className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-green-500"/>
                    <h3 className="text-xl font-semibold">{g.name}</h3>
                    <p className="text-gray-500">{g.location}</p>
                    <span className="inline-block mt-2 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                    Active Gardener
                    </span>
                    </div>)
                }
            </div>
        </div>
    );
};

export default FeaturedGardeners;