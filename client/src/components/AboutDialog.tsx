
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { ExternalLink, Github, Heart } from 'lucide-react';

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PT</span>
            </div>
            Compiler Frontend
          </DialogTitle>
          <DialogDescription>
            A powerful online code compiler with real-time execution
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">v2.0</Badge>
            <Badge variant="outline">Real-time</Badge>
            <Badge variant="outline">Secure</Badge>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Built with modern technology</h4>
            <div className="flex flex-wrap gap-1 text-xs">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Monaco Editor</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">Framer Motion</Badge>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                Built and developed by 
                <a 
                  href="https://ArmaanRawat.me" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 transition-colors font-medium"
                >
                  ArmaanRawat.me
                </a>
              </span>
              <div className="flex gap-2">
                <a
                  href="https://github.com/ArmaanRawat/compiler-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://ArmaanRawat.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>• 11+ programming languages supported</p>
            <p>• Secure sandboxed code execution</p>
            <p>• Real-time syntax highlighting</p>
            <p>• Intelligent error handling</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
