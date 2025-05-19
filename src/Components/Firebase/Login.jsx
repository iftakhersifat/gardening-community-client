import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from './AuthProvider';

const Login = () => {
  const {LogIn} = use(AuthContext)
    const handleSignin =e=>{
        e.preventDefault();
        const email =e.target.email.value;
        const password =e.target.password.value;
        console.log(email, password)

        // firebase
        LogIn(email, password)
        .then(result=>{
          console.log(result.user)
        }).then(error=>{
          console.log("Login Successfully", error)
        })
    }
    return (
        <div className="hero  min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card md:w-[500px] w-[350px] border border-green-200 bg-gray-200 shrink-0 shadow-md">
        <div className="card-body">
        <form onSubmit={handleSignin} className="fieldset">

        <label className="label">Email</label>
        <input type="email" className="input w-full" name='email' placeholder="Email" />

          <label className="label">Password</label>
          <input type="password" className="input w-full" name='password' placeholder="Password" />

          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn bg-green-500 text-white mt-4">Sign In</button>
          <Link to="/signup">Don't have an account? <span className='text-red-500 underline'>Login</span></Link>
        </form>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;