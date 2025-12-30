import React from 'react';

interface BeaverIconProps {
  className?: string;
  size?: number;
}

export const BeaverIcon: React.FC<BeaverIconProps> = ({ className, size = 24 }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tail - paddle shape with grid pattern */}
      <ellipse cx="32" cy="58" rx="12" ry="5" fill="#5D3A1A" />
      <ellipse cx="32" cy="58" rx="10" ry="4" fill="#4A2F15" />
      <line x1="24" y1="58" x2="40" y2="58" stroke="#3D2610" strokeWidth="1" />
      <line x1="26" y1="56" x2="38" y2="56" stroke="#3D2610" strokeWidth="0.5" />
      <line x1="26" y1="60" x2="38" y2="60" stroke="#3D2610" strokeWidth="0.5" />

      {/* Body - chubby pear shape */}
      <ellipse cx="32" cy="40" rx="16" ry="14" fill="#B86B3E" />
      {/* Belly */}
      <ellipse cx="32" cy="42" rx="10" ry="10" fill="#F3B47B" />

      {/* Head */}
      <circle cx="32" cy="22" r="16" fill="#B86B3E" />
      {/* Muzzle/Face */}
      <ellipse cx="32" cy="26" rx="10" ry="8" fill="#F3B47B" />

      {/* Ears */}
      <circle cx="18" cy="10" r="5" fill="#B86B3E" />
      <circle cx="46" cy="10" r="5" fill="#B86B3E" />
      <circle cx="18" cy="10" r="3" fill="#F3B47B" />
      <circle cx="46" cy="10" r="3" fill="#F3B47B" />

      {/* Eyes - teal with white highlights */}
      <circle cx="24" cy="20" r="5" fill="white" />
      <circle cx="40" cy="20" r="5" fill="white" />
      <circle cx="25" cy="21" r="3" fill="#36D1B1" />
      <circle cx="41" cy="21" r="3" fill="#36D1B1" />
      <circle cx="24" cy="19" r="1" fill="white" />
      <circle cx="40" cy="19" r="1" fill="white" />

      {/* Nose */}
      <ellipse cx="32" cy="28" rx="3" ry="2" fill="#5D3A1A" />

      {/* Teeth - characteristic beaver teeth */}
      <rect x="28" y="31" width="4" height="5" rx="1" fill="white" />
      <rect x="33" y="31" width="4" height="5" rx="1" fill="white" />

      {/* Magnifying glass */}
      <circle
        cx="52"
        cy="34"
        r="8"
        fill="#36D1B1"
        fillOpacity="0.5"
        stroke="#5D3A1A"
        strokeWidth="2"
      />
      <line
        x1="46"
        y1="40"
        x2="38"
        y2="48"
        stroke="#5D3A1A"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Small bug in magnifying glass */}
      <ellipse cx="52" cy="34" rx="3" ry="2" fill="#2ECC71" />
      <circle cx="50" cy="33" r="1" fill="#27AE60" />
    </svg>
  );
};

export default BeaverIcon;
