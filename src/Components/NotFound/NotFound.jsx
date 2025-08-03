import React from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../Root/Navbar';
import Footer from '../Root/Footer';

const NotFound = () => {
    const navigate =useNavigate();
    const handleBackHome=()=>{
        navigate("/")
    }
    return (
        <div>
            <Navbar></Navbar>
            
            <div className='container mx-auto'>
            <img className='text-center lg:ml-[300px]' src="/assets/404.gif" alt="" />
            
            <div className='flex flex-col justify-center items-center'>
            <p className="text-xl md:text-2xl text-center text-green-900 mb-6 max-w-md">
            Oops! The page you are looking for doesn’t exist or has been moved.
            </p>
            <button
              onClick={handleBackHome}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 rounded-lg text-white font-semibold transition"
              aria-label="Back to home page"
            >
              Back to Home
            </button>
            </div>

            </div>
            
            <Footer></Footer>
        </div>
    );
};

export default NotFound;