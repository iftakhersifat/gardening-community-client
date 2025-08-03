import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from './AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import toast from 'react-hot-toast';

const leavesSVG = (
  <svg
    className="w-12 h-12 text-green-400 opacity-40 animate-float-slow"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2C8 4 2 7 2 12s6 10 10 10 10-6 10-10S16 4 12 2z" />
  </svg>
);

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, UpdateUser, setUser, googleProvider } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();

  const [error, setError] = useState('');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password, photo, fullName } = Object.fromEntries(formData.entries());

    if (!passwordRegex.test(password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, and be at least 8 characters long.");
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;
      await UpdateUser({ displayName: fullName, photoURL: photo });
      setUser({ ...user, displayName: fullName, photoURL: photo });
      toast.success("Account created successfully!");
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleProvider(provider);
      toast.success("Logged in with Google!");
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative h-[700px] bg-gradient-to-br from-green-100 via-green-200 to-green-300 dark:from-green-900 dark:via-green-800 dark:to-green-900 flex items-center justify-center overflow-hidden">
      {/* Background floating leaves */}
      <div className="absolute top-10 left-10 animate-float-slow">{leavesSVG}</div>
      <div className="absolute top-1/2 right-20 animate-float">{leavesSVG}</div>
      <div className="absolute bottom-20 left-1/3 animate-float-delay">{leavesSVG}</div>
      <div className="absolute bottom-10 right-10 animate-float-slower">{leavesSVG}</div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card md:w-[500px] w-[350px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
              Create an Account
            </h2>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your name"
                  required
                  className="input input-bordered w-full bg-white text-black placeholder-gray-500 border-gray-300 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:border-gray-600"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="input input-bordered w-full bg-white text-black placeholder-gray-500 border-gray-300 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:border-gray-600"
                />
              </div>

              <div>
                <label htmlFor="photo" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Photo URL
                </label>
                <input
                  type="text"
                  id="photo"
                  name="photo"
                  placeholder="Enter your photo URL"
                  className="input input-bordered w-full bg-white text-black placeholder-gray-500 border-gray-300 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:border-gray-600"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="input input-bordered w-full bg-white text-black placeholder-gray-500 border-gray-300 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:border-gray-600"
                />
              </div>

              {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}

              <button type="submit" className="btn bg-green-500 hover:bg-green-600 text-white w-full">
                Sign Up
              </button>
            </form>

            <div className="divider before:bg-gray-300 after:bg-gray-300 dark:before:bg-gray-600 dark:after:bg-gray-600 text-gray-600 dark:text-gray-300">
              OR
            </div>

            <button
              onClick={handleGoogle}
              className="btn w-full bg-white dark:bg-gray-100 text-black border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
            >
              <svg
                aria-label="Google logo"
                width="20"
                height="20"
                className="mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path fill="#4285f4" d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
              </svg>
              Sign Up with Google
            </button>

            <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-red-500 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

     {/* CSS animations for floating */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float 10s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 7s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>


    </div>
  );
};

export default SignUp;
