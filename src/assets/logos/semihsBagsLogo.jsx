import React from 'react';

const SemihsBagsLogo = ({ className = '', size = 'default' }) => {
  const dimensions = {
    small: { width: 40, height: 40 },
    default: { width: 60, height: 60 },
    large: { width: 80, height: 80 },
  };

  const { width, height } = dimensions[size] || dimensions.default;

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 100" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bag body */}
      <path 
        d="M25,35 L75,35 L82,90 L18,90 Z" 
        fill="#8B5A2B" 
        stroke="#4A2511" 
        strokeWidth="2" 
      />
      
      {/* Bag top fold */}
      <path 
        d="M25,35 C25,20 75,20 75,35" 
        fill="none" 
        stroke="#4A2511" 
        strokeWidth="2" 
      />
      
      {/* Bag handles */}
      <path 
        d="M35,35 C35,15 40,10 50,10 C60,10 65,15 65,35" 
        fill="none" 
        stroke="#4A2511" 
        strokeWidth="3" 
        strokeLinecap="round" 
      />
      
      {/* Decorative stitching */}
      <path 
        d="M30,45 L70,45 M30,55 L70,55 M30,65 L70,65 M30,75 L70,75" 
        stroke="#FFFFFF" 
        strokeWidth="1.5" 
        strokeDasharray="2,2" 
      />
      
      {/* "S" initial for Semih */}
      <text 
        x="50" 
        y="60" 
        fontFamily="Arial, sans-serif" 
        fontSize="20" 
        fontWeight="bold" 
        fill="#FFFFFF" 
        textAnchor="middle" 
        dominantBaseline="middle"
      >
        S
      </text>
      
      {/* "Handmade" tag */}
      <rect 
        x="55" 
        y="25" 
        width="30" 
        height="15" 
        fill="#D4A76A" 
        rx="2" 
        transform="rotate(15, 70, 32.5)" 
      />
      <text 
        x="70" 
        y="34" 
        fontFamily="Arial, sans-serif" 
        fontSize="6" 
        fontWeight="bold" 
        fill="#4A2511" 
        textAnchor="middle" 
        dominantBaseline="middle"
        transform="rotate(15, 70, 34)"
      >
        Handmade
      </text>
    </svg>
  );
};

export default SemihsBagsLogo;
