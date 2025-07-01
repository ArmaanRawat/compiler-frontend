import type { Express } from "express";

export function registerRoutes(app: Express): void {
  // Compiler API endpoint
  app.post('/api/compile', async (req, res) => {
    try {
      const { code, language } = req.body;
      
      if (!code || !language) {
        return res.status(400).json({ 
          error: 'Code and language are required' 
        });
      }

      // Simple compilation simulation for demo
      // In a real implementation, you would integrate with actual compilers
      const output = `Compiled ${language} code:\n${code}\n\nCompilation successful!`;
      
      res.json({ 
        output,
        success: true,
        language,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Compilation error:', error);
      res.status(500).json({ 
        error: 'Compilation failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get supported languages
  app.get('/api/languages', (req, res) => {
    const languages = [
      'javascript',
      'typescript',
      'python',
      'java',
      'cpp',
      'c',
      'csharp',
      'go',
      'rust',
      'php'
    ];
    
    res.json({ languages });
  });

  // Get code examples
  app.get('/api/examples/:language', (req, res) => {
    const { language } = req.params;
    
    const examples = {
      javascript: 'console.log("Hello, World!");',
      python: 'print("Hello, World!")',
      java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      cpp: '#include <iostream>\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}'
    };
    
    const code = examples[language as keyof typeof examples] || `// ${language} example not available`;
    
    res.json({ code, language });
  });
}
