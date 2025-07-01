import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import CompilerView from "../components/CompilerView";

// Lazy load ThreeBackground to reduce initial bundle size
const ThreeBackground = lazy(() => import("../components/ThreeBackground"));

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-black pt-16 relative overflow-hidden">
      <Suspense 
        fallback={
          <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 -z-10 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-white/60">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading 3D background...</span>
            </div>
          </div>
        }
      >
        <ThreeBackground />
      </Suspense>
      
      {/* Animated gradient overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 top-16 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none"
      />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 top-16 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <CompilerView />
      </motion.div>
    </div>
  );
} 