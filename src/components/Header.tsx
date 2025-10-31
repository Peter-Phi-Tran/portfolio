import { useEffect, useRef } from 'react';

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header ref={headerRef} className="header">
      <div className="w-full py-4 flex items-center" style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div className="flex-1 flex justify-start">
          <div className="name-box about-me-btn" data-about-toggle>
            <span className="about-text" data-about-text>ABOUT ME</span>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center">
          <span className="text-sm font-medium" style={{
            fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
            letterSpacing: '0.05em',
            color: 'rgba(0, 0, 0, 0.7)',
            transform: 'translateY(4px)'
          }}>
            Fall 2025
          </span>
        </div>
        
        <div className="flex-1 flex justify-end">
          <button className="matrix-btn" data-menu-toggle>
            <span className="matrix-text" data-matrix-text>MENU</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;