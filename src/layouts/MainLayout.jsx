import { motion } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';
import { BrainSVG, BooksSVG, LightBulbSVG } from '../components/DecorativeSVGs';
import InfoModal from '../components/InfoModal';

const MainLayout = ({ children, isInfoModalOpen, setIsInfoModalOpen }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-50 text-text-primary p-4 sm:p-6 relative overflow-hidden">
      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
      
      {/* Info Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsInfoModalOpen(true)}
        className="fixed top-4 right-4 z-30 bg-white p-3 rounded-full shadow-lg text-primary hover:text-primary/80 transition-colors"
      >
        <FaInfoCircle size={24} />
      </motion.button>
      
      {/* Decorative SVGs - Hidden on mobile */}
      <div className="hidden lg:block fixed left-0 top-1/4 transform -translate-x-1/2 opacity-70">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <BrainSVG />
        </motion.div>
      </div>
      
      <div className="hidden lg:block fixed right-0 top-1/3 transform translate-x-1/2 opacity-70">
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <BooksSVG />
        </motion.div>
      </div>
      
      <div className="hidden lg:block fixed left-1/4 bottom-0 transform translate-y-1/2 opacity-70">
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 3, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <LightBulbSVG />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MainLayout; 