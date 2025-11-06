import React from 'react';
import { headerBanner } from '../assets/images';

const Header = () => {
  return (
    <header className="w-full max-w-7xl mx-auto mb-8">
      <img 
        src={headerBanner} 
        alt="MUMANAL Banner" 
        className="w-full h-auto rounded-lg shadow-lg"
      />
    </header>
  );
};

export default Header;
