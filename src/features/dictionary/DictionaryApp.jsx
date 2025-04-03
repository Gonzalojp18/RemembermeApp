import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { useDictionary } from '../../hooks/useDictionary';
import { useStorage } from '../../hooks/useStorage';
import { motion } from 'framer-motion';
import MainLayout from '../../layouts/MainLayout';
import Navigation from '../../components/Navigation';
import SearchBar from '../../components/SearchBar';
import WordCard from '../../components/WordCard';
import EmptyState from '../../components/EmptyState';
import ActionButtons from '../../components/ActionButtons';

function DictionaryApp() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('search');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  
  const {
    word,
    setWord,
    wordData,
    loading,
    playingAudio,
    handleSearch,
    handleAudioPlay,
  } = useDictionary();

  const {
    items: favorites,
    addItem: addToFavorites,
    removeItem: removeFromFavorites,
  } = useStorage('favorites');

  const {
    items: bookmarks,
    addItem: addToBookmarks,
    removeItem: removeFromBookmarks,
  } = useStorage('bookmarks');

  const handleSearchWithToast = async () => {
    const result = await handleSearch();
    if (result.success) {
      toast.success('Word found!');
    } else {
      toast.error(result.error);
    }
  };

  const handleAddToFavorites = () => {
    if (wordData && addToFavorites(wordData)) {
      toast.success('Added to favorites!');
    }
  };

  const handleAddToBookmarks = () => {
    if (wordData && addToBookmarks(wordData)) {
      toast.success('Bookmarked!');
    }
  };

  return (
    <MainLayout isInfoModalOpen={isInfoModalOpen} setIsInfoModalOpen={setIsInfoModalOpen}>
      <Toaster position="top-center" />
      
      <h1 
        onClick={() => navigate('/')}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
      >
        RememberMe
      </h1>

      <Navigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        favoritesCount={favorites.length}
        bookmarksCount={bookmarks.length}
      />

      <AnimatePresence mode="wait">
        {currentView === 'search' && (
          <motion.div
            key="search"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <SearchBar
              word={word}
              setWord={setWord}
              onSearch={handleSearchWithToast}
              loading={loading}
            />

            {wordData && (
              <ActionButtons
                onAddToFavorites={handleAddToFavorites}
                onAddToBookmarks={handleAddToBookmarks}
              />
            )}

            {wordData && (
              <WordCard
                wordData={wordData}
                playingAudio={playingAudio}
                onAudioPlay={handleAudioPlay}
              />
            )}
          </motion.div>
        )}

        {currentView === 'favorites' && (
          <motion.div
            key="favorites"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4 sm:space-y-6"
          >
            {favorites.length === 0 ? (
              <EmptyState type="favorites" />
            ) : (
              favorites.map((word, index) => (
                <motion.div
                  key={word.word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <WordCard
                    wordData={word}
                    isList={true}
                    onRemove={removeFromFavorites}
                    playingAudio={playingAudio}
                    onAudioPlay={handleAudioPlay}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {currentView === 'bookmarks' && (
          <motion.div
            key="bookmarks"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4 sm:space-y-6"
          >
            {bookmarks.length === 0 ? (
              <EmptyState type="bookmarks" />
            ) : (
              bookmarks.map((word, index) => (
                <motion.div
                  key={word.word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <WordCard
                    wordData={word}
                    isList={true}
                    onRemove={removeFromBookmarks}
                    playingAudio={playingAudio}
                    onAudioPlay={handleAudioPlay}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}

export default DictionaryApp; 