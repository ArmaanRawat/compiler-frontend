
import React from 'react';
import Navbar from './Navbar';
import MobileNavbar from './MobileNavbar';
import Footer from './Footer';
import { useResponsive } from '../hooks/useResponsive';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isMobile } = useResponsive();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300">
      {/* Background pattern - hidden on mobile for performance */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none hidden md:block" />
      
      {/* Navigation - Conditional based on screen size */}
      {isMobile ? <MobileNavbar /> : <Navbar />}
      
      {/* Main content area */}
      <main className={`flex-grow flex flex-col relative ${isMobile ? 'pt-14' : 'pt-16'}`}>
        {/* Background gradient - responsive */}
        <div className="absolute inset-x-0 top-0 h-32 md:h-64 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent dark:from-blue-400/5 dark:via-purple-400/5 pointer-events-none" />
        
        {/* Content wrapper with responsive padding */}
        <div className="relative flex-grow flex flex-col">
          <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 flex-grow">
            {children}
          </div>
        </div>
      </main>
      
      {/* Footer - hidden on mobile for space */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
