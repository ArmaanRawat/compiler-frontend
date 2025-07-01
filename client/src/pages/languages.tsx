import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Code, Terminal, Zap, BookOpen, Download, Upload, Keyboard, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function LanguagesPage() {
  const [showBasicCodeDetails, setShowBasicCodeDetails] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/docs">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Documentation
            </button>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Supported Languages
          </h1>
          <p className="text-xl text-muted-foreground">
            Complete guide to all supported programming languages and the custom BasicCode compiler
          </p>
        </motion.div>

        {/* Language Documentation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="space-y-8">
            
            {/* BasicCode - Featured Custom Language */}
            <div className="bg-gradient-to-br from-purple-50 to-cyan-50 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-bold">FEATURED</div>
                <h3 className="text-2xl font-bold">BasicCode (.bac) - Custom Language</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Our custom-built programming language with C-like syntax, designed for educational purposes and simple computational tasks.
              </p>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Quick Start</h4>
                  <div className="bg-card rounded-lg p-4 border">
                    <pre className="text-sm overflow-x-auto">
{`func main() {
    print("Hello, BasicCode!\\n");
    let x = 42;
    let pi = 3.14159;
    print("Answer: ");
    print(x);
    print("\\n");
}`}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Key Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Static typing</strong> with type inference</li>
                    <li>• <strong>Functions</strong> with parameters & return values</li>
                    <li>• <strong>Control structures</strong>: if-else, while, for loops</li>
                    <li>• <strong>Variables</strong>: int, float, string, boolean types</li>
                    <li>• <strong>Built-in print function</strong> for output</li>
                    <li>• <strong>Arithmetic & logical operations</strong></li>
                  </ul>
                </div>
              </div>
              
              {/* View More Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowBasicCodeDetails(!showBasicCodeDetails)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {showBasicCodeDetails ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      View Complete Documentation
                    </>
                  )}
                </button>
              </div>
              
              {/* Detailed Documentation - Collapsible */}
              {showBasicCodeDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 space-y-4"
                >
                  <details className="bg-card rounded-lg border">
                    <summary className="p-4 cursor-pointer font-semibold hover:bg-muted/50">
                      BasicCode Syntax Guide
                    </summary>
                    <div className="p-4 border-t space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Variable Declaration:</h5>
                        <pre className="bg-muted rounded p-3 text-sm">
{`let variableName = value;
let age = 25;
let price = 19.99;
let name = "Alice";
let isActive = true;`}
                        </pre>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-2">Functions:</h5>
                        <pre className="bg-muted rounded p-3 text-sm">
{`func functionName(let param1, let param2) {
    let result = param1 + param2;
    return result;
}

func calculateArea(let length, let width) {
    return length * width;
}`}
                        </pre>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-2">Control Structures:</h5>
                        <pre className="bg-muted rounded p-3 text-sm">
{`// If-else statements
if (condition) {
    print("True branch\\n");
} else {
    print("False branch\\n");
}

// While loops
let i = 0;
while (i < 5) {
    print(i);
    print("\\n");
    i = i + 1;
}

// For loops
for (let j = 0; j < 10; j = j + 1) {
    print("Iteration: ");
    print(j);
    print("\\n");
}`}
                        </pre>
                      </div>
                    </div>
                  </details>
                  
                  <details className="bg-card rounded-lg border">
                    <summary className="p-4 cursor-pointer font-semibold hover:bg-muted/50">
                      Complete Examples
                    </summary>
                    <div className="p-4 border-t space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Calculator Example:</h5>
                        <pre className="bg-muted rounded p-3 text-sm overflow-x-auto">
{`func add(let a, let b) {
    return a + b;
}

func multiply(let a, let b) {
    return a * b;
}

func main() {
    let num1 = 10;
    let num2 = 2.5;
    
    print("Welcome to BasicCode Calculator\\n");
    
    let sum = add(num1, num2);
    print("Sum: ");
    print(sum);
    print("\\n");
    
    let product = multiply(num1, num2);
    print("Product: ");
    print(product);
    print("\\n");
}`}
                        </pre>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-2">Loop & Conditionals Example:</h5>
                        <pre className="bg-muted rounded p-3 text-sm overflow-x-auto">
{`func main() {
    let count = 0;
    
    print("Counting even numbers:\\n");
    
    for (let i = 0; i < 20; i = i + 1) {
        if (i % 2 == 0) {
            print("Even: ");
            print(i);
            print("\\n");
            count = count + 1;
        }
    }
    
    print("Total even numbers: ");
    print(count);
    print("\\n");
}`}
                        </pre>
                      </div>
                    </div>
                  </details>
                  
                  <details className="bg-card rounded-lg border">
                    <summary className="p-4 cursor-pointer font-semibold hover:bg-muted/50">
                      How BasicCode Works (Technical Details)
                    </summary>
                    <div className="p-4 border-t space-y-3 text-sm">
                      <p><strong>Compilation Process:</strong></p>
                      <div className="bg-muted rounded p-3 font-mono text-xs">
                        BasicCode (.bac) → Lexer → Parser → AST → C Code Generator → GCC → Executable
                      </div>
                      <ul className="space-y-1 mt-3">
                        <li>• <strong>Lexical Analysis:</strong> Uses Flex to tokenize source code</li>
                        <li>• <strong>Parsing:</strong> Uses Bison to build Abstract Syntax Tree (AST)</li>
                        <li>• <strong>Code Generation:</strong> Transpiles to C code for native performance</li>
                        <li>• <strong>Compilation:</strong> Uses GCC to compile generated C code</li>
                        <li>• <strong>Execution:</strong> Runs as native machine code</li>
                      </ul>
                    </div>
                  </details>
                  
                  <details className="bg-card rounded-lg border">
                    <summary className="p-4 cursor-pointer font-semibold hover:bg-muted/50">
                      Complete Token Reference
                    </summary>
                    <div className="p-4 border-t space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2 text-purple-600">Keywords & Control</h4>
                          <div className="space-y-1 text-sm">
                            <div><code className="bg-muted px-1 rounded">let</code> - Variable declaration</div>
                            <div><code className="bg-muted px-1 rounded">func</code> - Function declaration</div>
                            <div><code className="bg-muted px-1 rounded">if</code> - Conditional statement</div>
                            <div><code className="bg-muted px-1 rounded">else</code> - Alternative branch</div>
                            <div><code className="bg-muted px-1 rounded">while</code> - While loop</div>
                            <div><code className="bg-muted px-1 rounded">for</code> - For loop</div>
                            <div><code className="bg-muted px-1 rounded">return</code> - Return statement</div>
                            <div><code className="bg-muted px-1 rounded">print</code> - Output function</div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 text-cyan-600">Data Types</h4>
                          <div className="space-y-1 text-sm">
                            <div><code className="bg-muted px-1 rounded">int</code> - Integer type</div>
                            <div><code className="bg-muted px-1 rounded">float</code> - Floating-point type</div>
                            <div><code className="bg-muted px-1 rounded">bool</code> - Boolean type</div>
                            <div><code className="bg-muted px-1 rounded">string</code> - String type</div>
                            <div><code className="bg-muted px-1 rounded">void</code> - Void type (functions)</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 mt-6">
                        <div>
                          <h4 className="font-semibold mb-2 text-green-600">Operators</h4>
                          <div className="space-y-1 text-sm">
                            <div><strong>Arithmetic:</strong> <code className="bg-muted px-1 rounded">+ - * / %</code></div>
                            <div><strong>Comparison:</strong> <code className="bg-muted px-1 rounded">== != &lt; &gt; &lt;= &gt;=</code></div>
                            <div><strong>Logical:</strong> <code className="bg-muted px-1 rounded">&& || !</code></div>
                            <div><strong>Assignment:</strong> <code className="bg-muted px-1 rounded">=</code></div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 text-orange-600">Literals</h4>
                          <div className="space-y-1 text-sm">
                            <div><code className="bg-muted px-1 rounded">42</code> - Integer literal</div>
                            <div><code className="bg-muted px-1 rounded">3.14</code> - Float literal</div>
                            <div><code className="bg-muted px-1 rounded">true/false</code> - Boolean literal</div>
                            <div><code className="bg-muted px-1 rounded">"text"</code> - String literal</div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 text-red-600">Delimiters</h4>
                          <div className="space-y-1 text-sm">
                            <div><code className="bg-muted px-1 rounded">( )</code> - Parentheses</div>
                            <div><code className="bg-muted px-1 rounded">{ }</code> - Braces</div>
                            <div><code className="bg-muted px-1 rounded">,</code> - Comma</div>
                            <div><code className="bg-muted px-1 rounded">;</code> - Semicolon</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>

                  <details className="bg-card rounded-lg border">
                    <summary className="p-4 cursor-pointer font-semibold hover:bg-muted/50">
                      Grammar Rules Reference
                    </summary>
                    <div className="p-4 border-t space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2 text-purple-600">Program Structure</h4>
                          <div className="space-y-2 text-sm font-mono bg-muted/50 p-3 rounded">
                            <div>program → statements</div>
                            <div>statements → statement | statements statement</div>
                            <div>block → '{' statements '}'</div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 text-cyan-600">Declarations</h4>
                          <div className="space-y-2 text-sm font-mono bg-muted/50 p-3 rounded">
                            <div>declaration → 'let' IDENTIFIER '=' expression</div>
                            <div>assignment → IDENTIFIER '=' expression</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2 text-green-600">Functions</h4>
                          <div className="space-y-2 text-sm font-mono bg-muted/50 p-3 rounded">
                            <div>function → 'func' IDENTIFIER '(' opt_args ')' block</div>
                            <div>args → 'let' IDENTIFIER | args ',' 'let' IDENTIFIER</div>
                            <div>call → IDENTIFIER '(' opt_call_args ')'</div>
                            <div>return_stmt → 'return' expression</div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 text-orange-600">Control Flow</h4>
                          <div className="space-y-2 text-sm font-mono bg-muted/50 p-3 rounded">
                            <div>if_stmt → 'if' '(' expression ')' block</div>
                            <div>         | 'if' '(' expression ')' block 'else' block</div>
                            <div>while_stmt → 'while' '(' expression ')' block</div>
                            <div>for_stmt → 'for' '(' assignment ';' expression ';' assignment ')' block</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-red-600">Expressions</h4>
                        <div className="space-y-2 text-sm font-mono bg-muted/50 p-3 rounded">
                          <div>expression → INT_LITERAL | FLOAT_LITERAL | STRING_LITERAL | BOOLEAN_LITERAL</div>
                          <div>           | IDENTIFIER | call</div>
                          <div>           | expression ('+' | '-' | '*' | '/' | '%') expression</div>
                          <div>           | expression ('==' | '!=' | '&lt;' | '&gt;' | '&lt;=' | '&gt;=') expression</div>
                          <div>           | expression ('&&' | '||') expression</div>
                          <div>           | '!' expression | '(' expression ')'</div>
                        </div>
                      </div>
                    </div>
                  </details>

                  <details className="bg-card rounded-lg border">
                    <summary className="p-4 cursor-pointer font-semibold hover:bg-muted/50">
                      Language Limitations
                    </summary>
                    <div className="p-4 border-t">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2 text-red-600">Not Supported</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>Pointers:</strong> No pointer syntax (* &)</li>
                            <li>• <strong>Switch/Case:</strong> No switch statements</li>
                            <li>• <strong>Arrays:</strong> No array data structure</li>
                            <li>• <strong>Structs/Classes:</strong> No custom types</li>
                            <li>• <strong>Dynamic Memory:</strong> No malloc/free</li>
                            <li>• <strong>File I/O:</strong> No file operations</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 text-green-600">Design Philosophy</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>Simplicity:</strong> Easy to learn syntax</li>
                            <li>• <strong>Safety:</strong> No manual memory management</li>
                            <li>• <strong>Educational:</strong> Focus on core concepts</li>
                            <li>• <strong>Performance:</strong> Compiles to native C</li>
                            <li>• <strong>Predictable:</strong> Stack-based execution</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </details>
                  
                  {/* BasicCode Compiler Credits */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-700 dark:text-blue-300">
                        <strong>BasicCode Compiler Credits:</strong> Developed by{" "}
                        <a 
                          href="https://in.linkedin.com/in/shailesh-singh-bisht-13b30b258" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-semibold hover:underline text-blue-600 dark:text-blue-400"
                        >
                          Shailesh Singh Bisht
                        </a>
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Traditional Languages */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Python */}
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-white font-bold text-sm">Py</div>
                  <h3 className="text-lg font-semibold">Python</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  High-level, interpreted language perfect for beginners and data science.
                </p>
                <details>
                  <summary className="cursor-pointer font-medium mb-2">Quick Example</summary>
                  <pre className="bg-muted rounded p-3 text-xs mt-2">
{`# Basic Python example
def greet(name):
    return f"Hello, {name}!"

# Main code
user_name = input("Enter name: ")
message = greet(user_name)
print(message)

# Loop example
for i in range(5):
    print(f"Count: {i}")`}
                  </pre>
                </details>
                <div className="mt-4 text-xs space-y-1">
                  <div><strong>Version:</strong> Python 3.10+</div>
                  <div><strong>Use Cases:</strong> Data Science, Web Development, Automation</div>
                </div>
              </div>

              {/* JavaScript */}
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center text-black font-bold text-sm">JS</div>
                  <h3 className="text-lg font-semibold">JavaScript</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Dynamic language for web development and server-side programming.
                </p>
                <details>
                  <summary className="cursor-pointer font-medium mb-2">Quick Example</summary>
                  <pre className="bg-muted rounded p-3 text-xs mt-2">
{`// JavaScript example
function calculateSum(a, b) {
    return a + b;
}

// Arrow function
const multiply = (x, y) => x * y;

// Main code
console.log("Sum:", calculateSum(5, 3));
console.log("Product:", multiply(4, 6));

// Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);`}
                  </pre>
                </details>
                <div className="mt-4 text-xs space-y-1">
                  <div><strong>Runtime:</strong> Node.js 18+</div>
                  <div><strong>Use Cases:</strong> Web Apps, APIs, Frontend Development</div>
                </div>
              </div>

              {/* TypeScript */}
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">TS</div>
                  <h3 className="text-lg font-semibold">TypeScript</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Typed superset of JavaScript for large-scale applications.
                </p>
                <details>
                  <summary className="cursor-pointer font-medium mb-2">Quick Example</summary>
                  <pre className="bg-muted rounded p-3 text-xs mt-2">
{`// TypeScript example
interface Person {
    name: string;
    age: number;
}

function greetPerson(person: Person): string {
    return \`Hello, \${person.name}! You are \${person.age} years old.\`;
}

// Usage
const user: Person = {
    name: "Alice",
    age: 30
};

console.log(greetPerson(user));

// Generic function
function identity<T>(arg: T): T {
    return arg;
}`}
                  </pre>
                </details>
                <div className="mt-4 text-xs space-y-1">
                  <div><strong>Runtime:</strong> ts-node</div>
                  <div><strong>Use Cases:</strong> Large Apps, Enterprise Development</div>
                </div>
              </div>

              {/* Java */}
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-sm">J</div>
                  <h3 className="text-lg font-semibold">Java</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Object-oriented, platform-independent language for enterprise applications.
                </p>
                <details>
                  <summary className="cursor-pointer font-medium mb-2">Quick Example</summary>
                  <pre className="bg-muted rounded p-3 text-xs mt-2">
{`// Java example
public class HelloWorld {
    public static void main(String[] args) {
        // Create and use objects
        Calculator calc = new Calculator();
        int result = calc.add(10, 5);
        System.out.println("Result: " + result);
        
        // Array operations
        int[] numbers = {1, 2, 3, 4, 5};
        for (int num : numbers) {
            System.out.println("Number: " + num);
        }
    }
}

class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}`}
                  </pre>
                </details>
                <div className="mt-4 text-xs space-y-1">
                  <div><strong>Version:</strong> JDK 11+</div>
                  <div><strong>Use Cases:</strong> Enterprise Apps, Android Development</div>
                </div>
              </div>

              {/* C++ */}
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-sm">C++</div>
                  <h3 className="text-lg font-semibold">C++</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  High-performance, compiled language for system programming.
                </p>
                <details>
                  <summary className="cursor-pointer font-medium mb-2">Quick Example</summary>
                  <pre className="bg-muted rounded p-3 text-xs mt-2">
{`#include <iostream>
#include <vector>
using namespace std;

class Calculator {
public:
    int add(int a, int b) {
        return a + b;
    }
};

int main() {
    Calculator calc;
    cout << "Sum: " << calc.add(10, 5) << endl;
    
    // Vector operations
    vector<int> numbers = {1, 2, 3, 4, 5};
    for (int num : numbers) {
        cout << "Number: " << num << endl;
    }
    
    return 0;
}`}
                  </pre>
                </details>
                <div className="mt-4 text-xs space-y-1">
                  <div><strong>Compiler:</strong> GCC/G++</div>
                  <div><strong>Use Cases:</strong> System Programming, Game Development</div>
                </div>
              </div>

              {/* C */}
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center text-white font-bold text-sm">C</div>
                  <h3 className="text-lg font-semibold">C</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Low-level, procedural language for system and embedded programming.
                </p>
                <details>
                  <summary className="cursor-pointer font-medium mb-2">Quick Example</summary>
                  <pre className="bg-muted rounded p-3 text-xs mt-2">
{`#include <stdio.h>
#include <stdlib.h>

int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(10, 5);
    printf("Sum: %d\\n", result);
    
    // Array operations
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    for (int i = 0; i < size; i++) {
        printf("Number: %d\\n", numbers[i]);
    }
    
    return 0;
}`}
                  </pre>
                </details>
                <div className="mt-4 text-xs space-y-1">
                  <div><strong>Compiler:</strong> GCC</div>
                  <div><strong>Use Cases:</strong> Operating Systems, Embedded Systems</div>
                </div>
              </div>

              {/* Go */}
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center text-white font-bold text-sm">Go</div>
                  <h3 className="text-lg font-semibold">Go</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Modern, concurrent language designed for scalable network services.
                </p>
                <details>
                  <summary className="cursor-pointer font-medium mb-2">Quick Example</summary>
                  <pre className="bg-muted rounded p-3 text-xs mt-2">
{`package main

import (
    "fmt"
    "sync"
)

func add(a, b int) int {
    return a + b
}

func main() {
    result := add(10, 5)
    fmt.Printf("Sum: %d\\n", result)
    
    // Slice operations
    numbers := []int{1, 2, 3, 4, 5}
    for i, num := range numbers {
        fmt.Printf("Index %d: %d\\n", i, num)
    }
    
    // Goroutine example
    var wg sync.WaitGroup
    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println("Hello from goroutine!")
    }()
    wg.Wait()
}`}
                  </pre>
                </details>
                <div className="mt-4 text-xs space-y-1">
                  <div><strong>Version:</strong> Go 1.19+</div>
                  <div><strong>Use Cases:</strong> Web Services, Cloud Applications</div>
                </div>
              </div>

              {/* Rust */}
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center text-white font-bold text-sm">Rs</div>
                  <h3 className="text-lg font-semibold">Rust</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Memory-safe systems programming language with zero-cost abstractions.
                </p>
                <details>
                  <summary className="cursor-pointer font-medium mb-2">Quick Example</summary>
                  <pre className="bg-muted rounded p-3 text-xs mt-2">
{`fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    let result = add(10, 5);
    println!("Sum: {}", result);
    
    // Vector operations
    let numbers = vec![1, 2, 3, 4, 5];
    for (index, num) in numbers.iter().enumerate() {
        println!("Index {}: {}", index, num);
    }
    
    // Pattern matching
    let x = 5;
    match x {
        1..=5 => println!("Small number"),
        _ => println!("Large number"),
    }
}`}
                  </pre>
                </details>
                <div className="mt-4 text-xs space-y-1">
                  <div><strong>Compiler:</strong> rustc</div>
                  <div><strong>Use Cases:</strong> System Programming, Web Assembly</div>
                </div>
              </div>

              {/* Kotlin */}
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white font-bold text-sm">Kt</div>
                  <h3 className="text-lg font-semibold">Kotlin</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Modern JVM language, fully interoperable with Java.
                </p>
                <details>
                  <summary className="cursor-pointer font-medium mb-2">Quick Example</summary>
                  <pre className="bg-muted rounded p-3 text-xs mt-2">
{`fun add(a: Int, b: Int): Int {
    return a + b
}

fun main() {
    val result = add(10, 5)
    println("Sum: $result")
    
    // List operations
    val numbers = listOf(1, 2, 3, 4, 5)
    numbers.forEachIndexed { index, num ->
        println("Index $index: $num")
    }
    
    // Lambda expressions
    val doubled = numbers.map { it * 2 }
    println("Doubled: $doubled")
    
    // Null safety
    val name: String? = null
    println("Length: \${name?.length ?: 0}")
}`}
                  </pre>
                </details>
                <div className="mt-4 text-xs space-y-1">
                  <div><strong>Runtime:</strong> JVM</div>
                  <div><strong>Use Cases:</strong> Android Development, Server-side</div>
                </div>
              </div>

              {/* C# */}
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-sm">C#</div>
                  <h3 className="text-lg font-semibold">C#</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Object-oriented language for .NET ecosystem and cross-platform development.
                </p>
                <details>
                  <summary className="cursor-pointer font-medium mb-2">Quick Example</summary>
                  <pre className="bg-muted rounded p-3 text-xs mt-2">
{`using System;
using System.Linq;

class Program {
    static int Add(int a, int b) {
        return a + b;
    }
    
    static void Main() {
        int result = Add(10, 5);
        Console.WriteLine($"Sum: {result}");
        
        // Array operations
        int[] numbers = {1, 2, 3, 4, 5};
        foreach (var (num, index) in numbers.Select((n, i) => (n, i))) {
            Console.WriteLine($"Index {index}: {num}");
        }
        
        // LINQ operations
        var doubled = numbers.Select(n => n * 2).ToArray();
        Console.WriteLine($"Doubled: [{string.Join(", ", doubled)}]");
    }
}`}
                  </pre>
                </details>
                <div className="mt-4 text-xs space-y-1">
                  <div><strong>Runtime:</strong> Mono/.NET</div>
                  <div><strong>Use Cases:</strong> Desktop Apps, Web Development</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center pt-8 border-t border-border"
        >
          <p className="text-muted-foreground">
            Ready to start coding? Try out these languages in our online compiler.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/editor">
              <button className="text-purple-600 hover:text-purple-500 transition-colors">
                Try Editor
              </button>
            </Link>
            <Link href="/docs">
              <button className="text-cyan-600 hover:text-cyan-500 transition-colors">
                Back to Docs
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
