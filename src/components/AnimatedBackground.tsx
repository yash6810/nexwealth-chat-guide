
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-nexwealth-blue via-nexwealth-teal to-nexwealth-lightTeal opacity-20 animate-gradient"></div>
      
      {/* Animated blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-nexwealth-teal blur-3xl animated-blob" 
           style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-nexwealth-lightTeal blur-3xl animated-blob" 
           style={{ animationDelay: '-3s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-nexwealth-gold blur-3xl animated-blob" 
           style={{ animationDelay: '-6s', opacity: 0.6 }}></div>
    </div>
  );
};

export default AnimatedBackground;
