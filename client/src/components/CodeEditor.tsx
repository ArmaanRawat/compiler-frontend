import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Loader2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// Dynamically import Monaco Editor to reduce initial bundle size
const Editor = lazy(() => import('@monaco-editor/react').then(module => ({ default: module.Editor })));

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

// Map our language identifiers to Monaco identifiers
const languageMap: { [key: string]: string } = {
  'py': 'python',
  'js': 'javascript',
  'java': 'java',
  'cpp': 'cpp',
  'c': 'c',
  'go': 'go',
  'rs': 'rust',
  'kt': 'kotlin',
  'cs': 'csharp',
  'bac': 'plaintext'
};

const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange }) => {
  const [copied, setCopied] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const { theme } = useTheme();
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const updateCounts = (text: string) => {
    setLineCount(text.split('\n').length);
    setCharCount(text.length);
  };

  useEffect(() => {
    updateCounts(value);
  }, [value]);

  // Handle theme changes dynamically
  useEffect(() => {
    if (monacoRef.current && editorRef.current) {
      monacoRef.current.editor.setTheme(theme === 'dark' ? 'custom-dark' : 'custom-light');
    }
  }, [theme]);

  const handleEditorChange = (newValue: string | undefined) => {
    const val = newValue || '';
    onChange(val);
    updateCounts(val);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    // Store references for theme updates
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Register custom dark theme
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' }
      ],
      colors: {
        'editor.background': '#1E1E1E',
        'editor.foreground': '#D4D4D4',
        'editor.lineHighlightBackground': '#2F2F2F',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#C6C6C6',
        'editor.selectionBackground': '#264F78',
        'editor.inactiveSelectionBackground': '#3A3D41',
        'editorBracketMatch.background': '#0D3A58',
        'editorBracketMatch.border': '#888888'
      }
    });

    // Register custom light theme
    monaco.editor.defineTheme('custom-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '008000' },
        { token: 'keyword', foreground: '0000FF' },
        { token: 'string', foreground: 'A31515' },
        { token: 'number', foreground: '098658' },
        { token: 'type', foreground: '267F99' }
      ],
      colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#000000',
        'editor.lineHighlightBackground': '#F5F5F5',
        'editorLineNumber.foreground': '#237893',
        'editorLineNumber.activeForeground': '#0B216F',
        'editor.selectionBackground': '#ADD6FF',
        'editor.inactiveSelectionBackground': '#E5EBF1',
        'editorBracketMatch.background': '#B9D9FF',
        'editorBracketMatch.border': '#74A0F4'
      }
    });

    // Set the theme based on current theme
    monaco.editor.setTheme(theme === 'dark' ? 'custom-dark' : 'custom-light');
  };

  const editorOptions = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
    fontLigatures: true,
    lineNumbers: 'on' as const,
    roundedSelection: false,
    selectOnLineNumbers: true,
    cursorStyle: 'line' as const,
    cursorBlinking: 'smooth' as const,
    smoothScrolling: true,
    contextmenu: true,
    mouseWheelZoom: true,
    lineHeight: 21,
    padding: { top: 16, bottom: 16 },
    scrollbar: {
      useShadows: false,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10
    },
    overviewRulerLanes: 0,
    lineDecorationsWidth: 0,
    renderLineHighlight: 'all' as const,
    matchBrackets: 'always' as const,
    renderWhitespace: 'selection' as const,
    wordWrap: 'off' as const,
    fixedOverflowWidgets: true,
    tabSize: 4,
    insertSpaces: true,
    automaticLayout: true,
    theme: theme === 'dark' ? 'custom-dark' : 'custom-light'
  };

  return (
    <div className={`h-full w-full relative group ${
      theme === 'dark' ? 'bg-[#1E1E1E]' : 'bg-white'
    }`}>
      <div className="absolute top-2 right-2 z-10 transition-opacity duration-200 group-hover:opacity-100 opacity-100 md:opacity-0">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-xs md:text-base"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </motion.button>
      </div>
      
      <Suspense 
        fallback={
          <div className={`h-full w-full flex items-center justify-center ${
            theme === 'dark' ? 'bg-[#1E1E1E]' : 'bg-white'
          }`}>
            <div className={`flex items-center space-x-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading editor...</span>
            </div>
          </div>
        }
      >
        <Editor
          height="100%"
          language={languageMap[language] || 'plaintext'}
          value={value}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={editorOptions}
          loading={
            <div className={`h-full w-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-[#1E1E1E]' : 'bg-white'
            }`}>
              <div className={`flex items-center space-x-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Loading editor...</span>
              </div>
            </div>
          }
        />
      </Suspense>
      
      <div className="absolute bottom-2 right-2 z-10 text-[10px] md:text-xs text-gray-500 dark:text-gray-400 group-hover:opacity-100 opacity-100 md:opacity-0 transition-opacity duration-200 hidden sm:block">
        {lineCount} lines | {charCount} characters
      </div>
    </div>
  );
};

export default CodeEditor;