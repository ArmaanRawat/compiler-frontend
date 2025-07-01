
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'client' | 'api' | 'controller' | 'service' | 'language';
  delay: number;
}

interface Connection {
  from: string;
  to: string;
  delay: number;
}

const nodes: Node[] = [
  { id: 'client', label: 'Client (User sends code to compile)', x: 800, y: 50, type: 'client', delay: 0 },
  { id: 'api', label: 'API receives request and initializes service', x: 800, y: 150, type: 'api', delay: 0.2 },
  { id: 'router', label: 'Request is routed to appropriate handler', x: 500, y: 250, type: 'controller', delay: 0.4 },
  { id: 'compile-route', label: 'Route request to compile code', x: 200, y: 350, type: 'controller', delay: 0.6 },
  { id: 'langs-route', label: 'Route request to fetch supported languages', x: 500, y: 350, type: 'controller', delay: 0.6 },
  { id: 'controller', label: 'Pass compile request to controller', x: 800, y: 350, type: 'controller', delay: 0.8 },
  { id: 'env-vars', label: 'Environment variables are loaded', x: 1100, y: 250, type: 'service', delay: 1.0 },
  { id: 'lang-controller', label: 'LanguagesController', x: 1100, y: 350, type: 'controller', delay: 1.2 },
  { id: 'load-config', label: 'Load language list from configuration', x: 1100, y: 450, type: 'service', delay: 1.4 },
  { id: 'docs', label: 'API documentation is prepared', x: 1350, y: 350, type: 'service', delay: 1.6 },
  { id: 'swagger', label: 'Serve Swagger UI and spec', x: 1200, y: 550, type: 'service', delay: 1.8 },
  { id: 'internal-docs', label: 'Serve internal documentation', x: 1400, y: 550, type: 'service', delay: 2.0 },
  { id: 'create-temp', label: 'Create temp file with user code', x: 200, y: 450, type: 'service', delay: 2.2 },
  { id: 'cleanup', label: 'Clean up temp files', x: 500, y: 500, type: 'service', delay: 2.4 },
  { id: 'return-result', label: 'Return result of compilation', x: 500, y: 600, type: 'service', delay: 2.6 },
  { id: 'execute-code', label: 'ExecuteCode', x: 800, y: 650, type: 'controller', delay: 2.8 },
  { id: 'javascript', label: 'JavaScript', x: 250, y: 750, type: 'language', delay: 3.0 },
  { id: 'typescript', label: 'TypeScript', x: 400, y: 750, type: 'language', delay: 3.1 },
  { id: 'python', label: 'Python', x: 550, y: 750, type: 'language', delay: 3.2 },
  { id: 'go', label: 'Go', x: 700, y: 750, type: 'language', delay: 3.3 },
  { id: 'java', label: 'Java', x: 850, y: 750, type: 'language', delay: 3.4 },
  { id: 'rust', label: 'Rust', x: 1000, y: 750, type: 'language', delay: 3.5 },
  { id: 'kotlin', label: 'Kotlin', x: 1150, y: 750, type: 'language', delay: 3.6 },
  { id: 'cpp', label: 'C++', x: 1300, y: 750, type: 'language', delay: 3.7 },
  { id: 'custom-compiler', label: 'CustomCompiler', x: 1000, y: 850, type: 'service', delay: 4.0 },
  { id: 'lexer', label: 'Lexer (Generate tokens from code)', x: 650, y: 950, type: 'service', delay: 4.2 },
  { id: 'parser', label: 'Parser (Create syntax tree from tokens)', x: 800, y: 1050, type: 'service', delay: 4.4 },
  { id: 'ast', label: 'Build AST', x: 1100, y: 950, type: 'service', delay: 4.6 },
  { id: 'symbol-table', label: 'SymbolTable (Track variables and scopes)', x: 1350, y: 950, type: 'service', delay: 4.8 },
  { id: 'codegen', label: 'CodeGen (Generate machine/intermediate code)', x: 1100, y: 1050, type: 'service', delay: 5.0 }
];

