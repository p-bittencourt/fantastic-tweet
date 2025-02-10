import React from 'react';
import { threadsApi } from '../../services/api';
import { ICharacter } from '../../types/character';

const predefinedThemes = [
  'Technology Trends',
  'Personal Growth',
  'Business Tips',
  'Life Hacks',
  'Career Advice',
];

interface ThreadInputProps {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  selectedCharacters: ICharacter[];
}

const ThreadInput: React.FC<ThreadInputProps> = ({
  selectedTheme,
  setSelectedTheme,
  selectedCharacters,
}) => {
  const generateThread = async () => {
    // TODO: Limit character selection to 4 and warn user
    // TODO: Character selection cannot be empty
    // TODO: Inform users that the first selected character is the one that generates the initial thread
    // TODO: Indicate that it's loading and waiting for an answer
    const threadTheme =
      selectedTheme === '' ? 'Technology Trends' : selectedTheme;
    const threadDto = { theme: threadTheme, characters: selectedCharacters };
    const content = await threadsApi.generateThread(threadDto);
    console.log(content);
  };

  return (
    <div className="p-3 lg:p-4 bg-white rounded-lg shadow dark:bg-amber-700">
      <h2 className="text-lg lg:text-xl font-bold mb-3">Generate Thread</h2>
      <div className="space-y-3">
        <div>
          <label className="block mb-1 text-sm">Select a theme:</label>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="w-full p-1.5 border rounded text-sm cursor-pointer"
          >
            <option value="">Choose a theme...</option>
            {predefinedThemes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>
        {/*
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
        */}
        <button
          className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded text-sm transition-colors cursor-pointer"
          onClick={generateThread}
        >
          Generate Thread
        </button>
      </div>
    </div>
  );
};

export default ThreadInput;
