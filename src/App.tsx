import { useEffect } from 'react';
import { Header, Hero } from './components';

function App() {
  useEffect(() => {
    // Matrix decryption effect
    const setupMatrixEffect = () => {
      const matrixBtn = document.querySelector('.matrix-btn');
      const matrixText = document.querySelector('[data-matrix-text]') as HTMLElement;
      const aboutBtn = document.querySelector('.about-me-btn');
      const aboutText = document.querySelector('[data-about-text]') as HTMLElement;
        
      if (!matrixText && !aboutText) {
        console.log('No text elements found');
        return;
      }

      const menuOriginalText = 'MENU';
      const aboutOriginalText = 'ABOUT ME';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      let animationId: number | null = null;
      let isAnimating = false;

      const scrambleText = (element: HTMLElement, finalText: string, duration = 1200) => {
        if (isAnimating) return;
        
        console.log('Starting scramble animation');
        isAnimating = true;
        const startTime = Date.now();
        const textLength = finalText.length;
        let frameCount = 0;

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Only update every 4th frame to slow down the scrambling more
          frameCount++;
          if (frameCount % 4 === 0) {
            let scrambledText = '';
            
            for (let i = 0; i < textLength; i++) {
              // Use a threshold that ensures all characters scramble initially
              const charProgress = (progress * textLength * 0.6) - i;
              
              if (charProgress > 0.3) {
                // Character is "decrypted"
                scrambledText += finalText[i];
              } else {
                // Character is still scrambled
                scrambledText += chars[Math.floor(Math.random() * chars.length)];
              }
            }

            // Directly update the main text content
            element.textContent = scrambledText;
          }

          if (progress < 1) {
            animationId = requestAnimationFrame(animate);
          } else {
            element.textContent = finalText;
            isAnimating = false;
            console.log('Scramble animation complete');
          }
        };

        animate();
      };

      const startMatrixEffect = () => {
        console.log('Matrix hover started');
        // Cancel any ongoing animation
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        isAnimating = false;
        
        // Start scrambling immediately
        if (matrixText) {
          scrambleText(matrixText, menuOriginalText, 1200);
        }
      };

      const resetMatrixText = () => {
        console.log('Matrix hover ended');
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        isAnimating = false;
        if (matrixText) {
          matrixText.textContent = menuOriginalText;
        }
      };

      const startAboutEffect = () => {
        console.log('About hover started');
        // Cancel any ongoing animation
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        isAnimating = false;
        
        // Start scrambling immediately
        if (aboutText) {
          scrambleText(aboutText, aboutOriginalText, 1200);
        }
      };

      const resetAboutText = () => {
        console.log('About hover ended');
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        isAnimating = false;
        if (aboutText) {
          aboutText.textContent = aboutOriginalText;
        }
      };

      // Add event listeners for matrix button
      matrixBtn?.addEventListener('mouseenter', startMatrixEffect);
      matrixBtn?.addEventListener('mouseleave', resetMatrixText);
      
      // Add event listeners for about button
      aboutBtn?.addEventListener('mouseenter', startAboutEffect);
      aboutBtn?.addEventListener('mouseleave', resetAboutText);
      
      console.log('Matrix effect setup complete');

      // Add click effect with enhanced animation
      matrixBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create ripple effect
        const rect = (matrixBtn as HTMLElement).getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.className = 'matrix-ripple';
        
        const size = Math.max(rect.width, rect.height);
        const x = (e as MouseEvent).clientX - rect.left - size / 2;
        const y = (e as MouseEvent).clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: radial-gradient(circle, rgba(0, 0, 0, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: matrixRipple 0.6s ease-out;
          z-index: -1;
        `;
        
        (matrixBtn as HTMLElement).appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
          ripple.remove();
        }, 600);

        console.log('Matrix button clicked - ready for future functionality');
      });

      // Add CSS for ripple animation
      if (!document.querySelector('#matrix-ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'matrix-ripple-styles';
        style.textContent = `
          @keyframes matrixRipple {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }

          .matrix-ripple {
            animation: matrixRipple 0.6s ease-out !important;
          }
        `;
        document.head.appendChild(style);
      }
    };

    // Initialize matrix effect
    setupMatrixEffect();
  }, []);

  return (
    <div id="app" className="min-h-screen relative">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;
