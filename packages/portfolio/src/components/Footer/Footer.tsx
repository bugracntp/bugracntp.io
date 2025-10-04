import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Footer.module.css';

type FooterLink = {
  label: string;
  url: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type SocialLink = {
  name: string;
  url: string;
  icon: string;
};

type FooterData = {
  sections: FooterSection[];
  social: SocialLink[];
  email: string;
  copyright: string;
  description: string;
};

type FooterProps = {
  data: FooterData;
  language: 'tr' | 'en' | string;
};

const Footer: React.FC<FooterProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic here
    console.log('Subscribe:', email);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      {/* Animated Background */}
      <div className={styles.footerBackground}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.topSection}>
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <span className={styles.logoGradient}>BC</span>
              <div className={styles.logoPulse}></div>
            </div>
            <p className={styles.description}>{data.description}</p>
            
            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className={styles.newsletter}>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
              <button type="submit" className={styles.subscribeBtn}>
                <span>Subscribe</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
          </div>

          {/* Links Sections */}
          <div className={styles.linksGrid}>
            {data.sections.map((section, index) => (
              <div key={index} className={styles.linkSection}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <ul className={styles.linkList}>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.url}
                        className={styles.link}
                        onMouseEnter={() => setIsHovered(`${index}-${linkIndex}`)}
                        onMouseLeave={() => setIsHovered(null)}
                      >
                        <span className={styles.linkDot}></span>
                        {link.label}
                        {isHovered === `${index}-${linkIndex}` && (
                          <svg className={styles.linkArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider with gradient */}
        <div className={styles.divider}>
          <div className={styles.dividerGradient}></div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            <span className={styles.copyrightIcon}>©</span>
            {data.copyright}
          </div>

          {/* Social Links */}
          <div className={styles.socialLinks}>
            {data.social.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                {social.icon === 'github' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                )}
                {social.icon === 'linkedin' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                )}
                {social.icon === 'twitter' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                )}
                {social.icon === 'instagram' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                )}
                {social.icon === 'email' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                )}
                <div className={styles.socialTooltip}>{social.name}</div>
              </a>
            ))}
          </div>

          {/* Scroll to Top Button */}
          <button 
            onClick={scrollToTop}
            className={styles.scrollTop}
            aria-label="Scroll to top"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        </div>

        {/* Made with love */}
        <div className={styles.madeWith}>
          <span>Made with</span>
          <svg className={styles.heart} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>by Buğra Cantepe</span>
        </div>
      </div>

      {/* Floating particles */}
      <div className={styles.particle1}></div>
      <div className={styles.particle2}></div>
      <div className={styles.particle3}></div>
    </footer>
  );
};

export default Footer;