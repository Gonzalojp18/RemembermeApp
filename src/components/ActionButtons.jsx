import { motion } from 'framer-motion';
import { FaHeart, FaBookmark } from 'react-icons/fa';

export default function ActionButtons({ onAddToFavorites, onAddToBookmarks }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onAddToFavorites}
          className="text-secondary hover:text-secondary/80 transition-colors p-3 rounded-full bg-secondary/10"
        >
          <FaHeart size={24} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onAddToBookmarks}
          className="text-tertiary hover:text-tertiary/80 transition-colors p-3 rounded-full bg-tertiary/10"
        >
          <FaBookmark size={24} />
        </motion.button>
      </div>
    </div>
  );
}