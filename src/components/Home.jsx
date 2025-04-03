import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaLightbulb, FaHeart, FaBookmark } from 'react-icons/fa';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="bg-white p-6 rounded-2xl shadow-xl"
  >
    <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
      <Icon className="text-primary text-2xl" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const FloatingShape = ({ children, className }) => (
  <motion.div
    animate={{
      y: [0, 20, 0],
      rotate: [0, 10, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-50 overflow-hidden relative">
      {/* Decorative Elements */}
      <FloatingShape className="hidden lg:block absolute top-20 left-10 text-primary/20">
        <FaLightbulb size={80} />
      </FloatingShape>
      <FloatingShape className="hidden lg:block absolute top-40 right-20 text-secondary/20">
        <FaHeart size={60} />
      </FloatingShape>
      <FloatingShape className="hidden lg:block absolute bottom-20 left-20 text-tertiary/20">
        <FaBookmark size={70} />
      </FloatingShape>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent"
          >
            RememberMe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto"
          >
            Expand your vocabulary effortlessly. Search, learn, and remember new words with our interactive dictionary app.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dictionary')}
            className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            Start Learning
          </motion.button>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon={FaBook}
            title="Comprehensive Definitions"
            description="Access detailed word definitions, pronunciations, and usage examples."
          />
          <FeatureCard
            icon={FaHeart}
            title="Favorites Collection"
            description="Save your favorite words for quick access and regular review."
          />
          <FeatureCard
            icon={FaBookmark}
            title="Bookmarks"
            description="Bookmark words you want to learn and practice later."
          />
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-4xl font-bold text-primary mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Search</h3>
              <p className="text-gray-600">Enter any word you want to learn about</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-4xl font-bold text-secondary mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Learn</h3>
              <p className="text-gray-600">Get comprehensive definitions and examples</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-4xl font-bold text-tertiary mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Remember</h3>
              <p className="text-gray-600">Save words to review and practice later</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}