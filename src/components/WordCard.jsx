import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaTimes, FaVolumeUp, FaBook, FaQuoteRight } from 'react-icons/fa';

export default function WordCard({ wordData, isList = false, onRemove = null, playingAudio, onAudioPlay }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4 sm:space-y-6"
    >
      {/* Word Title Card */}
      <motion.div
        variants={item}
        className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
              {wordData.word}
            </h2>
            {wordData.phonetic && (
              <div className="mt-2 flex items-center gap-3">
                <span className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light">{wordData.phonetic}</span>
              </div>
            )}
          </div>
          {onRemove && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemove(wordData)}
              className="text-gray-400 hover:text-secondary transition-colors p-2 sm:p-3 rounded-full hover:bg-secondary/10"
            >
              <FaTimes size={20} />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Pronunciation Cards */}
      {wordData.phonetics?.map((phonetic, index) => (
        phonetic.audio && (
            <motion.div
              key={`audio-${index}`}
              variants={item}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-primary/5 to-tertiary/5 p-4 sm:p-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAudioPlay(phonetic.audio, index)}
                className="w-full flex items-center gap-4 sm:gap-6"
              >
                <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
                  playingAudio === index 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-primary hover:bg-primary/10'
                } transition-all duration-300 shadow-md`}>
                  {playingAudio === index ? <FaPause size={20} /> : <FaVolumeUp size={20} />}
                </div>
                <div className="flex-1">
                  <p className="text-base sm:text-lg font-medium text-gray-700 mb-1">Listen to pronunciation</p>
                  <p className="text-sm sm:text-base text-gray-500">{phonetic.text || wordData.phonetic}</p>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )
      ))}

      {/* Meanings Section */}
      {!isList && wordData.meanings?.map((meaning, index) => (
        <motion.div
          key={`meaning-${index}`}
          variants={item}
          className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="bg-gradient-to-r from-primary/10 to-tertiary/10 p-4 sm:p-6 flex items-center gap-4">
            <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md">
              <FaBook className="text-primary" size={20} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 capitalize">
              {meaning.partOfSpeech}
            </h3>
          </div>
          
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {meaning.definitions.map((def, idx) => (
              <motion.div
                key={`def-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 group-hover:bg-gray-100 transition-colors duration-300">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    {def.definition}
                  </p>
                  
                  {def.example && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-3 sm:mt-4 flex items-start gap-3"
                    >
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <FaQuoteRight className="text-primary" size={14} />
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 italic flex-1">
                        "{def.example}"
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}