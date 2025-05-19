import React from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../Root/Navbar';
import Footer from '../Root/Footer';

const NotFound = () => {
    const navigate =useNavigate();
    const handle=()=>{
        navigate("/")
    }
    return (
        <div>
            <Navbar></Navbar>
            <button onClick={handle} className='p-2 ml-40 md:ml-60 text-white mx-auto mt-10 bg-green-500 rounded-xl'>Back to Home</button>
            <img className='text-center lg:ml-[550px]' src="/assets/404.gif" alt="" />
            <Footer></Footer>
        </div>
    );
};

export default NotFound;