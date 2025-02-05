import React, { useState } from 'react';

const predefinedThemes = [
  'Technology Trends',
  'Personal Growth',
  'Business Tips',
  'Life Hacks',
  'Career Advice',
];

const ThreadInput: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [customTheme, setCustomTheme] = useState('');

  return (
    <div className="p-3 lg:p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg lg:text-xl font-bold mb-3">Generate Thread</h2>
      <div className="space-y-3">
        <div>
          <label className="block mb-1 text-sm">Select a theme:</label>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="w-full p-1.5 border rounded text-sm"
          >
            <option value="">Choose a theme...</option>
            {predefinedThemes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm">Or enter your own theme:</label>
          <input
            type="text"
            value={customTheme}
            onChange={(e) => setCustomTheme(e.target.value)}
            placeholder="Enter a custom theme..."
            className="w-full p-1.5 border rounded text-sm"
          />
        </div>
        <button
          className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded text-sm transition-colors"
          onClick={() => {
            /* TODO: handle generation */
          }}
        >
          Generate Thread
        </button>
      </div>
    </div>
  );
};

export default ThreadInput;
