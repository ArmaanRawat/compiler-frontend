import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Copy, Check, AlertCircle, Terminal } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface OutputDisplayProps {
  output: string;
  error: string | null;
  isLoading: boolean;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output, error, isLoading }) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(error || output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy output:', err);
    }
  };

  const content = error || output;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full h-36 sm:h-72 rounded-xl border border-border/50 ${
        theme === 'dark' 
          ? 'bg-black/60 hover:shadow-purple-500/20' 
          : 'bg-white/60 hover:shadow-blue-500/20'
      } backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-300 relative group`}
      whileHover={{ scale: 1.02, boxShadow: theme === 'dark' ? "0 20px 40px rgba(147, 51, 234, 0.1)" : "0 20px 40px rgba(59, 130, 246, 0.1)" }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`h-full flex flex-col items-center justify-center p-2 sm:p-4 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-purple-900/20 to-blue-900/20' 
                  : 'bg-gradient-to-br from-purple-100/20 to-blue-100/20'
              }`}
            >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-lg opacity-50" />
              <Loader2 className="w-6 sm:w-8 h-6 sm:h-8 text-cyan-400 relative z-10" />
            </motion.div>
            <motion.span 
              className={`text-xs sm:text-base font-medium mt-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Compiling & Executing...
            </motion.span>
            <span className={`text-[10px] sm:text-sm mt-1 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>Processing your code</span>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="h-full flex flex-col"
          >
            <motion.div 
              className={`flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 border-b ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-red-900/30 to-red-800/30 border-red-500/30' 
                  : 'bg-gradient-to-r from-red-100/50 to-red-200/50 border-red-300/50'
              }`}
              initial={{ y: -10 }}
              animate={{ y: 0 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 1 }}
              >
                <AlertCircle className={`w-4 sm:w-5 h-4 sm:h-5 ${
                  theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`} />
              </motion.div>
              <span className={`text-xs sm:text-base font-medium ${
                theme === 'dark' ? 'text-red-300' : 'text-red-700'
              }`}>Execution Error</span>
            </motion.div>
            <motion.pre 
              className={`p-2 sm:p-4 flex-1 overflow-auto whitespace-pre-wrap text-[11px] sm:text-sm font-mono ${
                theme === 'dark' 
                  ? 'text-red-300 bg-red-900/10' 
                  : 'text-red-700 bg-red-50/50'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {error}
            </motion.pre>
          </motion.div>
        ) : output ? (
          <motion.div
            key="output"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full flex flex-col"
          >
            <motion.div 
              className={`flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 border-b ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-green-900/30 to-emerald-800/30 border-green-500/30' 
                  : 'bg-gradient-to-r from-green-100/50 to-emerald-200/50 border-green-300/50'
              }`}
              initial={{ y: -10 }}
              animate={{ y: 0 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <Terminal className={`w-4 sm:w-5 h-4 sm:h-5 ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`} />
              </motion.div>
              <span className={`text-xs sm:text-base font-medium ${
                theme === 'dark' ? 'text-green-300' : 'text-green-700'
              }`}>Program Output</span>
            </motion.div>
            <motion.pre 
              className={`p-2 sm:p-4 flex-1 overflow-auto whitespace-pre-wrap text-[11px] sm:text-sm font-mono ${
                theme === 'dark' 
                  ? 'text-gray-100 bg-green-900/5' 
                  : 'text-gray-900 bg-green-50/50'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {output}
            </motion.pre>
          </motion.div>
        ) : (            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`h-full flex flex-col items-center justify-center p-2 sm:p-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Terminal className={`w-8 sm:w-12 h-8 sm:h-12 mb-2 sm:mb-3 ${
                  theme === 'dark' ? 'text-purple-400' : 'text-blue-500'
                }`} />
              </motion.div>
              <p className={`text-xs sm:text-base text-center font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Output will appear here</p>
              <p className={`text-[10px] sm:text-sm opacity-75 mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>Run your code to see the results</p>
            </motion.div>
        )}
      </AnimatePresence>

      {(error || output) && (
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-100 group-hover:opacity-100 transition-opacity duration-200">            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className={`p-1 sm:p-1.5 backdrop-blur-sm rounded-md transition-colors duration-200 text-xs sm:text-base ${
                theme === 'dark' 
                  ? 'bg-white/10 hover:bg-white/20 text-gray-300' 
                  : 'bg-black/10 hover:bg-black/20 text-gray-700'
              }`}
              aria-label="Copy output"
            >
              {copied ? (
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
              ) : (
                <Copy className={`h-3 w-3 sm:h-4 sm:w-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`} />
              )}
            </motion.button>
        </div>
      )}

      {(error || output) && (
        <div className={`absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 text-[9px] sm:text-xs opacity-60 group-hover:opacity-100 transition-opacity duration-200 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {content.length} characters
        </div>
      )}
    </motion.div>
  );
};

export default OutputDisplay;