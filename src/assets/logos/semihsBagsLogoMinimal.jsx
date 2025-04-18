import React from 'react';

const SemihsBagsLogoMinimal = ({ className = '', size = 'small', color = '#FFFFFF' }) => {
  const dimensions = {
    tiny: { width: 24, height: 24 },
    small: { width: 36, height: 36 },
    default: { width: 50, height: 50 },
  };

  const { width, height } = dimensions[size] || dimensions.small;

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 100" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified Bag body - just the outline */}
      <path 
        d="M25,35 L75,35 L82,90 L18,90 Z M25,35 C25,20 75,20 75,35" 
        fill="none" 
        stroke={color} 
        strokeWidth="3" 
      />
      
      {/* Simplified Bag handle */}
      <path 
        d="M35,35 C35,15 40,10 50,10 C60,10 65,15 65,35" 
        fill="none" 
        stroke={color} 
        strokeWidth="3" 
        strokeLinecap="round" 
      />
      
      {/* "S" initial for Semih */}
      <text 
        x="50" 
        y="60" 
        fontFamily="Arial, sans-serif" 
        fontSize="24" 
        fontWeight="bold" 
        fill={color} 
        textAnchor="middle" 
        dominantBaseline="middle"
      >
        S
      </text>
    </svg>
  );
};

export default SemihsBagsLogoMinimal;
