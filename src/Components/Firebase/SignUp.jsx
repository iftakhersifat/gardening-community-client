import React from 'react';
import { Link } from 'react-router';

const SignUp = () => {
    const handleSignup=e=>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const {email, password, ...userDetails} = Object.fromEntries(formData.entries());
        console.log(email, password, userDetails);
    }
    return (
        <div className="hero  min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card md:w-[500px] w-[350px] border border-green-200 bg-gray-200 shrink-0 shadow-md">
        <div className="card-body">
        <form onSubmit={handleSignup} className="fieldset">

          <label className="label">Name</label>
          <input type="text" className="input w-full" name='name' placeholder="Enter your name" />

          <label className="label">Email</label>
          <input type="email" className="input w-full" name='email' placeholder="Email" />

          <label className="label">Photo URl</label>
          <input type="text" className="input w-full" name='photo' placeholder="Photo URL" />

          <label className="label">Password</label>
          <input type="password" className="input w-full" name='password' placeholder="Password" />

          <button className="btn bg-green-500 text-white mt-4">Sign Up</button>
          <Link to="/login">Do you have an account? <span className='text-red-500 underline'>Login</span></Link>

        </form>
      </div>
    </div>
  </div>
</div>
    );
};

export default SignUp;