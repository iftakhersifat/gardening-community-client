// src/Components/LoadingAnimation.jsx
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-[300px]">
      <Player
        autoplay
        loop
        src="https://assets1.lottiefiles.com/private_files/lf30_editor_rjvnczqj.json" // You can replace this with any Lottie URL
        style={{ height: '200px', width: '200px' }}
      />
    </div>
  );
};

export default LoadingAnimation;
