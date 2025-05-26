/**
 * Crochet Pattern Challenge Game - WordPress Embed Script
 * 
 * This script creates an embeddable version of the Crochet Pattern Challenge game
 * for WordPress websites using Elementor and Astra theme.
 */

(function() {
  // Create game container
  function createGameContainer() {
    const container = document.createElement('div');
    container.id = 'crochet-game-container';
    container.className = 'crochet-game-embed';
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .crochet-game-embed {
        font-family: 'Quicksand', 'Open Sans', sans-serif;
        max-width: 960px;
        margin: 0 auto;
        background: #F7F4FB;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      }
      
      .crochet-game-embed iframe {
        width: 100%;
        height: 700px;
        border: none;
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
        padding: 10px 20px;
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
    `;
    document.head.appendChild(style);
    
    // Add Google Fonts for Quicksand and Open Sans
    if (!document.getElementById('crochet-game-fonts')) {
      const fonts = document.createElement('link');
      fonts.id = 'crochet-game-fonts';
      fonts.rel = 'stylesheet';
      fonts.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap';
      document.head.appendChild(fonts);
    }
    
    // Create header
    const header = document.createElement('div');
    header.className = 'game-header';
    
    const title = document.createElement('h2');
    title.textContent = 'Crochet Pattern Challenge';
    
    const subtitle = document.createElement('span');
    subtitle.textContent = 'Test your knowledge!';
    
    header.appendChild(title);
    header.appendChild(subtitle);
    
    // Create iframe to load the game
    const iframe = document.createElement('iframe');
    iframe.id = 'crochet-game-iframe';
    iframe.src = 'https://REPLACE_WITH_YOUR_REPLIT_APP_URL';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    
    // Create footer
    const footer = document.createElement('div');
    footer.className = 'game-footer';
    
    const footerText = document.createElement('p');
    footerText.textContent = '© ' + new Date().getFullYear() + ' Crochet Pattern Challenge. Share this game with fellow crochet enthusiasts!';
    
    footer.appendChild(footerText);
    
    // Assemble container
    container.appendChild(header);
    container.appendChild(iframe);
    container.appendChild(footer);
    
    return container;
  }
  
  // Initialize game embed
  function initGameEmbed() {
    // Find all elements with the crochet-game class
    const embedTargets = document.querySelectorAll('.crochet-game');
    
    if (embedTargets.length > 0) {
      embedTargets.forEach(target => {
        const gameContainer = createGameContainer();
        target.appendChild(gameContainer);
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