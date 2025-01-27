import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
          {/* Logo placeholder */}
          <span className="text-blue-500 font-bold text-xl">F</span>
        </div>
        <h1 className="text-white text-2xl font-bold">Fantastweet</h1>
      </div>
    </header>
  );
};

export default Header;
