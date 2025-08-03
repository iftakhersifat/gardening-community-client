import React, { use} from 'react';
import { NavLink, Link } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import ThemeToggle from '../../ThemeToggle';


const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success('Logout successfully!'))
      .catch(error => toast.error(error.message));
  };

  return (
    <nav className="container mx-auto flex justify-between items-center px-4 py-4 md:px-3 lg:px-4 mt-6 ">
      {/* Logo + title */}
      <div className="flex items-center gap-3">
        <img src="/assets/logo.png" alt="Logo" className="w-24 lg:-ml-7 md:-ml-9 -ml-3 md:w-28" />
        <h1 className="hidden md:block text-lg md:text-2xl font-bold text-green-700">Gardening Community & Resource Hub</h1>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex space-x-6 font-medium items-center">
        <NavLink to="/" className={({ isActive }) =>   isActive ? 'text-green-600 underline' : 'hover:text-green-500 transition'}>Home</NavLink>

        <NavLink to="/explore" className={({ isActive }) =>   isActive ? 'text-green-600 underline' : 'hover:text-green-500 transition' }>Explore Gardeners</NavLink>

        <NavLink to="/browse" className={({ isActive }) =>   isActive ? 'text-green-600 underline' : 'hover:text-green-500 transition' }>Browse Tips</NavLink>
        {user && (
          <>
            <NavLink to="/share" className={({ isActive }) =>   isActive ? 'text-green-600 underline' : 'hover:text-green-500 transition' }>Share a Tip</NavLink>

            <NavLink to="/my-tips" className={({ isActive }) =>   isActive ? 'text-green-600 underline' : 'hover:text-green-500 transition' }>My Tips</NavLink>
          </>
        )}
      </div>

      {/* Dropdown for mobile */}
      <div className="lg:hidden dropdown dropdown-end">
        <button tabIndex={0} className="btn btn-ghost">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-30">
          <NavLink to="/" className="mb-2">Home</NavLink>
          <NavLink to="/explore" className="mb-2">Explore Gardeners</NavLink>
          <NavLink to="/browse" className="mb-2">Browse Tips</NavLink>
          {user && (
            <>
              <NavLink to="/share" className="mb-2">Share a Tip</NavLink>
              <NavLink to="/my-tips" className="mb-2">My Tips</NavLink>
            </>
          )}
        </ul>
      </div>

      {/* User actions */}
      <div className="flex items-center gap-4">
        <ThemeToggle></ThemeToggle>
        {user ? (
          <>
            <img src={user.photoURL || '/assets/user.png'} alt={user.displayName || 'User'} className="w-10 h-10 rounded-full border-2 border-green-500 object-cover"
              data-tooltip-id="user-tooltip"
              data-tooltip-content={user.displayName || 'User'}
              data-tooltip-place="bottom"
            />
            <Tooltip id="user-tooltip" />
            <button onClick={handleLogOut} className="bg-red-500 text-white px-4 py-1 rounded-xl font-medium hover:bg-red-600 transition">Log Out
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="bg-green-600 text-white px-4 py-1 rounded-xl font-medium hover:bg-green-700 transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
