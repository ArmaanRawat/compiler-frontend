import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  ChevronDown,
  ChevronUp,
  Terminal,
  FileText,
  Download,
  Upload,
  Share,
  MoreVertical,
  BookOpen,
  HelpCircle,
  Info,
  Settings,
  File,
  Keyboard
} from 'lucide-react';
import CodeEditor from './CodeEditor';
import LanguageSelector from './LanguageSelector';
import InputField from './InputField';
import OutputDisplay from './OutputDisplay';
import MobileNavbar from './MobileNavbar';
import { HelpDialog } from './HelpDialog';
import { AboutDialog } from './AboutDialog';
import { TerminalDialog } from './TerminalDialog';
import { useCompiler } from '../hooks/useCompiler';
import { languageOptions } from '../utils/languageOptions';
import { getDefaultCode } from '../utils/codeTemplates';

const MobileCompilerView = () => {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('file');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  const [showTerminalDialog, setShowTerminalDialog] = useState(false);
  const { compileCode, output, isLoading, error } = useCompiler();

  useEffect(() => {
    setCode(getDefaultCode(language));
  }, [language]);

  // Auto-open stdout when there's output
  useEffect(() => {
    if (output || error) {
      setActiveTab('stdout');
    }
  }, [output, error]);

  // Close menus on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showOptionsMenu) {
          setShowOptionsMenu(false);
        }
        if (showLanguageMenu) {
          setShowLanguageMenu(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showOptionsMenu, showLanguageMenu]);

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
      alert('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getFileExtension = (languageId: string) => {
    const language = languageOptions.find(lang => lang.id === languageId);
    return language?.extension?.replace('.', '') || 'txt';
  };

  const getFileName = () => {
    return `main.${getFileExtension(language)}`;
  };

  const tabs = [
    {
      id: 'file',
      label: getFileName(),
      icon: File,
      color: 'text-blue-500'
    },
    {
      id: 'stdin',
      label: 'IN',
      icon: FileText,
      color: 'text-orange-500',
      hasContent: input.length > 0
    },
    {
      id: 'stdout',
      label: 'OUT',
      icon: Terminal,
      color: 'text-green-500',
      hasContent: !!(output || error),
      autoOpen: !!(output || error)
    }
  ];

  const optionsMenuItems = [
    {
      icon: Terminal,
      label: 'Terminal',
      action: () => setShowTerminalDialog(true)
    },
    {
      icon: Download,
      label: 'Download',
      action: downloadCode
    },
    {
      icon: Upload,
      label: 'Open File',
      action: uploadFile
    },
    {
      icon: HelpCircle,
      label: 'Help',
      action: () => setShowHelpDialog(true)
    },
    {
      icon: Keyboard,
      label: 'Shortcuts',
      action: () => setShowHelpDialog(true)
    },
    {
      icon: Info,
      label: 'About PT',
      action: () => setShowAboutDialog(true)
    }
  ];

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Mobile Navbar */}
      <MobileNavbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-14 overflow-hidden">
        {/* Tab Bar */}
        <div className="h-10 bg-muted/30 border-b border-border flex items-center px-2 gap-1 overflow-x-auto">
          {/* Compact Language Selector */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowLanguageMenu(true);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="flex items-center gap-1 px-2 py-1.5 bg-muted/50 hover:bg-muted border border-border rounded-md text-xs font-medium min-w-0 touch-manipulation flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ minHeight: '32px', minWidth: '48px' }}
          >
            <span className="text-xs font-mono uppercase">
              {language.toUpperCase()}
            </span>
            <ChevronDown className="w-3 h-3" />
          </motion.button>

          {/* File/Stdin/Stdout Tabs */}
          <div className="flex items-center gap-1 flex-1 min-w-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 min-w-0 flex-shrink-0
                    ${isActive 
                      ? 'bg-background border border-border shadow-sm text-foreground' 
                      : 'hover:bg-muted/50 text-muted-foreground'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? tab.color : ''}`} />
                  <span className="truncate">{tab.label}</span>
                  {tab.hasContent && (
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Run Button */}
          <motion.button
            onClick={handleRunCode}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-500 text-white text-xs font-medium rounded-md transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            whileHover={{ scale: isLoading ? 1 : 1.05 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Terminal className="w-3.5 h-3.5" />
              </motion.div>
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            <span className="hidden xs:inline">
              {isLoading ? 'Running...' : 'Run'}
            </span>
          </motion.button>

          {/* Options Menu (3 dots) */}
          <motion.button
            onClick={() => setShowOptionsMenu(true)}
            className="p-1.5 rounded-md hover:bg-muted/50 transition-colors flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'file' && (
              <motion.div
                key="editor"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <CodeEditor
                  language={language}
                  value={code}
                  onChange={setCode}
                />
              </motion.div>
            )}

            {activeTab === 'stdin' && (
              <motion.div
                key="stdin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="h-full p-4 bg-muted/20"
              >
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-semibold">Standard Input</h3>
                </div>
                <InputField
                  value={input}
                  onChange={setInput}
                  placeholder="Enter your input here..."
                />
              </motion.div>
            )}

            {activeTab === 'stdout' && (
              <motion.div
                key="stdout"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="h-full p-4 bg-muted/20"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold">Output</h3>
                  {isLoading && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="ml-2"
                    >
                      <Terminal className="w-4 h-4 text-blue-500" />
                    </motion.div>
                  )}
                </div>
                <OutputDisplay
                  output={output}
                  error={error}
                  isLoading={isLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Options Panel */}
      <AnimatePresence>
        {showOptionsMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowOptionsMenu(false)}
            />
            
            {/* Options Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-background border-l border-border z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold">Options</h2>
                <motion.button
                  onClick={() => setShowOptionsMenu(false)}
                  className="p-2 rounded-md hover:bg-muted/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Options List */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                  {optionsMenuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={index}
                        onClick={() => {
                          item.action();
                          setShowOptionsMenu(false);
                        }}
                        className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-muted/50 transition-colors text-left"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="p-2 rounded-lg bg-muted/30">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border">
                <div className="text-xs text-muted-foreground text-center">
                  Ar Compiler - Mobile View
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Language Selection Modal */}
      <AnimatePresence>
        {showLanguageMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowLanguageMenu(false);
              }}
            />
            
            {/* Language Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 top-1/2 left-1/2 w-80 max-w-[calc(100vw-2rem)] h-auto max-h-[70vh] bg-background border border-border rounded-lg shadow-2xl z-50 flex flex-col"
              style={{
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
                position: 'fixed'
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold">Select Language</h2>
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowLanguageMenu(false);
                  }}
                  className="p-2 rounded-md hover:bg-muted/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Language List */}
              <div className="flex-1 overflow-y-auto p-2">
                {languageOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleLanguageChange(option.id);
                      setShowLanguageMenu(false);
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors text-left mb-1 ${
                      language === option.id ? 'bg-muted/30 border border-border' : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex-1">
                      <span className="text-sm font-medium">{option.name}</span>
                      <div className="text-xs text-muted-foreground">{option.extension}</div>
                    </div>
                    {language === option.id && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Dialogs */}
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
    </div>
  );
};

export default MobileCompilerView;
