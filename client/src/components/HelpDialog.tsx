import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Kbd } from './ui/kbd';
import { languageOptions } from '../utils/languageOptions';

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Ar Compiler Help
          </DialogTitle>
          <DialogDescription>
            Master the keyboard shortcuts and features to code faster
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Keyboard Shortcuts */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Keyboard Shortcuts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Run Code</span>
                <div className="flex gap-1">
                  <Kbd>Ctrl</Kbd>+<Kbd>Enter</Kbd>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Download Code</span>
                <div className="flex gap-1">
                  <Kbd>Ctrl</Kbd>+<Kbd>S</Kbd>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Upload File</span>
                <div className="flex gap-1">
                  <Kbd>Ctrl</Kbd>+<Kbd>O</Kbd>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Command Palette</span>
                <div className="flex gap-1">
                  <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Toggle Theme</span>
                <div className="flex gap-1">
                  <Kbd>Ctrl</Kbd>+<Kbd>T</Kbd>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Close Dialogs</span>
                <Kbd>Esc</Kbd>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Focus Editor</span>
                <Kbd>F6</Kbd>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 border rounded">
                <h4 className="font-medium">Real-time Compilation</h4>
                <p className="text-sm text-muted-foreground">Execute code instantly with live output</p>
              </div>
              <div className="p-3 border rounded">
                <h4 className="font-medium">Syntax Highlighting</h4>
                <p className="text-sm text-muted-foreground">Monaco Editor with IntelliSense</p>
              </div>
              <div className="p-3 border rounded">
                <h4 className="font-medium">Multi-language Support</h4>
                <p className="text-sm text-muted-foreground">11+ programming languages</p>
              </div>
              <div className="p-3 border rounded">
                <h4 className="font-medium">File Operations</h4>
                <p className="text-sm text-muted-foreground">Upload, download, and share code</p>
              </div>
            </div>
          </div>

          {/* Supported Languages */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Supported Languages</h3>
            <div className="flex flex-wrap gap-2">
              {languageOptions.map((lang) => (
                <Badge key={lang.id} variant="secondary">
                  {lang.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Pro Tips</h3>
            <ul className="space-y-2 text-sm">
              <li>• Use the command palette for quick language switching</li>
              <li>• Your code is automatically formatted based on the selected language</li>
              <li>• Error messages appear in real-time in the output panel</li>
              <li>• Use the settings panel to customize font size and theme</li>
              <li>• All code execution is sandboxed and secure</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}