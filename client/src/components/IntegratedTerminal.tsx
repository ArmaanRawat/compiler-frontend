
import { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, X, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntegratedTerminalProps {
  isOpen: boolean;
  onToggle: () => void;
  height?: number;
  onHeightChange?: (height: number) => void;
}

export function IntegratedTerminal({ 
  isOpen, 
  onToggle, 
  height = 200, 
  onHeightChange 
}: IntegratedTerminalProps) {
  const [history, setHistory] = useState<Array<{ command: string; output: string; timestamp: Date }>>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizerRef.current?.dataset.resizing === 'true') {
        const newHeight = window.innerHeight - e.clientY;
        const clampedHeight = Math.max(100, Math.min(500, newHeight));
        onHeightChange?.(clampedHeight);
      }
    };

    const handleMouseUp = () => {
      if (resizerRef.current) {
        resizerRef.current.dataset.resizing = 'false';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onHeightChange]);

  const executeCommand = async () => {
    if (!currentCommand.trim() || isProcessing) return;

    setIsProcessing(true);
    const command = currentCommand.trim();
    setCurrentCommand('');

    let output = '';
    
    switch (command.toLowerCase()) {
      case 'help':
        output = `Available commands:
  help       - Show this help message
  clear      - Clear terminal history
  date       - Show current date and time
  version    - Show PT version
  languages  - List supported languages
  whoami     - Show current user info
  status     - Show system status`;
        break;
      case 'clear':
        setHistory([]);
        setIsProcessing(false);
        return;
      case 'date':
        output = new Date().toLocaleString();
        break;
      case 'version':
        output = 'Ar Compiler v2.0 - Online Code Execution Platform';
        break;
      case 'languages':
        output = 'Supported: Python, JavaScript, TypeScript, Java, C++, C, Go, Rust, Kotlin, C#, BasicCode';
        break;
      case 'whoami':
        output = 'guest@PT-compiler';
        break;
      case 'status':
        output = 'System Status: Online | CPU: Normal | Memory: Available';
        break;
      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    await new Promise(resolve => setTimeout(resolve, 300));

    setHistory(prev => [...prev, {
      command,
      output,
      timestamp: new Date()
    }]);
    setIsProcessing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand();
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleResizerMouseDown = () => {
    if (resizerRef.current) {
      resizerRef.current.dataset.resizing = 'true';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isMinimized ? 40 : height, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 flex flex-col z-30"
          style={{ height: isMinimized ? 40 : height }}
        >
          {/* Resizer */}
          <div
            ref={resizerRef}
            onMouseDown={handleResizerMouseDown}
            className="h-1 bg-gray-700 hover:bg-gray-600 cursor-row-resize transition-colors"
            data-resizing="false"
          />

          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center gap-2 text-green-400">
              <Terminal className="w-4 h-4" />
              <span className="text-sm font-medium">Terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearHistory}
                className="text-gray-400 hover:text-gray-200 transition-colors"
                title="Clear terminal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
                title={isMinimized ? "Maximize" : "Minimize"}
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                className="text-gray-400 hover:text-gray-200 transition-colors"
                title="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Content */}
          {!isMinimized && (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Terminal Output */}
              <div
                ref={terminalRef}
                className="flex-1 bg-black p-4 overflow-y-auto font-mono text-sm text-green-400"
              >
                {/* Welcome Message */}
                {history.length === 0 && (
                  <div className="text-green-500 mb-4">
                    <p>Welcome to PT Terminal v2.0</p>
                    <p>Type 'help' for available commands.</p>
                    <br />
                  </div>
                )}

                {/* Command History */}
                {history.map((entry, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex items-center gap-2 text-green-400">
                      <span className="text-green-600">guest@PT:</span>
                      <span className="text-blue-400">~$</span>
                      <span>{entry.command}</span>
                    </div>
                    <div className="text-green-300 ml-4 whitespace-pre-wrap">
                      {entry.output}
                    </div>
                  </div>
                ))}

                {/* Current Command Line */}
                <div className="flex items-center gap-2">
                  <span className="text-green-600">guest@PT:</span>
                  <span className="text-blue-400">~$</span>
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={currentCommand}
                      onChange={(e) => setCurrentCommand(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 bg-transparent border-none outline-none text-green-400"
                      placeholder={isProcessing ? "Processing..." : "Enter command..."}
                      disabled={isProcessing}
                      autoFocus
                    />
                    {isProcessing && (
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-5 bg-green-400"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Command Input Bar */}
              <div className="flex gap-2 p-3 bg-gray-800 border-t border-gray-700">
                <input
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-green-400 placeholder-gray-400 text-sm"
                  placeholder="Type command and press Enter..."
                  disabled={isProcessing}
                />
                <button
                  onClick={executeCommand}
                  disabled={!currentCommand.trim() || isProcessing}
                  className="px-4 py-2 bg-green-700 text-green-200 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Run
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
