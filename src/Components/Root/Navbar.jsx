import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div className='container mx-auto flex justify-between items-center mt-10 p-4 md:p-0'>
            {/* logo & text */}
            <div className='flex items-center'>
                <img className='w-28' src="/assets/logo.png" alt="" />
                <h1 className='lg:text-2xl text-[16px] font-bold -ml-6'>Gardening Community & Resource Hub</h1>
            </div>
            {/* links */}
            <div className='space-x-4 md:block hidden'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/explore">Explore Gardeners</NavLink>

                {/* private */}
                <NavLink to="/share">Share a Garden Tip</NavLink>
                <NavLink to="/tips">My Tips</NavLink>
            </div>
            {/* login button */}
            <div>
                <button className='btn bg-green-500 rounded-xl px-6 text-white'>Login</button>
            </div>
            
        </div>
    );
};

export default Navbar;