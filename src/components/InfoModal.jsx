import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSearch, FaHeart, FaBookmark, FaVolumeUp, FaInfoCircle } from 'react-icons/fa';

export default function InfoModal({ isOpen, onClose }) {
  const features = [
    {
      icon: FaSearch,
      title: 'Search Words',
      description: 'Enter any word to get detailed definitions, pronunciations, and examples.'
    },
    {
      icon: FaVolumeUp,
      title: 'Listen to Pronunciation',
      description: 'Hear the correct pronunciation of words to improve your speaking.'
    },
    {
      icon: FaHeart,
      title: 'Save Favorites',
      description: 'Keep track of important words by adding them to your favorites.'
    },
    {
      icon: FaBookmark,
      title: 'Bookmark for Later',
      description: 'Bookmark words you want to study or review later.'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-4 sm:inset-8 md:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-auto"
          >
            <div className="relative p-6 sm:p-8 md:p-12">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </motion.button>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent"
              >
                About RememberMe
              </motion.h2>

              {/* What Is This Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 p-6 bg-gray-50 rounded-2xl"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary/10 p-4 rounded-xl">
                    <FaInfoCircle className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">What Is This?</h3>
                    <p className="text-gray-600 mb-4">
                      This is a tool for reading International Phonetic Alphabet (IPA) notation aloud.
                      It makes it easy to actually hear how words are pronounced based on their phonetic spelling,
                      without having to look up each character in the IPA chart and string the sounds together yourself.
                    </p>
                    <div className="bg-primary/5 p-4 rounded-xl">
                      <p className="text-gray-700">
                        <span className="font-semibold">Example:</span> "Conversation" can be pronounced according to its IPA notation /ˌkɒn.Vəˈseɪ.Ʃən/
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-4 rounded-xl">
                        <feature.icon className="text-primary text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pro Tips Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 p-6 bg-primary/5 rounded-2xl"
              >
                <h3 className="text-xl font-semibold mb-4">Pro Tips</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Press Enter after typing to quickly search for a word</li>
                  <li>• Click on the audio icon to hear pronunciations</li>
                  <li>• Use favorites for words you want to remember</li>
                  <li>• Bookmark words to create a study list</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}