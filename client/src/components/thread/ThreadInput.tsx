import React, { useEffect, useState } from 'react';
import { threadsApi } from '../../services/api';
import { ICharacter } from '../../types/character';
import { useThread } from '../../context/ThreadContext';
import { useRandomThread } from '../../util/random-thread';

const predefinedThemes = [
  'Technology Trends',
  'Personal Growth',
  'Business Tips',
  'Life Hacks',
  'Career Advice',
  'Healthy Habits',
  'Travel Adventures',
  'Historical Events',
  'Science Discoveries',
  'Book Recommendations',
  'Fitness Routines',
  'Parenting Tips',
  'Financial Planning',
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
  const [error, setError] = useState<string>('');
  const [isBackendReady, setIsBackendReady] = useState(false); // Wait for backend to wake before allowing calls to be made
  const { setCurrentThread, isGenerating, setIsGenerating } = useThread();

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/health`;
        if (import.meta.env.DEV) console.log(`url: ${url}`);
        const response = await fetch(url);
        if (response.ok) {
          setIsBackendReady(true);
        } else {
          setIsBackendReady(false);
        }
      } catch (error) {
        setIsBackendReady(false);
      }
    };
    // Initial check
    checkBackendHealth();

    // Poll every 15 seconds until backend is ready
    const interval = setInterval(() => {
      if (!isBackendReady) {
        checkBackendHealth();
      } else {
        clearInterval(interval);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isBackendReady]);

  const validateCharacters = (): boolean => {
    if (selectedCharacters.length < 2) {
      setError('Please select at least 2 characters for the thread');
      return false;
    }
    if (selectedCharacters.length > 4) {
      setError('Please select no more than 4 characters');
      return false;
    }
    setError('');
    return true;
  };

  const generateThread = async () => {
    if (!validateCharacters()) {
      return;
    }
    setIsGenerating(true);

    try {
      const threadTheme = selectedTheme || 'Technology Trends';
      const threadDto = { theme: threadTheme, characters: selectedCharacters };
      const content = await threadsApi.generateThread(threadDto);
      setCurrentThread(content);
    } catch (error) {
      setError('Failed to generate thread. Please try again.');
      const fallbackThread = useRandomThread();
      setCurrentThread(fallbackThread);
    } finally {
      setIsGenerating(false);
    }
  };

  const getButtonState = () => {
    if (!isBackendReady) {
      return {
        text: 'Warming up the backend...',
        disabled: true,
        className: 'opacity-75 cursor-not-allowed',
      };
    }
    if (isGenerating) {
      return {
        text: 'Generating...',
        disabled: true,
        className: 'opacity-75 cursor-not-allowed',
      };
    }
    return {
      text: 'Generate Thread',
      disabled: false,
      className: 'cursor-pointer hover:bg-blue-600',
    };
  };

  const buttonState = getButtonState();

  return (
    <div className="p-3 lg:p-4 bg-white rounded-lg shadow dark:bg-gray-700">
      <h2 className="text-lg lg:text-xl font-bold mb-3">Generate Thread</h2>
      <div className="space-y-3">
        <div>
          <label className="block mb-1 text-sm">Select a theme:</label>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="w-full p-1.5 border rounded text-sm cursor-pointer dark:bg-gray-600"
          >
            <option value="">Choose a theme...</option>
            {predefinedThemes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <div className="text-red-500 text-sm dark:text-amber-200 dark:text-lg">
            {error}
          </div>
        )}
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
          className={`w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded text-sm transition-colors relative ${buttonState.className}`}
          onClick={generateThread}
          disabled={buttonState.disabled}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {buttonState.text}
            </div>
          ) : (
            buttonState.text
          )}
        </button>
      </div>
    </div>
  );
};

export default ThreadInput;
