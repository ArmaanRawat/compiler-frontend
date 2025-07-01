import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import CodeEditor from './CodeEditor';
import LanguageSelector from './LanguageSelector';
import InputField from './InputField';
import OutputDisplay from './OutputDisplay';
import { CommandPalette } from './CommandPalette';
import { HelpDialog } from './HelpDialog';
import { AboutDialog } from './AboutDialog';
import { TerminalDialog } from './TerminalDialog';
import { ThemeToggle } from './ThemeToggle';
import MobileCompilerView from './MobileCompilerView';
import { useCompiler } from '../hooks/useCompiler';
import { useTheme } from '../contexts/ThemeContext';
import { useResponsive } from '../hooks/useResponsive';
import { languageOptions } from '../utils/languageOptions';
import { getDefaultCode } from '../utils/codeTemplates';
import { 
  Play, 
  ChevronLeft,
  Home,
  FolderOpen,
  Code2,
  Terminal,
  Settings,
  Share,
  Download,
  Upload,
  BookOpen,
  HelpCircle,
  Info,
  FileText,
  File
} from 'lucide-react';
import { motion } from 'framer-motion';

const CompilerView = () => {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  const [showTerminalDialog, setShowTerminalDialog] = useState(false);
  const { compileCode, output, isLoading, error } = useCompiler();
  const { theme, toggleTheme } = useTheme();
  const { isMobile } = useResponsive();

  useEffect(() => {
    setCode(getDefaultCode(language));
  }, [language]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleRunCode();
      } else if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        downloadCode();
      } else if (e.key === 'o' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        uploadFile();
      } else if (e.key === 't' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleTheme();
      } else if (e.key === 'F6') {
        e.preventDefault();
        // Focus the editor
        const editor = document.querySelector('.monaco-editor');
        if (editor) {
          (editor as HTMLElement).focus();
        }
      } else if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowHelpDialog(true);
      } else if (e.key === 'i' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowAboutDialog(true);
      } else if (e.key === '`' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowTerminalDialog(true);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        // Close any open dialogs
        setShowHelpDialog(false);
        setShowAboutDialog(false);
        setShowTerminalDialog(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [code, language, input, toggleTheme]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleRunCode = () => {
    compileCode({
      code,
      language,
      std_input: input
    });
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `main.${getFileExtension(language)}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };

  const uploadFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.cpp,.c,.py,.js,.java,.go,.rs,.kt,.cs,.bac';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setCode(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const shareCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // You could add a toast notification here
      console.log('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `code.${getFileExtension(language)}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
      };
      reader.readAsText(file);
    }
  };

  const getFileExtension = (languageId: string) => {
    const language = languageOptions.find(lang => lang.id === languageId);
    const extensions: Record<string, string> = {
      'python': 'py',
      'javascript': 'js',
      'typescript': 'ts',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'go': 'go',
      'rust': 'rs',
      'kotlin': 'kt',
      'csharp': 'cs',
      'basiccode': 'bac'
    };
    return extensions[language?.name.toLowerCase() || 'text'] || 'txt';
  };

  // Use mobile layout for small screens
  if (isMobile) {
    return <MobileCompilerView />;
  }

  return (
    <div className="h-[calc(100vh-4rem)] md:h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-12 md:h-14 bg-card border-b border-border flex items-center justify-between px-2 md:px-4 shrink-0"
      >
        {/* Existing header content */}
      </motion.div>

      <CommandPalette
        onSelectLanguage={handleLanguageChange}
        onUpdateCode={setCode}
      />

      <HelpDialog
        open={showHelpDialog}
        onOpenChange={setShowHelpDialog}
      />

      <AboutDialog
        open={showAboutDialog}
        onOpenChange={setShowAboutDialog}
      />

      <TerminalDialog
        open={showTerminalDialog}
        onOpenChange={setShowTerminalDialog}
      />

      <div className="flex flex-col md:flex-row h-screen bg-background">
        {/* Enhanced Animated Sidebar */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-16 w-full md:h-auto h-14 bg-gradient-to-b from-card to-card/50 border-b md:border-b-0 md:border-r border-border/50 flex md:flex-col flex-row items-center md:py-4 py-0 gap-6 md:gap-6 gap-2 md:justify-start justify-between z-20 backdrop-blur-sm"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/" className="block p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200" title="Home">
              <Home className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            onClick={uploadFile}
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
            title="Open File"
          >
            <FolderOpen className="w-5 h-5" />
          </motion.button>

          <motion.div 
            whileHover={{ scale: 1.1 }} 
            className="p-2 rounded-lg bg-primary/20 text-primary"
            title="Code Editor (Active)"
          >
            <Code2 className="w-5 h-5" />
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowTerminalDialog(true)}
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 hidden md:block"
            title="Open Terminal"
          >
            <Terminal className="w-5 h-5" />
          </motion.button>

          <div className="flex-1 md:block hidden" />

          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowHelpDialog(true)}
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 hidden md:block"
            title="Help & Shortcuts"
          >
            <HelpCircle className="w-5 h-5" />
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAboutDialog(true)}
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 hidden md:block"
            title="About PT"
          >
            <Info className="w-5 h-5" />
          </motion.button>
        </motion.div>

        <div className="flex-1 flex flex-col">
          {/* Top Navigation - Hidden on mobile */}
          <div className="hidden md:flex h-12 border-b border-border items-center px-4 gap-2 bg-card/50 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary flex items-center gap-1">
              Home
            </Link>
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            <span className="text-primary">Quick compiler</span>
          </div>

          {/* Main Content - Responsive Layout */}
          {/* Main Content Area - Split Layout for Large Screens */}
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Left Side - Code Editor */}
            <div className="flex-1 lg:flex-[2] flex flex-col border-b lg:border-b-0 lg:border-r border-border">
              {/* Language Selector */}
              <div className="h-10 md:h-12 bg-muted/30 border-b border-border flex items-center px-2 md:px-4 gap-2 md:gap-4">
                <LanguageSelector
                  selected={language}
                  onSelect={handleLanguageChange}
                  options={languageOptions}
                />
                <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-muted-foreground">
                  <File className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">main.{language}</span>
                  <span className="sm:hidden">.{language}</span>
                </div>
                
                <div className="flex-1" />
                
                {/* Run Button */}
                <motion.button
                  onClick={handleRunCode}
                  disabled={isLoading}
                  className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-500 text-white text-xs md:text-sm font-medium rounded-md transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  title="Run Code (Ctrl+Enter)"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Terminal className="w-3 h-3 md:w-4 md:h-4" />
                    </motion.div>
                  ) : (
                    <Play className="w-3 h-3 md:w-4 md:h-4" />
                  )}
                  <span className="hidden sm:inline">
                    {isLoading ? 'Running...' : 'Run'}
                  </span>
                </motion.button>
              </div>

              {/* Code Editor */}
              <div className="flex-1 overflow-hidden min-h-[200px]">
                <CodeEditor
                  language={language}
                  value={code}
                  onChange={setCode}
                />
              </div>
            </div>

            {/* Right Side - Input/Output for Large Screens, Bottom for Small Screens */}
            <div className="w-full lg:w-80 flex flex-col lg:flex-col bg-muted/20 border-t lg:border-t-0 border-border min-h-[300px]">
              {/* Input Panel */}
              <div className="flex-1 flex flex-col border-b lg:border-b border-border">
                <div className="h-10 md:h-12 bg-muted/30 border-b border-border flex items-center justify-center">
                  <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-muted-foreground">
                    <FileText className="w-3 h-3 md:w-4 md:h-4" />
                    STDIN
                    <span className="text-xs opacity-60">({input.length} characters)</span>
                  </div>
                </div>
                <div className="flex-1 p-2 md:p-4 min-h-[120px]">
                  <InputField
                    value={input}
                    onChange={setInput}
                    placeholder="Your Input Goes Here ..."
                  />
                </div>
              </div>

              {/* Output Panel */}
              <div className="flex-1 flex flex-col">
                <div className="h-10 md:h-12 bg-muted/30 border-b border-border flex items-center justify-center">
                  <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-muted-foreground">
                    <Terminal className="w-3 h-3 md:w-4 md:h-4" />
                    STDOUT
                    {(output || error) && (
                      <span className="text-xs opacity-60">
                        ({(output || error || '').length} characters)
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1 p-2 md:p-4 min-h-[120px]">
                  <div className="output-display h-full">
                    <OutputDisplay
                      output={output}
                      error={error}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompilerView;