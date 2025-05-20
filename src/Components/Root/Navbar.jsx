import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import Switcher from '../Switcher';
import toast from 'react-hot-toast';

const Navbar = () => {
    const {user, logOut} =use(AuthContext);
    const handleLogOut=()=>{
        logOut()
        .then(()=>{toast.success("Logout successfully!")})
        .catch(error=>{
            toast.error(error)})
    }
    
    return (
        <div className='container mx-auto flex justify-between items-center mt-10 p-4 md:p-0'>
            {/* logo & text */}
            <div className='flex items-center navbar-start'>
                
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <NavLink to="/" className={({isActive})=> isActive ? "text-green-500 underline" : ""}>Home</NavLink>
                <NavLink to="/explore" className={({isActive})=> isActive ? "text-green-500 underline" : ""}>Explore Gardeners</NavLink>

                {/* private */}
                <NavLink to="/share" className={({isActive})=> isActive ? "text-green-500 underline" : ""}>Share a Garden Tip</NavLink>
                <NavLink to="/tips" className={({isActive})=> isActive ? "text-green-500 underline" : ""}>My Tips</NavLink>

                </ul>
                </div>

                <img className='w-28 -ml-9' src="/assets/logo.png" alt="" />
                <h1 className='lg:text-2xl md:text-[16px] font-bold -ml-6 md:block hidden'>Gardening Community & Resource Hub</h1>
            </div>
            {/* links */}
            <div className='space-x-4 lg:block hidden'>
                <NavLink to="/" className={({isActive})=> isActive ? "text-green-500 underline" : ""}>Home</NavLink>
                <NavLink to="/explore" className={({isActive})=> isActive ? "text-green-500 underline" : ""}>Explore Gardeners</NavLink>
                <NavLink to="/browse" className={({isActive})=> isActive ? "text-green-500 underline" : ""}>Browse Tips</NavLink>

                {/* private */}
                {
                    user && <><NavLink to="/share" className={({isActive})=> isActive ? "text-green-500 underline" : ""}>Share a Garden Tip</NavLink>
                <NavLink to="/my-tips" className={({isActive})=> isActive ? "text-green-500 underline" : ""}>My Tips</NavLink></>
                }
            </div>
            {/* login button */}
            <div className='flex gap-4'>
                {/* <Switcher></Switcher> */}
                <img className='w-10 rounded-full' src={user ? user.photoURL: "/assets/user.png"} alt="" />
                {
                    user ? <button onClick={handleLogOut} className='btn bg-red-500 rounded-xl px-6 text-white'>LogOut</button> :<Link to="/login"><button className='btn bg-green-500 rounded-xl px-6 text-white'>Login</button></Link>
                }
            </div>
            
        </div>
    );
};

export default Navbar;