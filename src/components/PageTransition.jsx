import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full min-h-screen relative"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
