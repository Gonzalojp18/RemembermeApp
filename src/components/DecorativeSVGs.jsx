import { motion } from 'framer-motion';

export const BrainSVG = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    width="180"
    height="180"
    viewBox="0 0 24 24"
    fill="none"
    className="text-primary/20"
  >
    <path
      d="M12 2C7.58172 2 4 5.58172 4 10C4 12.9087 5.4049 15.3827 7.52779 16.9293C7.51457 16.9528 7.5 16.9754 7.5 17V20C7.5 20.5523 7.94772 21 8.5 21H15.5C16.0523 21 16.5 20.5523 16.5 20V17C16.5 16.9754 16.4854 16.9528 16.4722 16.9293C18.5951 15.3827 20 12.9087 20 10C20 5.58172 16.4183 2 12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity }}
      d="M12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

export const BooksSVG = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    width="180"
    height="180"
    viewBox="0 0 24 24"
    fill="none"
    className="text-tertiary/20"
  >
    <motion.path
      initial={{ x: -10 }}
      animate={{ x: 0 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

export const LightBulbSVG = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    width="180"
    height="180"
    viewBox="0 0 24 24"
    fill="none"
    className="text-secondary/20"
  >
    <motion.path
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      d="M9 18H15M10 21H14M12 3C8.68629 3 6 5.68629 6 9C6 10.2145 6.36084 11.3447 6.98117 12.2893C7.93527 13.7418 9 15.3667 9 17H15C15 15.3667 16.0647 13.7418 17.0188 12.2893C17.6392 11.3447 18 10.2145 18 9C18 5.68629 15.3137 3 12 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);