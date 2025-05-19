import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div className='container mx-auto flex justify-between items-center mt-10 p-4 md:p-0'>
            {/* logo & text */}
            <div className='flex items-center'>
                
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/explore">Explore Gardeners</NavLink>

                {/* private */}
                <NavLink to="/share">Share a Garden Tip</NavLink>
                <NavLink to="/tips">My Tips</NavLink>

                </ul>
                </div>

                <img className='w-28' src="/assets/logo.png" alt="" />
                <h1 className='md:text-2xl text-[16px] font-bold -ml-6'>Gardening Community & Resource Hub</h1>
            </div>
            {/* links */}
            <div className='space-x-4 lg:block hidden'>
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