import { motion } from 'framer-motion';
import { FaHeart, FaBookmark } from 'react-icons/fa';

export default function EmptyState({ type }) {
  const config = {
    favorites: {
      icon: FaHeart,
      color: 'secondary',
      title: 'No favorite words yet',
      description: 'Search for words and add them to your favorites'
    },
    bookmarks: {
      icon: FaBookmark,
      color: 'tertiary',
      title: 'No bookmarked words yet',
      description: 'Search for words and bookmark them for later'
    }
  }[type];

  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12 text-gray-500"
    >
      <Icon className={`mx-auto mb-4 text-${config.color}/50`} size={48} />
      <p className="text-xl">{config.title}</p>
      <p className="text-sm mt-2">{config.description}</p>
    </motion.div>
  );
}