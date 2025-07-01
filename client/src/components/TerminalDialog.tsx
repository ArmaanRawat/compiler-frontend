
import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Terminal, Send, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface TerminalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TerminalDialog({ open, onOpenChange }: TerminalDialogProps) {
  const [history, setHistory] = useState<Array<{ command: string; output: string; timestamp: Date }>>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = async () => {
    if (!currentCommand.trim() || isProcessing) return;

    setIsProcessing(true);
    const command = currentCommand.trim();
    setCurrentCommand('');

    // Simulate command execution
    let output = '';
    
    switch (command.toLowerCase()) {
      case 'help':
        output = `Available commands:
  help       - Show this help message
  clear      - Clear terminal history
  date       - Show current date and time
  version    - Show PT version
  languages  - List supported languages
  whoami     - Show current user info`;
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
        output = 'Supported: Python, JavaScript, TypeScript, Java, C++, C, Go, Rust, Kotlin, C#, BAC';
        break;
      case 'whoami':
        output = 'guest@PT-compiler';
        break;
      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    // Simulate processing delay
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] bg-black text-green-400 font-mono">
        <DialogHeader className="border-b border-green-800/30 pb-3">
          <DialogTitle className="flex items-center justify-between text-green-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              PT Terminal
            </div>
            <button
              onClick={clearHistory}
              className="text-green-600 hover:text-green-400 transition-colors"
              title="Clear terminal"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Terminal Output */}
          <div
            ref={terminalRef}
            className="bg-black rounded-lg p-4 h-80 overflow-y-auto border border-green-800/30"
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

          {/* Command Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-green-950/20 border border-green-800/30 rounded px-3 py-2 text-green-400 placeholder-green-600"
              placeholder="Type command and press Enter..."
              disabled={isProcessing}
            />
            <button
              onClick={executeCommand}
              disabled={!currentCommand.trim() || isProcessing}
              className="px-4 py-2 bg-green-800 text-green-200 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Run
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
