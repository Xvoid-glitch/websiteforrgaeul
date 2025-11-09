// script.js
document.addEventListener('DOMContentLoaded', () => {
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');

  // Show notification for user (only if they logged in as user before)
  if (role === 'user' && name) {
    setTimeout(() => {
      alert(`Hai ${name} imutt`);
    }, 1000);
  }

  const openBtn = document.getElementById('open-letter-btn');
  const letter = document.getElementById('scroll-letter');
  const memoriesSection = document.getElementById('memories-section');
  const replySection = document.getElementById('reply-section');
  const sendBtn = document.getElementById('send-reply-btn');

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
      localStorage.setItem('darkMode', isDarkMode);
    });
  }

  // Particle.js Initialization
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ff6b9d' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#ff6b9d', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
      modes: { repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });

  // Animasi background bunga/hati
  const bg = document.getElementById('background');
  const emojis = ['', '', '', '', '', ''];
  for (let i = 0; i < 15; i++) {
    const el = document.createElement('div');
    el.className = 'floating';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = Math.random() * 100 + 'vh';
    el.style.fontSize = (16 + Math.random() * 20) + 'px';
    el.style.animationDelay = Math.random() * 10 + 's';
    bg.appendChild(el);
  }

  // Buka surat
  openBtn.addEventListener('click', () => {
    window.location.href = 'surat.html';
  });

  // Tampilkan balasan saat scroll ke bawah
  let replyShown = false;
  window.addEventListener('scroll', () => {
    if (!replyShown && window.scrollY + window.innerHeight > document.body.scrollHeight - 500) {
      replySection.classList.remove('hidden');
      replyShown = true;
    }
  });

  // Progress bar and badges for memories
  const unlockedMemories = JSON.parse(localStorage.getItem('unlockedMemories') || '[]');
  const totalMemories = 6;
  const progressPercentage = (unlockedMemories.length / totalMemories) * 100;
  document.getElementById('progress-fill').style.width = progressPercentage + '%';
  document.getElementById('progress-text').textContent = `Kenangan Terbuka: ${unlockedMemories.length}/${totalMemories}`;

  // Badges
  const badgesContainer = document.getElementById('badges-container');
  const badges = [];

  if (unlockedMemories.length > 0) {
    badges.push('First Memory Unlocked');
  }
  if (unlockedMemories.length >= 3) {
    badges.push('Memory Collector');
  }
  if (unlockedMemories.length === totalMemories) {
    badges.push('Complete Collection');
  }

  // Check for first reply
  const replies = JSON.parse(localStorage.getItem('replies') || '[]');
  if (replies.length > 0) {
    badges.push('First Reply');
  }

  // Check for dark mode user
  if (document.body.classList.contains('dark-mode')) {
    badges.push('Dark Mode User');
  }

  badges.forEach(badge => {
    const badgeElement = document.createElement('div');
    badgeElement.className = 'badge';
    badgeElement.textContent = badge;
    badgesContainer.appendChild(badgeElement);
  });

  // Kirim balasan
  sendBtn.addEventListener('click', () => {
    const msg = document.getElementById('reply-text').value.trim();
    if (msg) {
      // Save reply to localStorage
      const replies = JSON.parse(localStorage.getItem('replies') || '[]');
      replies.push({
        name: name || 'Guest',
        message: msg,
        timestamp: new Date().toLocaleString()
      });
      localStorage.setItem('replies', JSON.stringify(replies));

      // Track visitor
      const visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
      visitors.push({
        role: role,
        name: name || 'Guest',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('visitors', JSON.stringify(visitors));

      document.getElementById('reply-text').value = '';
    } else {
      alert('Tulis dulu, sayang... 😢');
    }
  });

  // Enhanced Parallax Scrolling
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    document.querySelector('.hero').style.transform = `translateY(${rate}px)`;

    // Parallax for background elements
    const bg = document.querySelector('.background-elements');
    if (bg) {
      bg.style.transform = `translateY(${scrolled * 0.2}px)`;
    }

    // Parallax for timeline
    const timeline = document.querySelector('.timeline');
    if (timeline) {
      timeline.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });

  // Enhanced Interactive Timeline
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'scale(1.05) rotateY(5deg)';
      item.style.transition = 'transform 0.3s ease';
      item.style.boxShadow = '0 10px 30px rgba(255, 107, 157, 0.3)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'scale(1)';
      item.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
    });
    item.addEventListener('click', () => {
      // Add click animation
      item.style.transform = 'scale(0.95) rotateY(10deg)';
      setTimeout(() => {
        item.style.transform = 'scale(1) rotateY(5deg)';
      }, 150);
    });
  });

  // Enhanced Micro-animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 1s ease forwards';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

  // Additional micro-animations for elements
  const animateOnScroll = (selector, animation) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      observer.observe(el);
      el.style.animation = animation;
    });
  };

  animateOnScroll('.timeline-item', 'slideInLeft 1.2s ease forwards');
  animateOnScroll('.photo-card', 'zoomIn 1s ease forwards');
  animateOnScroll('.badge', 'bounceIn 0.8s ease forwards');

  // 3D Transitions
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'perspective(1000px) rotateX(10deg)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'perspective(1000px) rotateX(0deg)';
    });
  });
});

// Dark Mode Function
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const toggleIcon = document.querySelector('.dark-mode-toggle i');
  if (document.body.classList.contains('dark-mode')) {
    toggleIcon.classList.remove('fa-moon');
    toggleIcon.classList.add('fa-sun');
  } else {
    toggleIcon.classList.remove('fa-sun');
    toggleIcon.classList.add('fa-moon');
  }
}

// Additional CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  .floating {
    position: absolute;
    animation: float 10s infinite ease-in-out;
    pointer-events: none;
  }
`;
document.head.appendChild(style);
