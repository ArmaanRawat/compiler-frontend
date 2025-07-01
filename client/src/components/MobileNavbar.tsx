import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Menu, 
  X, 
  BookOpen, 
  Terminal,
  Settings,
  FileText,
  ExternalLink
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface MobileNavbarProps {
  onLanguageSelect?: () => void;
  onDocsClick?: () => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ 
  onLanguageSelect, 
  onDocsClick 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (action?: () => void) => {
    closeMenu();
    if (action) action();
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm"
      >
        <div className="flex items-center justify-between h-14 px-4">
          {/* Hamburger Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </motion.button>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="relative"
              animate={{ 
                rotate: [0, 2, -2, 0],
              }}
              transition={{ 
                rotate: { duration: 4, repeat: Infinity },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur-sm opacity-30" />
              <Code2 className="w-6 h-6 text-foreground relative z-10" />
            </motion.div>
            <span className="text-lg font-bold bg-gradient-to-r from-foreground via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Ar Compiler
            </span>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </motion.nav>

      {/* Side Panel Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />

            {/* Side Panel */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-72 bg-background border-r border-border z-50 shadow-xl"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-6 h-6 text-primary" />
                  <span className="text-lg font-semibold">Navigation</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Panel Content */}
              <div className="p-4 space-y-2">
                {/* Docs Link */}
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/docs">
                    <button
                      onClick={() => handleNavClick(onDocsClick)}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                    >
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium">Documentation</div>
                        <div className="text-sm text-muted-foreground">Learn how to use the compiler</div>
                      </div>
                    </button>
                  </Link>
                </motion.div>

                {/* Languages Link */}
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/languages">
                    <button
                      onClick={() => handleNavClick(onLanguageSelect)}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                    >
                      <Terminal className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-medium">Languages</div>
                        <div className="text-sm text-muted-foreground">View supported languages</div>
                      </div>
                    </button>
                  </Link>
                </motion.div>

                {/* Divider */}
                <div className="border-t border-border my-4" />

                {/* Additional Options */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground px-3 py-2">
                    Quick Actions
                  </div>
                  
                  {location !== '/editor' && (
                    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                      <Link href="/editor">
                        <button
                          onClick={closeMenu}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                        >
                          <Code2 className="w-5 h-5 text-purple-500" />
                          <div>
                            <div className="font-medium">Launch Editor</div>
                            <div className="text-sm text-muted-foreground">Start coding now</div>
                          </div>
                          <ExternalLink className="w-4 h-4 ml-auto" />
                        </button>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Panel Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-muted/20">
                <div className="text-xs text-muted-foreground text-center">
                  Ar Compiler v1.0
                  <br />
                  by ArmaanRawat.me
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
