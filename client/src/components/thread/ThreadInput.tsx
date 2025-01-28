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
    <div className="mb-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Generate Thread</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Select a theme:</label>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="w-full p-2 border rounded"
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
          <label className="block mb-2">Or enter your own theme:</label>
          <input
            type="text"
            value={customTheme}
            onChange={(e) => setCustomTheme(e.target.value)}
            placeholder="Enter a custom theme..."
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default ThreadInput;
