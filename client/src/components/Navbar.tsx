import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Code2, ExternalLink, Terminal, Sparkles, Zap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const [location] = useLocation();
  const isEditorRoute = location === '/editor';

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with animated effects */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/" 
              className="flex items-center space-x-3 group"
            >
              <motion.div
                className="relative"
                animate={{ 
                  rotate: [0, 3, -3, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 6, repeat: Infinity },
                  scale: { duration: 3, repeat: Infinity }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur-sm opacity-30 group-hover:opacity-50 transition-opacity dark:opacity-50 dark:group-hover:opacity-75" />
                <Code2 className="w-8 h-8 text-foreground relative z-10" />
              </motion.div>
              <div className="flex flex-col">
                <motion.span 
                  className="text-xl font-black bg-gradient-to-r from-foreground via-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-white dark:via-purple-200 dark:to-cyan-200"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{ backgroundSize: "200% auto" }}
                >
                  Ar Compiler
                </motion.span>
                <span className="text-xs text-muted-foreground font-medium">by ArmaanRawat.me</span>
              </div>
            </Link>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/docs">
              <motion.div
                whileHover={{ y: -2 }}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
              >
                <Terminal className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium">Docs</span>
              </motion.div>
            </Link>
            <Link href="/languages">
              <motion.div
                whileHover={{ y: -2 }}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
              >
                <Code2 className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium">Languages</span>
              </motion.div>
            </Link>
          </div>

          {/* Action Button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {!isEditorRoute ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/editor">
                  <motion.button
                    className="group relative px-6 py-2 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ boxShadow: "0 8px 25px rgba(147, 51, 234, 0.4)" }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Launch Editor
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500"
                      initial={{ x: "100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-500/20 border border-green-200 dark:border-green-500/30 rounded-lg"
              >
                <motion.div
                  className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-700 dark:text-green-300 text-sm font-medium">Editor Active</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;