const connections: Connection[] = [
  { from: 'client', to: 'api', delay: 0.3 },
  { from: 'api', to: 'router', delay: 0.5 },
  { from: 'api', to: 'env-vars', delay: 1.1 },
  { from: 'router', to: 'compile-route', delay: 0.7 },
  { from: 'router', to: 'langs-route', delay: 0.7 },
  { from: 'router', to: 'controller', delay: 0.9 },
  { from: 'env-vars', to: 'lang-controller', delay: 1.3 },
  { from: 'lang-controller', to: 'load-config', delay: 1.5 },
  { from: 'env-vars', to: 'docs', delay: 1.7 },
  { from: 'docs', to: 'swagger', delay: 1.9 },
  { from: 'docs', to: 'internal-docs', delay: 2.1 },
  { from: 'compile-route', to: 'create-temp', delay: 2.3 },
  { from: 'create-temp', to: 'cleanup', delay: 2.5 },
  { from: 'cleanup', to: 'return-result', delay: 2.7 },
  { from: 'controller', to: 'execute-code', delay: 2.9 },
  { from: 'execute-code', to: 'javascript', delay: 3.1 },
  { from: 'execute-code', to: 'typescript', delay: 3.2 },
  { from: 'execute-code', to: 'python', delay: 3.3 },
  { from: 'execute-code', to: 'go', delay: 3.4 },
  { from: 'execute-code', to: 'java', delay: 3.5 },
  { from: 'execute-code', to: 'rust', delay: 3.6 },
  { from: 'execute-code', to: 'kotlin', delay: 3.7 },
  { from: 'execute-code', to: 'cpp', delay: 3.8 },
  { from: 'cpp', to: 'custom-compiler', delay: 4.1 },
  { from: 'custom-compiler', to: 'lexer', delay: 4.3 },
  { from: 'custom-compiler', to: 'ast', delay: 4.7 },
  { from: 'custom-compiler', to: 'symbol-table', delay: 4.9 },
  { from: 'lexer', to: 'parser', delay: 4.5 },
  { from: 'parser', to: 'codegen', delay: 5.1 },
  { from: 'ast', to: 'codegen', delay: 5.2 },
  { from: 'symbol-table', to: 'codegen', delay: 5.3 },
  { from: 'langs-route', to: 'lang-controller', delay: 1.4 },
  { from: 'return-result', to: 'client', delay: 2.8 }
];

const getNodeColor = (type: string) => {
  switch (type) {
    case 'client': return 'from-blue-500 to-blue-600';
    case 'api': return 'from-purple-500 to-purple-600';
    case 'controller': return 'from-green-500 to-green-600';
    case 'service': return 'from-orange-500 to-orange-600';
    case 'language': return 'from-cyan-500 to-cyan-600';
    default: return 'from-gray-500 to-gray-600';
  }
};

const ConnectionLine: React.FC<{ from: Node; to: Node; delay: number }> = ({ from, to, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) return null;

  return (
    <motion.line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="url(#gradient)"
      strokeWidth="3"
      strokeDasharray="5,5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.7 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    />
  );
};

const NodeComponent: React.FC<{ node: Node }> = ({ node }) => {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: node.delay,
        duration: 0.5,
        type: "spring",
        bounce: 0.4
      }}
    >
      <motion.rect
        x={node.x - 100}
        y={node.y - 25}
        width="200"
        height="50"
        rx="8"
        className={`fill-current bg-gradient-to-r ${getNodeColor(node.type)}`}
        style={{ fill: `url(#${node.type}Gradient)` }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
      <motion.text
        x={node.x}
        y={node.y + 5}
        textAnchor="middle"
        className="fill-white text-sm font-medium"
        style={{ fontSize: '12px' }}
      >
        {node.label.length > 35 ? `${node.label.substring(0, 32)}...` : node.label}
      </motion.text>
    </motion.g>
  );
};

export const ArchitectureGraph: React.FC = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border border-border p-4">
      <div className="w-full h-[1200px] relative">
        <svg width="100%" height="100%" viewBox="0 0 1600 1200" className="absolute inset-0" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="clientGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="apiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="controllerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="serviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="languageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>

          {/* Render connections */}
          {animationStarted && connections.map((conn, index) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            
            return (
              <ConnectionLine
                key={index}
                from={fromNode}
                to={toNode}
                delay={conn.delay}
              />
            );
          })}

          {/* Render nodes */}
          {nodes.map((node) => (
            <NodeComponent key={node.id} node={node} />
          ))}
        </svg>

        {/* Legend */}
        <motion.div 
          className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-border shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <h3 className="font-semibold mb-3 text-sm">Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
              <span className="text-sm">Client</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded"></div>
              <span className="text-sm">API</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded"></div>
              <span className="text-sm">Controller</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded"></div>
              <span className="text-sm">Service</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded"></div>
              <span className="text-sm">Language</span>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div 
          className="absolute top-4 left-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Ar Compiler Architecture
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Animated flow of code compilation process
          </p>
        </motion.div>
      </div>
    </div>
  );
};
