import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Firebase/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';

// New color palette for leaves + animation variations
const leafColors = ['#4CAF50', '#F57C00', '#FBC02D']; // Green, Orange, Yellow

const FloatingLeavesBackground = () => {
  const leaves = Array.from({ length: 20 }).map(() => {
    const color = leafColors[Math.floor(Math.random() * leafColors.length)];
    return {
      size: 20 + Math.random() * 40,
      left: Math.random() * 100, // percent
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      rotateStart: Math.random() * 360,
      rotateDirection: Math.random() > 0.5 ? 1 : -1,
      color,
      scalePulseSpeed: 2 + Math.random() * 2,
      scalePulseDelay: Math.random() * 5,
    };
  });

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)', // lighter teal gradient
      }}
    >
      {leaves.map((leaf, i) => (
        <motion.svg
          key={i}
          initial={{ y: 120, rotate: leaves[i].rotateStart, opacity: 0.4, scale: 1 }}
          animate={{
            y: -170,
            rotate: leaves[i].rotateStart + leaves[i].rotateDirection * 360,
            opacity: [0.4, 0.2, 0.4],
            scale: [1, 1.15, 1],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: leaves[i].duration,
            delay: leaves[i].delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${leaves[i].left}%`,
            width: leaves[i].size,
            height: leaves[i].size,
            filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.1))',
            stroke: leaves[i].color,
          }}
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2C8 4 2 7 2 12s6 10 10 10 10-6 10-10S16 4 12 2z" />
          <path d="M12 22c2-3 5-6 8-7" />
        </motion.svg>
      ))}
    </div>
  );
};

const MyTips = () => {
  const { user } = useContext(AuthContext);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://gardening-resource-hub-server.vercel.app/my-tips?email=${user.email}`)
        .then(res => res.json())
        .then(data => setTips(data));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this tip!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://gardening-resource-hub-server.vercel.app/garden-tips/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your tip has been deleted.', 'success');
              const remaining = tips.filter((t) => t._id !== id);
              setTips(remaining);
            }
          });
      }
    });
  };

  // Container animation variants (fade & slide up)
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, when: 'beforeChildren' },
    },
  };

  // Row animation variants (fade, slide + bounce on enter, scale on hover)
  const rowVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 12 },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 8px 20px rgba(255, 165, 0, 0.35)', // subtle orange glow on hover
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <FloatingLeavesBackground />

      <motion.div
        className="container mx-auto px-4 py-12 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-3xl font-extrabold text-green-700 mb-6 text-center drop-shadow-md">
          My Garden Tips
        </h2>

        {tips.length > 0 ? (
          <motion.div
            className="overflow-x-auto bg-white shadow-xl rounded-xl border border-amber-200"
            layout
          >
            <table className="table w-full text-sm">
              <thead className="bg-amber-100 text-gray-800">
                <tr>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Availability</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {tips.map((tip) => (
                    <motion.tr
                      key={tip._id}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: 25 }}
                      whileHover="hover"
                      className="border-t cursor-pointer"
                    >
                      <td className="py-3 text-black px-4">{tip.title}</td>
                      <td className="py-3 text-black px-4">{tip.category}</td>
                      <td className="py-3 text-black px-4">{tip.availability}</td>
                      <td className="py-3 px-4 text-center space-x-2">
                        <Link
                          to={`/update-tip/${tip._id}`}
                          className="inline-block bg-amber-400 hover:bg-amber-500 text-white text-xs font-semibold py-1 px-3 rounded transition"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(tip._id)}
                          className="inline-block bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-1 px-3 rounded transition"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        ) : (
          <div className="text-center mt-10 text-gray-600 italic font-medium">
            <p>You haven’t added any tips yet.</p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default MyTips;
