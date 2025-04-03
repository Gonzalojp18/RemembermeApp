import { motion } from 'framer-motion';

export default function Navigation({ currentView, setCurrentView, favoritesCount, bookmarksCount }) {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentView('search')}
        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-colors ${
          currentView === 'search'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Search
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentView('favorites')}
        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-colors ${
          currentView === 'favorites'
            ? 'bg-secondary text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Favorites ({favoritesCount})
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentView('bookmarks')}
        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-colors ${
          currentView === 'bookmarks'
            ? 'bg-tertiary text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Bookmarks ({bookmarksCount})
      </motion.button>
    </div>
  );
}