import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex space-x-4">
            <a
              href="https://github.com/p-bittencourt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/pedro-m-bittencourt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <div className="text-sm text-gray-500">
            BIT Productions © {new Date().getFullYear()} Fantastweet. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
