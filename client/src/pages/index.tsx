import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Terminal, Code2, ArrowRight, Zap, Globe, Check, Sparkles, Play, Shield, Loader2 } from 'lucide-react';
import { lazy, Suspense } from 'react';

// Lazy load ThreeBackground to reduce initial bundle size
const ThreeBackground = lazy(() => import('../components/ThreeBackground'));

const MaxWidthWrapper = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="group relative bg-card/50 backdrop-blur-lg rounded-lg p-4 sm:p-6 border border-border hover:border-primary/20 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center mb-3 sm:mb-4">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-foreground" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

const features = [
  {
    icon: Terminal,
    title: 'Write Code',
    description: 'Write code in multiple programming languages with syntax highlighting and auto-completion.',
    color: 'from-blue-500 to-purple-600'
  },
  {
    icon: Zap,
    title: 'Run Instantly',
    description: 'Execute your code instantly with our powerful cloud-based compiler infrastructure.',
    color: 'from-yellow-400 to-orange-600'
  },
  {
    icon: Globe,
    title: 'Custom Languages',
    description: 'Support for custom programming languages including BasicCode (bac) and more.',
    color: 'from-green-400 to-emerald-600'
  }
];

const benefits = [
  "Real-time compilation and execution",
  "Multiple programming language support",
  "Cloud-based infrastructure for speed",
  "Custom language integration capabilities"
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Suspense 
        fallback={
          <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 -z-10 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-white/60">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading 3D background...</span>
            </div>
          </div>
        }
      >
        <ThreeBackground />
      </Suspense>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none dark:from-purple-900/20 dark:to-blue-900/20" />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 md:py-32 min-h-screen flex items-center">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto flex flex-col items-center gap-10">
            {/* Floating Logo Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-50 animate-pulse" />
                <Terminal className="w-12 h-12 sm:w-16 sm:h-16 text-white relative z-10" />
              </motion.div>
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotateY: [0, 180, 360]
                }}
                transition={{ 
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
              >
                <Code2 className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400" />
              </motion.div>
            </motion.div>

            {/* Main Heading with Gradient Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center gap-4 sm:gap-6"
            >
              <motion.h1 
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-cyan-400 dark:to-blue-400"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ backgroundSize: "200% auto" }}
              >
                Ar Compiler
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex items-center gap-2 sm:gap-4 text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground"
              >
                <span>Code.</span>
                <motion.span
                  animate={{ color: ["#a855f7", "#06b6d4", "#3b82f6", "#a855f7"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Compile.
                </motion.span>
                <span>Create.</span>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-sm sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed px-4 sm:px-0"
              >
                Experience the future of coding with our advanced browser-based IDE. 
                <br className="hidden sm:block" />
                <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-semibold">
                  Real-time compilation, intelligent syntax highlighting, and seamless execution.
                </span>
              </motion.p>

              {/* Real Features Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="grid grid-cols-2 gap-4 sm:gap-8 mt-4 sm:mt-6 mb-6 sm:mb-8"
              >
                <div className="text-center">
                  <div className="text-xl sm:text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400">11+</div>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1 sm:mt-2">Languages Supported</p>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">Real-time</div>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1 sm:mt-2">Code Execution</p>
                </div>
              </motion.div>

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex justify-center mt-8"
              >
                <Link href="/editor">
                  <motion.button
                    className="group relative px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full overflow-hidden transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                      Start Coding Now
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500"
                      initial={{ x: "100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Features List */}
              <motion.ul 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground mt-8 sm:mt-12"
              >
                {benefits.map((item, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                    className="flex gap-3 items-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-green-400" />
                    </motion.div>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Features Section */}
      <motion.section 
        className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-br from-muted/50 to-background/50 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "tween" }}
      >
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-700 via-purple-600 to-cyan-600 dark:from-purple-300 dark:via-purple-200 dark:to-cyan-200 bg-clip-text text-transparent mb-4 sm:mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Powerful Features
            </motion.h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need for seamless development experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -15, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.08,
                  rotateY: 5,
                  z: 50
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-10 group-hover:opacity-40 transition-all duration-300`} />
                <motion.div 
                  className="relative bg-card/40 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 h-full hover:border-primary/30 text-center"
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 sm:mb-6`}
                  >
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.div>
                  <motion.h3 
                    className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-foreground mb-3 sm:mb-4"
                    whileHover={{ color: "#a855f7" }}
                  >
                    {feature.title}
                  </motion.h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </MaxWidthWrapper>
      </motion.section>

      {/* Technology Section */}
      <motion.section 
        className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-br from-purple-900/10 via-background to-cyan-900/10 dark:from-purple-900/20 dark:via-black dark:to-cyan-900/20"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
      >
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% auto" }}
            >
              BUILT FOR DEVELOPERS
            </motion.h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 sm:mb-16">
              A modern, secure, and reliable code execution platform designed for real development needs.
            </p>
          </motion.div>

          {/* Technology Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
            {[
              { 
                title: "Cloud Security", 
                desc: "Sandboxed execution environment ensures your code runs safely",
                icon: Shield,
                color: "from-green-400 to-emerald-600"
              },
              { 
                title: "Fast Compilation", 
                desc: "Optimized backend delivers quick compile and execution times",
                icon: Zap,
                color: "from-yellow-400 to-orange-600"
              },
              { 
                title: "Multi-Language", 
                desc: "Support for 11+ programming languages with more being added",
                icon: Terminal,
                color: "from-blue-500 to-purple-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, rotateX: 5, scale: 1.05 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300`} />
                <div className="relative bg-card/60 backdrop-blur-lg border border-border rounded-2xl p-6 sm:p-8 group-hover:border-primary/30 transition-all duration-300 text-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                  >
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-foreground mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </MaxWidthWrapper>
      </motion.section>

      {/* Developer Section */}
      <motion.section 
        className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-900/10 to-blue-900/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center"
            >
              <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Built with Passion
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              This compiler was crafted with love and dedication by a passionate developer.
              <br />
              Every line of code, every feature, and every detail has been carefully designed 
              to provide you with the best coding experience possible.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a 
                href="https://ArmaanRawat.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm sm:text-base rounded-full hover:shadow-lg transition-all duration-300"
              >
                <span>Visit ArmaanRawat.me</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </motion.div>
          </motion.div>
        </MaxWidthWrapper>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        className="relative py-16 sm:py-24 md:py-32"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
      >
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6 sm:mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              READY TO SLAY? 🚀
            </motion.h2>
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 sm:mb-12"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Time to show the world what you're made of, legend! 
            </motion.p>
            <Link href="/editor">
              <motion.button
                className="group relative px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 text-lg sm:text-xl md:text-2xl font-black text-white bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-full overflow-hidden"
                whileHover={{ scale: 1.1, boxShadow: "0 0 60px rgba(147, 51, 234, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  boxShadow: [
                    "0 0 20px rgba(147, 51, 234, 0.5)",
                    "0 0 40px rgba(236, 72, 153, 0.5)", 
                    "0 0 20px rgba(6, 182, 212, 0.5)",
                    "0 0 20px rgba(147, 51, 234, 0.5)"
                  ]
                }}
                transition={{
                  backgroundPosition: { duration: 3, repeat: Infinity },
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
                style={{ backgroundSize: "200% auto" }}
              >
                <span className="relative z-10 flex items-center gap-3 sm:gap-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </motion.div>
                  START CODING NOW
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </motion.div>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>

            {/* Motivational Text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground mt-6 sm:mt-8 max-w-2xl mx-auto"
            >
              "The best time to start coding was yesterday. The second best time is NOW!" 
              <br />
              <span className="text-transparent bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text font-semibold">
                - Every Developer Ever
              </span>
            </motion.p>
          </motion.div>
        </MaxWidthWrapper>
      </motion.section>
    </div>
  );
}