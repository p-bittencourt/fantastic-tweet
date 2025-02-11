import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-3">About Fantastic Tweet</h2>
      <p className="mb-4">
        This is a portfolio project built with React, NestJs, and the Gemini
        API. It generates fictional conversations between characters using AI.
      </p>

      <h3 className="text-lg font-bold mb-2">How To Use</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>Wait for backend to warm</li>
        <li>Select a theme for the conversation</li>
        <li>Choose 2-4 characters from the gallery</li>
        <li>Generate the thread to see them interact!</li>
      </ol>
    </div>
  );
};

export default About;
