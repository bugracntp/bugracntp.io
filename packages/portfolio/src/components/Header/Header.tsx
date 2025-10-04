import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { portfolioData } from '../../data/PortfolioData';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  
  const availabilityData = portfolioData[language].availability;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', href: '#hero', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { key: 'about', href: '#about', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { key: 'experience', href: '#experience', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { key: 'projects', href: '#projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { key: 'skills', href: '#skills', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },

    { key: 'contact', href: '#contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Available Badge - Logo yerine */}
        {availabilityData.show && (
          <a href="#hero" className={styles.availableBadge} onClick={(e) => handleNavClick(e, '#hero')}>
            <span className={styles.badgeDot}></span>
            <span className={styles.badgeText}>
              <span className={styles.wave}>{availabilityData.icon}</span>
              {availabilityData.text}
            </span>
          </a>
        )}

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className={`${styles.navLink} ${activeSection === item.href.slice(1) ? styles.active : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <svg className={styles.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                  <span>{t(`nav.${item.key}`)}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Controls */}
        <div className={styles.controls}>
          {/* CV Download Button */}
          <button
            className={styles.cvButton}
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/bugracantepe.pdf'; // CV dosyasının public klasöründeki yolu
              link.download = 'Bugra_Cantepe_CV.pdf'; // İndirilecek dosyanın adı
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            aria-label="Download CV"
          >
            <svg className={styles.cvIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10,9 9,9 8,9" />
            </svg>
            <span className={styles.cvText}>CV</span>
          </button>

          {/* Language Toggle */}
          <div className={styles.langSwitch}>
            <button
              className={`${styles.langOption} ${language === 'tr' ? styles.langActive : ''}`}
              onClick={() => changeLanguage('tr')}
            >
              TR
            </button>
            <button
              className={`${styles.langOption} ${language === 'en' ? styles.langActive : ''}`}
              onClick={() => changeLanguage('en')}
            >
              EN
            </button>
            <div className={`${styles.langSlider} ${language === 'en' ? styles.langSliderRight : ''}`}></div>
          </div>

          {/* Theme Toggle */}
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            <div className={styles.themeIcon}>
              <svg className={styles.sunIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <svg className={styles.moonIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavList}>
          {navItems.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                className={`${styles.mobileNavLink} ${activeSection === item.href.slice(1) ? styles.active : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
                <span>{t(`nav.${item.key}`)}</span>
              </a>
            </li>
          ))}
          <li>
            <button
              className={styles.mobileCvButton}
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/bugracantepe.pdf';
                link.download = 'Bugra_Cantepe_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setIsMobileMenuOpen(false);
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
              <span>CV İndir</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div className={styles.backdrop} onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </header>
  );
};

export default Header;