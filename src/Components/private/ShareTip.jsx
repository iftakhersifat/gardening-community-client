import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../Firebase/AuthProvider';
import { motion } from 'framer-motion';

// Leaf SVG wrapped with motion for floating animation
const Leaf = ({ size, initialX, initialY, delay }) => {
  const floatAnimation = {
    y: ["0%", "-20%", "0%"],
    x: ["0%", "15%", "0%"],
    rotate: [0, 15, 0],
  };
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4CAF50"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        position: "absolute",
        top: initialY,
        left: initialX,
        width: size,
        height: size,
        opacity: 0.25,
        pointerEvents: "none",
        userSelect: "none",
      }}
      animate={floatAnimation}
      transition={{ duration: 6, repeat: Infinity, repeatType: "loop", delay }}
    >
      <path d="M12 2C8 4 2 7 2 12s6 10 10 10 10-6 10-10S16 4 12 2z" />
      <path d="M12 22c2-3 5-6 8-7" />
    </motion.svg>
  );
};

const ShareTip = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const tip = {
      title: form.title.value,
      plantType: form.plantType.value,
      difficulty: form.difficulty.value,
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      category: form.category.value,
      availability: form.availability.value,
      userEmail: user.email,
      userName: user.displayName || 'Anonymous',
    };

    try {
      const res = await fetch('https://gardening-resource-hub-server.vercel.app/garden-tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tip),
      });

      if (res.ok) {
        toast.success('Garden tip shared successfully!');
        form.reset();
        navigate('/my-tips');
      } else {
        toast.error('Failed to submit tip.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
      console.error(err);
    }
  };

  // Container animation variants for fade & slide up on mount
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Input animation variants (scale on focus)
  const inputVariants = {
    rest: { scale: 1 },
    focus: { scale: 1.03, boxShadow: "0 0 8px #4CAF50" },
  };

  return (
    <>
      {/* Background floating leaves fixed full viewport */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-gradient-to-br from-green-100 via-green-200 to-green-300 dark:from-green-900 dark:via-green-800 dark:to-green-900"
      >
        {[...Array(10)].map((_, i) => (
          <Leaf
            key={i}
            size={20 + Math.random() * 40}
            initialX={`${Math.random() * 100}%`}
            initialY={`${Math.random() * 100}%`}
            delay={i * 0.6}
          />
        ))}
      </div>

      {/* Centered form container */}
      <div className="relative min-h-[80vh] flex items-center justify-center px-6">
        <motion.div
          className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-green-100 dark:border-green-700 p-10 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6 text-center">
            Share a Garden Tip
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { type: 'text', name: 'title', placeholder: 'Tip Title' },
              { type: 'text', name: 'plantType', placeholder: 'Plant Type or Topic' },
              { type: 'text', name: 'imageUrl', placeholder: 'Image URL' },
            ].map(({ type, name, placeholder }) => (
              <motion.input
                key={name}
                type={type}
                name={name}
                placeholder={placeholder}
                required
                className="input input-bordered w-full"
                variants={inputVariants}
                initial="rest"
                whileFocus="focus"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            ))}

            <motion.select
              name="difficulty"
              required
              className="select select-bordered w-full"
              variants={inputVariants}
              initial="rest"
              whileFocus="focus"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              defaultValue=""
            >
              <option disabled value="">
                Difficulty Level
              </option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </motion.select>

            <motion.textarea
              name="description"
              placeholder="Describe your tip..."
              required
              rows="4"
              className="textarea textarea-bordered w-full resize-none"
              variants={inputVariants}
              initial="rest"
              whileFocus="focus"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />

            <motion.select
              name="category"
              required
              className="select select-bordered w-full"
              variants={inputVariants}
              initial="rest"
              whileFocus="focus"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              defaultValue=""
            >
              <option disabled value="">
                Select Category
              </option>
              <option>Composting</option>
              <option>Plant Care</option>
              <option>Vertical Gardening</option>
              <option>Soil Health</option>
            </motion.select>

            <motion.select
              name="availability"
              required
              className="select select-bordered w-full"
              variants={inputVariants}
              initial="rest"
              whileFocus="focus"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              defaultValue=""
            >
              <option disabled value="">
                Visibility
              </option>
              <option>Public</option>
              <option>Hidden</option>
            </motion.select>

            <motion.input
              type="text"
              value={user.displayName || 'Anonymous'}
              readOnly
              className="input text-black input-disabled w-full bg-gray-100 dark:bg-gray-700"
              variants={inputVariants}
              initial="rest"
            />
            <motion.input
              type="email"
              value={user.email}
              readOnly
              className="input text-black input-disabled w-full bg-gray-100 dark:bg-gray-700"
              variants={inputVariants}
              initial="rest"
            />

            <motion.button
              type="submit"
              className="btn btn-success w-full text-white text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Submit Tip
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default ShareTip;
