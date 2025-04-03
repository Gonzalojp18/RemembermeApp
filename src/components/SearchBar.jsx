import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ word, setWord, onSearch, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
      <div className="flex-1 relative">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a word..."
          className="w-full p-4 sm:p-6 rounded-2xl border-2 border-gray-100 focus:border-primary outline-none transition-all text-base sm:text-lg shadow-sm"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-sm sm:text-base">
          press Enter ↵
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSearch}
        className="w-full sm:w-auto bg-primary text-white px-6 sm:px-8 py-4 sm:py-0 rounded-2xl flex items-center justify-center gap-3 text-base sm:text-lg font-medium shadow-lg shadow-primary/20"
        disabled={loading}
      >
        <FaSearch />
        {loading ? 'Searching...' : 'Search'}
      </motion.button>
    </div>
  );
}