/**
 * Crochet Pattern Challenge Game - Embed Script for WordPress
 * Optimized for speed and performance
 */

(function() {
  // Create game container and load the game
  function createGameContainer() {
    // Create the main container
    const container = document.createElement('div');
    container.id = 'crochet-game-container';
    container.className = 'crochet-game-embed';
    
    // Add styles with critical CSS
    const style = document.createElement('style');
    style.textContent = `
      .crochet-game-embed {
        font-family: 'Quicksand', 'Open Sans', sans-serif;
        max-width: 800px;
        margin: 0 auto;
        background: #F7F4FB;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }
      
      .crochet-game-embed iframe {
        width: 100%;
        height: 700px;
        border: none;
        display: block;
      }
      
      .crochet-game-embed .game-header {
        background: #8B5FBF;
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .crochet-game-embed .game-header h2 {
        margin: 0;
        font-weight: 700;
        font-size: 1.5rem;
      }
      
      .crochet-game-embed .game-footer {
        padding: 10px 15px;
        font-size: 0.8rem;
        text-align: center;
        background: #463366;
        color: white;
      }
      
      @media (max-width: 768px) {
        .crochet-game-embed iframe {
          height: 600px;
        }
      }
      
      @media (max-width: 480px) {
        .crochet-game-embed iframe {
          height: 500px;
        }
        .crochet-game-embed .game-header {
          flex-direction: column;
          text-align: center;
        }
        .crochet-game-embed .game-header span {
          margin-top: 5px;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Add Google Fonts preconnect for faster loading
    if (!document.getElementById('crochet-game-fonts-preconnect')) {
      const preconnect1 = document.createElement('link');
      preconnect1.id = 'crochet-game-fonts-preconnect';
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnect1);
      
      const preconnect2 = document.createElement('link');
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = '';
      document.head.appendChild(preconnect2);
      
      // Add fonts after preconnect
      const fonts = document.createElement('link');
      fonts.rel = 'stylesheet';
      fonts.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap';
      fonts.media = 'print';
      fonts.onload = function() { this.media = 'all'; };
      document.head.appendChild(fonts);
    }
    
    // Create header
    const header = document.createElement('div');
    header.className = 'game-header';
    
    const title = document.createElement('h2');
    title.textContent = 'Crochet Pattern Challenge';
    
    const subtitle = document.createElement('span');
    subtitle.textContent = 'Test your crochet knowledge!';
    
    header.appendChild(title);
    header.appendChild(subtitle);
    
    // Create iframe with lazy loading
    const iframe = document.createElement('iframe');
    iframe.id = 'crochet-game-iframe';
    iframe.loading = 'lazy';
    iframe.title = 'Crochet Pattern Challenge Game';
    
    // Get the path to the standalone game file
    const scriptPath = document.currentScript.src;
    const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/'));
    iframe.src = basePath + '/crochet-game.html';
    
    iframe.setAttribute('allowfullscreen', '');
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    
    // Create footer
    const footer = document.createElement('div');
    footer.className = 'game-footer';
    
    const footerText = document.createElement('p');
    footerText.textContent = '© ' + new Date().getFullYear() + ' Crochet Pattern Challenge';
    
    footer.appendChild(footerText);
    
    // Assemble container
    container.appendChild(header);
    container.appendChild(iframe);
    container.appendChild(footer);
    
    return container;
  }
  
  // Initialize game embed
  function initGameEmbed() {
    // Find elements with data-crochet-game attribute or class
    const embedTargets = document.querySelectorAll('[data-crochet-game], .crochet-game');
    
    if (embedTargets.length > 0) {
      embedTargets.forEach(target => {
        const gameContainer = createGameContainer();
        target.appendChild(gameContainer);
        
        // Add data attributes to iframe if they exist on the target
        const iframe = gameContainer.querySelector('iframe');
        if (target.dataset.height) {
          iframe.style.height = target.dataset.height + 'px';
        }
        if (target.dataset.theme) {
          iframe.setAttribute('data-theme', target.dataset.theme);
        }
      });
    }
  }
  
  // Run when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGameEmbed);
  } else {
    initGameEmbed();
  }
})();