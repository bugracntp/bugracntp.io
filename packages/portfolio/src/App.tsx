import Hero from './components/Hero/Hero';
import Header from './components/Header/Header';
import About from './components/About/About';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { portfolioData } from './data/PortfolioData';
import './styles/global.css';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import React from 'react';

function AppContent() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [showScrollTop, setShowScrollTop] = React.useState<boolean>(false);

  React.useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) {
      const onScroll = () => setShowScrollTop(window.scrollY > window.innerHeight * 0.3);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setShowScrollTop(!entry.isIntersecting);
      },
      { root: null, threshold: 0.2 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero 
        data={portfolioData[language].hero}
        language={language}
      />

      {/* About Section */}
      <About 
        data={portfolioData[language].about}
        isDark={theme === 'dark'}
      />
      {/* Experience Section */}
      <Experience 
        data={portfolioData[language].experience}
        isDark={theme === 'dark'}
      />

      {/* Projects Section */}
      <Projects 
        isDark={theme === 'dark'} 
      />

      {/* Skills Section */}
      <Skills 
        data={portfolioData[language].skills}
        isDark={theme === 'dark'}
      />
      {/* Contact Section */}
      <Contact 
        data={portfolioData[language].contact}
        isDark={theme === 'dark'}
      />

      {/* Footer Section */}
      <Footer 
        data={portfolioData[language].footer}
        language={language}
      />    

      {/* Global Scroll To Top (hidden on Hero) */}
      <button
        aria-label="Scroll to top"
        className={`globalScrollTop ${showScrollTop ? '' : 'isHidden'}`}
        onClick={handleScrollTop}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;