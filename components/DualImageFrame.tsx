
import React from 'react';

interface DualImageFrameProps {
  image1: string;
  image2: string;
  alt: string;
  className?: string;
}

const DualImageFrame: React.FC<DualImageFrameProps> = ({ image1, image2, alt, className = "" }) => {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] group aspect-video cursor-pointer bg-gray-900 ${className}`}>
      {/* Primary Image with subtle zoom and desaturate effect */}
      <img
        src={image1}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-40 group-hover:blur-[2px]"
      />
      
      {/* The Reveal Container */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
        style={{ 
          clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        }}
      >
        {/* We use a wrapper with a dynamic clip path via Tailwind's group-hover */}
        <div className="absolute inset-0 transition-all duration-1000 group-hover:[clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)] [clip-path:polygon(100%_0,100%_0,100%_100%,100%_100%)]">
          <img
            src={image2}
            alt={`${alt}-secondary`}
            className="w-full h-full object-cover transform scale-125 group-hover:scale-100 transition-transform duration-1000 ease-out"
          />
          
          {/* Glowing Edge Line */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 via-white to-red-600 shadow-[0_0_20px_rgba(249,115,22,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>

      {/* Decorative Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700"></div>

      {/* Glassy Border Reveal */}
      <div className="absolute inset-0 border-2 border-white/5 group-hover:border-orange-500/30 rounded-[2rem] pointer-events-none transition-colors duration-700"></div>
      
      {/* "View More" Indicator that slides in */}
      <div className="absolute bottom-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 flex items-center space-x-2">
        <div className="h-[2px] w-8 bg-orange-500"></div>
        <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Live Preview</span>
      </div>
    </div>
  );
};

export default DualImageFrame;
