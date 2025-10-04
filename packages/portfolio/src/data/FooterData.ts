// Footer component için örnek data yapısı

const footerData = {
    description: "Creating beautiful digital experiences with modern technologies and clean code. Let's build something amazing together.",
    
    sections: [
      {
        title: "Quick Links",
        links: [
          { label: "Home", url: "#hero" },
          { label: "About", url: "#about" },
          { label: "Projects", url: "#projects" },
          { label: "Contact", url: "#contact" }
        ]
      },
      {
        title: "Services",
        links: [
          { label: "Web Development", url: "/services/web" },
          { label: "UI/UX Design", url: "/services/design" },
          { label: "Mobile Apps", url: "/services/mobile" },
          { label: "Consulting", url: "/services/consulting" }
        ]
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", url: "/blog" },
          { label: "Portfolio", url: "/portfolio" },
          { label: "Documentation", url: "/docs" },
          { label: "Support", url: "/support" }
        ]
      }
    ],
  
    social: [
      { name: "GitHub", url: "https://github.com/bugracntp", icon: "github" },
      { name: "LinkedIn", url: "https://linkedin.com/in/bugracntp", icon: "linkedin" },
      { name: "Twitter", url: "https://twitter.com/bugracntp", icon: "twitter" },
      { name: "Instagram", url: "https://instagram.com/bugracntp", icon: "instagram" },
      { name: "Email", url: "mailto:contact@bugracntp.com", icon: "email" }
    ],
  
    email: "contact@bugracntp.com",
    copyright: "2025 Buğra Cantop. All rights reserved."
  };
  
  // Kullanım:
  // <Footer data={footerData} language="en" />
  
  // veya Türkçe için:
  const footerDataTR = {
    description: "Modern teknolojiler ve temiz kod ile güzel dijital deneyimler yaratıyoruz. Birlikte harika bir şeyler inşa edelim.",
    
    sections: [
      {
        title: "Hızlı Bağlantılar",
        links: [
          { label: "Ana Sayfa", url: "#hero" },
          { label: "Hakkımda", url: "#about" },
          { label: "Projeler", url: "#projects" },
          { label: "İletişim", url: "#contact" }
        ]
      },
      {
        title: "Hizmetler",
        links: [
          { label: "Web Geliştirme", url: "/services/web" },
          { label: "UI/UX Tasarım", url: "/services/design" },
          { label: "Mobil Uygulamalar", url: "/services/mobile" },
          { label: "Danışmanlık", url: "/services/consulting" }
        ]
      },
      {
        title: "Kaynaklar",
        links: [
          { label: "Blog", url: "/blog" },
          { label: "Portfolyo", url: "/portfolio" },
          { label: "Dokümantasyon", url: "/docs" },
          { label: "Destek", url: "/support" }
        ]
      }
    ],
  
    social: [
      { name: "GitHub", url: "https://github.com/bugracntp", icon: "github" },
      { name: "LinkedIn", url: "https://linkedin.com/in/bugracntp", icon: "linkedin" },
      { name: "Twitter", url: "https://twitter.com/bugracntp", icon: "twitter" },
      { name: "Instagram", url: "https://instagram.com/bugracntp", icon: "instagram" },
      { name: "E-posta", url: "mailto:contact@bugracntp.com", icon: "email" }
    ],
  
    email: "contact@bugracntp.com",
    copyright: "2025 Buğra Cantop. Tüm hakları saklıdır."
  };
  
  // <Footer data={footerDataTR} language="tr" />