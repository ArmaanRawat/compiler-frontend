import { motion } from 'framer-motion';
import { Github, Heart, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-6 sm:py-8 bg-muted/50 dark:bg-black/50 backdrop-blur-md border-t border-border dark:border-white/10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 text-foreground dark:text-white"
          >
            <span>Built and developed by</span>
            <a 
              href="https://ArmaanRawat.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200 font-medium"
            >
              ArmaanRawat.me
            </a>
          </motion.div>

          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <motion.a
              href="https://github.com/ArmaanRawat/compiler-frontend"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </div>

          <div className="text-xs sm:text-sm text-muted-foreground dark:text-gray-400 mt-2 sm:mt-0">
            © {new Date().getFullYear()} Armaan Rawat. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;