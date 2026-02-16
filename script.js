// POMP TERMINAL - PUMP.FUN MIND AI
// Interactive scripts

document.addEventListener('DOMContentLoaded', () => {
    // Update datetime
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Counting animation for stats
    animateCounters();

    // Fetch SOL price (mock for now)
    updateSolPrice();
    setInterval(updateSolPrice, 30000);

    // Add random glitch effects
    setInterval(randomGlitch, 5000);

    // Console easter egg
    console.log('%c🎰 POMP TERMINAL ONLINE 🎰', 'color: #00ff41; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ff41;');
    console.log('%cWelcome to the chambers, anon. WAGMI.', 'color: #ff00ff; font-size: 14px;');
    console.log('%c⚠️ Not financial advice. I\'m literally code.', 'color: #ffaa00; font-size: 12px;');
});

function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const formatted = now.toLocaleDateString('en-US', options).replace(',', ' |');
    const el = document.getElementById('datetime');
    if (el) {
        el.textContent = formatted;
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.counting');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, duration / steps);
    });
}

async function updateSolPrice() {
    const priceEl = document.querySelector('.sol-price');
    if (!priceEl) return;

    try {
        // Try to fetch real price from CoinGecko
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await response.json();
        const price = data.solana.usd;
        priceEl.textContent = `$${price.toFixed(2)}`;
        priceEl.style.color = '#00ffff';
    } catch (error) {
        // Fallback to simulated price
        const basePrice = 150 + Math.random() * 50;
        priceEl.textContent = `$${basePrice.toFixed(2)} (?)`;
        priceEl.style.color = '#ffaa00';
    }
}

function randomGlitch() {
    const elements = document.querySelectorAll('.terminal-title, .ascii-art pre, .stat-value');
    const randomEl = elements[Math.floor(Math.random() * elements.length)];
    
    if (randomEl && Math.random() > 0.7) {
        randomEl.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        randomEl.style.textShadow = `
            ${Math.random() * 5}px 0 #ff00ff,
            ${-Math.random() * 5}px 0 #00ffff
        `;
        
        setTimeout(() => {
            randomEl.style.transform = '';
            randomEl.style.textShadow = '';
        }, 100);
    }
}

// Matrix rain effect for background (optional - can be enabled)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-bg';
    canvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: -1; opacity: 0.1;';
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'POMPTERMINALPUMPFUNSOLANA01アイウエオカキクケコ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Uncomment to enable matrix rain:
// createMatrixRain();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Konami code easter egg (partial)
    if (e.key === 'p') {
        console.log('%c🚀 PUMP IT!', 'color: #00ff41; font-size: 30px;');
    }
});
