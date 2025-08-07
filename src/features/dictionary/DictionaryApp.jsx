import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useDictionary } from '../../hooks/useDictionary';
import { useStorage } from '../../hooks/useStorage';
import MainLayout from '../../layouts/MainLayout';
import Navigation from '../../components/Navigation';
import SearchBar from '../../components/SearchBar';
import WordCard from '../../components/WordCard';
import EmptyState from '../../components/EmptyState';
import ActionButtons from '../../components/ActionButtons';
// === PASO 1: IMPORTAR EL COMPONENTE ChatBot ===
import ChatBot from '../../components/ChatBot';

function DictionaryApp() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('search');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  
  const {
    word,
    setWord,
    wordData, // <-- wordData contiene la información de la palabra encontrada
    loading,
    playingAudio,
    error,
    handleSearch,
    handleAudioPlay,
    resetDictionary
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

  // Resetear la búsqueda al cambiar de vista
  useEffect(() => {
    if (currentView !== 'search') {
      resetDictionary();
    }
  }, [currentView, resetDictionary]);

  const handleSearchWithToast = async () => {
    const result = await handleSearch();
    
    if (result.success) {
      toast.success('Word found!');
    } else {
      // No mostrar toast para búsqueda vacía (ya se muestra en la UI)
      if (result.error !== 'Please enter a word!') {
        toast.error(result.error || 'Error searching word');
      }
    }
  };

  const handleAddToFavorites = () => {
    if (!wordData) {
      toast.error('No word to add');
      return;
    }
    
    try {
      const success = addToFavorites(wordData);
      if (success) {
        toast.success('Added to favorites!');
      } else {
        toast.error('Already in favorites');
      }
    } catch (err) {
      console.error('Error adding to favorites:', err);
      toast.error('Failed to add to favorites');
    }
  };

  const handleAddToBookmarks = () => {
    if (!wordData) {
      toast.error('No word to bookmark');
      return;
    }
    
    try {
      const success = addToBookmarks(wordData);
      if (success) {
        toast.success('Bookmarked!');
      } else {
        toast.error('Already bookmarked');
      }
    } catch (err) {
      console.error('Error adding to bookmarks:', err);
      toast.error('Failed to bookmark');
    }
  };

  return (
    <MainLayout isInfoModalOpen={isInfoModalOpen} setIsInfoModalOpen={setIsInfoModalOpen}>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
          },
          error: {
            duration: 4000,
          }
        }}
      />
      
      <motion.h1 
        onClick={() => navigate('/')}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        RememberMe
      </motion.h1>

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
            className="space-y-6"
          >
            <SearchBar
              word={word}
              setWord={setWord}
              onSearch={handleSearchWithToast}
              loading={loading}
              error={error}
            />

            {wordData && (
              <>
                <ActionButtons
                  onAddToFavorites={handleAddToFavorites}
                  onAddToBookmarks={handleAddToBookmarks}
                />
                
                <WordCard
                  wordData={wordData}
                  playingAudio={playingAudio}
                  onAudioPlay={(audioUrl) => handleAudioPlay(audioUrl, wordData.word)}
                />

                {/* ChatBot flotante ahora es global, se elimina de aquí */}
              </>
            )}
          </motion.div>
        )}

        {currentView === 'favorites' && (
          <motion.div
            key="favorites"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {favorites.length === 0 ? (
              <EmptyState type="favorites" />
            ) : (
              favorites.map((word, index) => (
                <motion.div
                  key={`${word.word}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <WordCard
                    wordData={word}
                    isList={true}
                    onRemove={() => removeFromFavorites(word)}
                    playingAudio={playingAudio}
                    onAudioPlay={(audioUrl) => handleAudioPlay(audioUrl, word.word)}
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
            className="space-y-6"
          >
            {bookmarks.length === 0 ? (
              <EmptyState type="bookmarks" />
            ) : (
              bookmarks.map((word, index) => (
                <motion.div
                  key={`${word.word}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <WordCard
                    wordData={word}
                    isList={true}
                    onRemove={() => removeFromBookmarks(word)}
                    playingAudio={playingAudio}
                    onAudioPlay={(audioUrl) => handleAudioPlay(audioUrl, word.word)}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* ChatBot flotante, solo visible si hay palabra seleccionada */}
      <ChatBot currentWord={wordData?.word} />
    </MainLayout>
  );
}

export default DictionaryApp;