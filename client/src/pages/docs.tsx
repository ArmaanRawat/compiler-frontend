
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Code, Terminal, Zap, BookOpen, Download, Upload, Keyboard, Settings } from 'lucide-react';
import { ArchitectureGraph } from '../components/ArchitectureGraph';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            PT Documentation
          </h1>
          <p className="text-xl text-muted-foreground">
            Complete guide to using Ar Compiler
          </p>
        </motion.div>

        {/* Quick Start */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Quick Start
          </h2>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
            <ol className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <span>Choose your programming language from the dropdown</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <span>Write your code in the editor</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <span>Add input if needed in the input panel</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                <span>Click Run or press Ctrl+Enter to execute</span>
              </li>
            </ol>
          </div>
        </motion.section>

        {/* Keyboard Shortcuts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Keyboard className="w-6 h-6 text-blue-500" />
            Keyboard Shortcuts
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
              <h3 className="font-semibold mb-3">Code Execution</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Run Code</span>
                  <kbd className="bg-muted px-2 py-1 rounded text-muted-foreground">Ctrl+Enter</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Stop Execution</span>
                  <kbd className="bg-muted px-2 py-1 rounded text-muted-foreground">Ctrl+Shift+C</kbd>
                </div>
              </div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
              <h3 className="font-semibold mb-3">File Operations</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Download Code</span>
                  <kbd className="bg-muted px-2 py-1 rounded text-muted-foreground">Ctrl+S</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Upload File</span>
                  <kbd className="bg-muted px-2 py-1 rounded text-muted-foreground">Ctrl+O</kbd>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Supported Languages */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-green-500" />
            Supported Languages
          </h2>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
            <p className="text-muted-foreground mb-6">
              PT supports 11 programming languages including our custom BasicCode language.
            </p>
            <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
              {[
                { name: 'Python', color: 'bg-yellow-500' },
                { name: 'JavaScript', color: 'bg-yellow-400' },
                { name: 'TypeScript', color: 'bg-blue-600' },
                { name: 'Java', color: 'bg-red-600' },
                { name: 'C++', color: 'bg-blue-500' },
                { name: 'C', color: 'bg-gray-600' },
                { name: 'Go', color: 'bg-cyan-500' },
                { name: 'Rust', color: 'bg-orange-600' },
                { name: 'Kotlin', color: 'bg-purple-600' },
                { name: 'C#', color: 'bg-green-600' },
                { name: 'BasicCode', color: 'bg-gradient-to-r from-purple-600 to-cyan-600' }
              ].map((lang) => (
                <div key={lang.name} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${lang.color}`}></div>
                  <span className="text-sm font-medium">{lang.name}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full"></div>
                <span><strong>BasicCode</strong> is our custom programming language</span>
              </div>
              <Link href="/languages">
                <button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-500 hover:to-cyan-500 transition-all">
                  Learn More About Languages →
                </button>
              </Link>
            </div>
          </div>
        </motion.section>



        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-500" />
            Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
              <h3 className="font-semibold mb-3">Editor Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Syntax highlighting for all languages</li>
                <li>• Auto-completion and IntelliSense</li>
                <li>• Error detection and highlighting</li>
                <li>• Code formatting and indentation</li>
                <li>• Multiple themes support</li>
              </ul>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
              <h3 className="font-semibold mb-3">Execution Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Real-time code compilation</li>
                <li>• Secure sandboxed execution</li>
                <li>• Input/output handling</li>
                <li>• Error reporting and debugging</li>
                <li>• Performance metrics</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Architecture Graph */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-500" />
            System Architecture
          </h2>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
            <p className="text-muted-foreground mb-6">
              Interactive visualization of PT's compilation architecture showing the complete flow from client request to code execution.
            </p>
            <ArchitectureGraph />
          </div>
        </motion.section>

        {/* API Reference */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-cyan-500" />
            API Reference
          </h2>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
            <h3 className="font-semibold mb-4">Compilation Endpoint</h3>
            <div className="bg-muted rounded p-4 font-mono text-sm border">
              <div className="text-green-600 dark:text-green-400">POST</div>
              <div className="text-blue-600 dark:text-blue-400">https://compile-me-api.onrender.com/compile</div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Request Body:</h4>
              <pre className="bg-muted rounded p-4 text-sm overflow-x-auto border">
{`{
  "language": "python",
  "code": "print('Hello, World!')",
  "input": ""
}`}
              </pre>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-8 border-t border-border"
        >
          <p className="text-muted-foreground">
            Need more help? Join our community or check out the source code on GitHub.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/editor">
              <button className="text-purple-600 hover:text-purple-500 transition-colors">
                Try Editor
              </button>
            </Link>
            <Link href="/languages">
              <button className="text-green-600 hover:text-green-500 transition-colors">
                Language Guide
              </button>
            </Link>
            <Link href="/">
              <button className="text-cyan-600 hover:text-cyan-500 transition-colors">
                Home
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
