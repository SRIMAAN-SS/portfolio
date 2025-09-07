// Professional Navigation System
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');
  
  // Check if elements exist before adding event listeners
  if (!navToggle || !navMenu || !navbar) {
    console.error('Navigation elements not found');
    return;
  }

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle with animation
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Professional navigation with smooth scrolling
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Smooth scroll to target
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// Professional Developer Features
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Typing animation for hero greeting
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Initialize typing animation when page loads
  const greeting = document.querySelector('.hero-greeting');
  if (greeting) {
    const originalText = greeting.textContent;
    setTimeout(() => {
      typeWriter(greeting, originalText, 80);
    }, 1000);
  }
});

// Professional scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        
        // Animate child elements with professional stagger
        const animatedElements = entry.target.querySelectorAll(
          '.project-card, .skill-category, .timeline-item, .internship-card, .contact-item, .hero-stat'
        );
        
        animatedElements.forEach((element, index) => {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, index * 150);
        });
      }
    });
  }, observerOptions);

  // Observe all sections for animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
});

// Professional counter animation for hero stats
document.addEventListener('DOMContentLoaded', () => {
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + '+';
      }
    }
    updateCounter();
  }

  // Initialize counter animations when hero stats come into view
  const heroStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numbers = entry.target.querySelectorAll('.hero-stat-number');
        numbers.forEach((number, index) => {
          const target = parseInt(number.textContent);
          setTimeout(() => {
            animateCounter(number, target);
          }, index * 200);
        });
        heroStatsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    heroStatsObserver.observe(heroStats);
  }
});

// Professional cursor trail effect
document.addEventListener('DOMContentLoaded', () => {
  class CursorTrail {
    constructor() {
      this.cursor = document.createElement('div');
      this.cursor.className = 'cursor-trail';
      this.cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(41, 121, 255, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
      `;
      document.body.appendChild(this.cursor);
      
      this.init();
    }
    
    init() {
      document.addEventListener('mousemove', (e) => {
        this.cursor.style.left = e.clientX - 10 + 'px';
        this.cursor.style.top = e.clientY - 10 + 'px';
      });
      
      document.addEventListener('mouseenter', () => {
        this.cursor.style.opacity = '1';
      });
      
      document.addEventListener('mouseleave', () => {
        this.cursor.style.opacity = '0';
      });
    }
  }

  // Initialize cursor trail on desktop only
  if (window.innerWidth > 768) {
    new CursorTrail();
  }
});

// Professional performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  const performanceOptimizations = {
    // Debounce scroll events
    debounce: (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    
    // Throttle resize events
    throttle: (func, limit) => {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  };

  // Optimized scroll handler
  const optimizedScrollHandler = performanceOptimizations.debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    // Scroll to top button
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    }
  }, 10);

  window.addEventListener('scroll', optimizedScrollHandler);
});

// Professional loading screen with progress
document.addEventListener('DOMContentLoaded', () => {
  class LoadingScreen {
    constructor() {
      this.overlay = document.getElementById('loading-overlay');
      this.percent = document.getElementById('loading-percent');
      this.init();
    }
    
    init() {
      if (!this.overlay || !this.percent) return;
      
      let progress = 0;
      const duration = 2000;
      const steps = 100;
      const increment = 100 / steps;
      const interval = duration / steps;
      
      const updateProgress = () => {
        if (progress < 100) {
          progress += increment;
          this.percent.textContent = Math.round(progress) + '%';
          setTimeout(updateProgress, interval);
        } else {
          this.percent.textContent = '100%';
          setTimeout(() => {
            this.overlay.style.opacity = '0';
            setTimeout(() => {
              this.overlay.remove();
              document.body.style.overflow = '';
            }, 500);
          }, 300);
        }
      };
      
      document.body.style.overflow = 'hidden';
      updateProgress();
    }
  }

  // Initialize loading screen
  new LoadingScreen();
});

// Professional error handling and analytics
document.addEventListener('DOMContentLoaded', () => {
  // Professional error handling
  window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // Could implement error reporting here
  });

  // Professional analytics placeholder
  const analytics = {
    track: (event, data) => {
      console.log('Analytics Event:', event, data);
      // Implement actual analytics tracking here
    }
  };

  // Track important user interactions
  document.addEventListener('click', (e) => {
    if (e.target.matches('.btn')) {
      analytics.track('button_click', {
        button_text: e.target.textContent.trim(),
        button_type: e.target.classList.contains('btn-primary') ? 'primary' : 'secondary'
      });
    }
    
    if (e.target.matches('.nav-link')) {
      analytics.track('navigation_click', {
        section: e.target.getAttribute('href')
      });
    }
  });

  // Professional keyboard navigation
  document.addEventListener('keydown', (e) => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      if (navToggle) navToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Arrow keys for navigation (accessibility)
    if (e.key === 'ArrowDown' && e.ctrlKey) {
      e.preventDefault();
      const currentSection = document.querySelector('section:target');
      if (currentSection) {
        const nextSection = currentSection.nextElementSibling;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });

  // Professional theme system (for future dark/light mode)
  const themeSystem = {
    current: 'dark',
    
    init: () => {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme) {
        themeSystem.current = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    },
    
    toggle: () => {
      themeSystem.current = themeSystem.current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', themeSystem.current);
      localStorage.setItem('portfolio-theme', themeSystem.current);
    }
  };

  // Initialize theme system
  themeSystem.init();

  // Professional console branding
  console.log(`
%c🚀 SRIMAAN S S - Portfolio
%cBuilt with passion and modern web technologies
%cContact: srimaan262004@gmail.com

`, 
'color: #2979ff; font-size: 20px; font-weight: bold;',
'color: #00b4d8; font-size: 14px;',
'color: #64b5f6; font-size: 12px;'
);
});

// Project Details Modal Logic
const projectDetails = [
  {
    title: 'eCramming',
    desc: `<p>eCramming is a smart e-learning platform designed to help students learn effectively through structured courses, quick revision content, and interactive assessments. Built with the MERN stack for a smooth, responsive experience and scalable backend.</p>
    <b>Technologies Used (MERN):</b>
    <ul>
      <li>Frontend: React (Vite/CRA), CSS</li>
      <li>Backend: Node.js + Express.js</li>
      <li>Database: MongoDB (Mongoose)</li>
    </ul>
    <p style='margin-top:1rem;'><b>For more details, visit my GitHub profile.</b></p>`
  },
  {
    title: 'BloodSync',
    desc: `<p>BloodSync is a real-time web application that connects blood donors with recipients. Users can register as donors, request blood by group and location, and track availability. Rebuilt on the MERN stack for a full web experience.</p>
    <b>Technologies Used (MERN):</b>
    <ul>
      <li>Frontend: React</li>
      <li>Backend: Node.js + Express.js (with Socket.IO for real-time updates)</li>
      <li>Database: MongoDB (Mongoose)</li>
    </ul>
    <p style='margin-top:1rem;'><b>For more details, visit my GitHub profile.</b></p>`
  },
  {
    title: 'Parking Management System',
    desc: `<p>The Parking Management System automates parking operations: slot creation, occupancy monitoring, and check-in/out workflows. Delivered as a MERN application with a REST API and interactive dashboard.</p>
    <b>Technologies Used (MERN):</b>
    <ul>
      <li>Frontend: React</li>
      <li>Backend: Node.js + Express.js</li>
      <li>Database: MongoDB (Mongoose)</li>
    </ul>
    <p style='margin-top:1rem;'><b>For more details, visit my GitHub profile.</b></p>`
  },
  {
    title: 'Hand Cricket',
    desc: `<p>Hand Cricket is a fun number-based game brought to the web. Choose numbers from 1–6 and challenge the computer in batting and bowling modes with live score tracking.</p>
    <b>Technologies Used (MERN):</b>
    <ul>
      <li>Frontend: React</li>
      <li>Backend: Node.js + Express.js (for high-score API)</li>
      <li>Database: MongoDB</li>
    </ul>
    <p style='margin-top:1rem;'><b>For more details, visit my GitHub profile.</b></p>`
  },
  {
    title: 'Air and Pollution Monitoring Drone',
    desc: `<p>An IoT-driven setup for monitoring air quality. Sensor data streams into a MERN-based dashboard for storage, analysis, and visualization to identify pollution hotspots and trends.</p>
    <b>Technologies Used (MERN):</b>
    <ul>
      <li>Frontend: React dashboard</li>
      <li>Backend: Node.js + Express.js (REST/WebSocket ingestion)</li>
      <li>Database: MongoDB (time-series storage)</li>
    </ul>
    <p style='margin-top:1rem;'><b>For more details, visit my GitHub profile.</b></p>`
  }
];

const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-detail-modal');
const modalContent = document.getElementById('project-detail-content');
const closeModalBtn = document.querySelector('.close-modal');

projectCards.forEach(card => {
  card.addEventListener('click', function(e) {
    // Only open modal if not clicking the button
    if (e.target.classList.contains('view-details') || card === e.target) {
      const idx = parseInt(card.getAttribute('data-project'), 10) - 1;
      if (projectDetails[idx]) {
        modalContent.innerHTML = `
          <h2>${projectDetails[idx].title}</h2>
          <p>${projectDetails[idx].desc}</p>
        `;
        modal.classList.remove('hidden');
      }
    }
  });
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}

// Close modal on outside click
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

// Typewriter effect for hero section (Home page)
window.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 60);
      }
    }
    typeWriter();
  }
});

// Landing animation overlay fade-out (Home page)
window.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('landing-overlay');
  if (overlay) {
    setTimeout(() => {
      overlay.classList.add('fade-out');
      setTimeout(() => overlay.remove(), 900);
    }, 1500);
  }
});

// Modern Scroll-to-top button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '↑';
scrollBtn.className = 'scroll-to-top';
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Modern Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      
      // Animate child elements with stagger
      const animatedElements = entry.target.querySelectorAll('.project-card, .skill-category, .timeline-item, .internship-card, .contact-item');
      animatedElements.forEach((element, index) => {
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
});

// Placeholder: Add more JS for project routing, skill animations, etc. 

// Modern Resume Viewer
window.addEventListener('DOMContentLoaded', () => {
  const viewBtn = document.getElementById('view-resume-btn');
  const viewer = document.getElementById('resume-viewer');
  const closeBtn = document.getElementById('close-resume-btn');
  
  if (viewBtn && viewer) {
    viewBtn.addEventListener('click', () => {
      viewer.style.display = 'flex';
      setTimeout(() => {
        viewer.classList.add('show');
      }, 10);
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (closeBtn && viewer) {
    closeBtn.addEventListener('click', () => {
      viewer.classList.remove('show');
      setTimeout(() => {
        viewer.style.display = 'none';
      }, 300);
      document.body.style.overflow = '';
    });
  }
  
  // Close viewer when clicking outside
  if (viewer) {
    viewer.addEventListener('click', (e) => {
      if (e.target === viewer) {
        viewer.classList.remove('show');
        setTimeout(() => {
          viewer.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
      }
    });
  }
  
  // Close viewer with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && viewer && viewer.classList.contains('show')) {
      viewer.classList.remove('show');
      setTimeout(() => {
        viewer.style.display = 'none';
      }, 300);
      document.body.style.overflow = '';
    }
  });
}); 

// Professional Contact Form Submission
(() => {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data - handle both old and new form structures
    const formData = new FormData(this);
    const firstName = formData.get('firstName') || formData.get('name');
    const lastName = formData.get('lastName') || '';
    const name = lastName ? `${firstName} ${lastName}`.trim() : firstName;
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    const linkedin = formData.get('linkedin'); // Optional field
    
    // Professional validation - only check required fields
    if (!firstName || !email || !message) {
      showNotification('Please fill in all required fields (First Name, Email, and Message).', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Create professional mailto link with form data
    const emailSubject = subject ? `Portfolio Contact: ${subject}` : 'Portfolio Contact';
    const emailBody = `Hello SRIMAAN,

I am contacting you through your portfolio website.

Name: ${name}
Email: ${email}
Subject: ${subject || 'General Inquiry'}
${linkedin ? `LinkedIn: ${linkedin}` : ''}

Message:
${message}

---
This message was sent from your portfolio contact form.
Best regards,
${name}`;
    
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=srimaan262004@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning">
        <path d="M21 12a9 9 0 11-6.219-8.56"/>
      </svg>
      Sending...
    `;
    submitBtn.disabled = true;
    
    // Send data to backend
    sendFormData({
      firstName: firstName,
      lastName: lastName,
      email: email,
      contactNumber: formData.get('contactNumber'),
      location: formData.get('location'),
      profession: formData.get('profession'),
      linkedin: linkedin,
      message: message
    }).then(() => {
      // Show success message with full name
      showSuccessMessage(name);
      
      // Reset form
      this.reset();
      
      // Reset button
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }).catch((error) => {
      console.error('Error sending form:', error);
      showNotification('Failed to send message. Please try again.', 'error');
      
      // Reset button
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    });
  });
  
  // Function to send form data to Vercel Functions
  async function sendFormData(formData) {
    try {
      // Use Vercel Functions URL
      const functionsUrl = window.location.hostname === 'localhost' 
        ? '/api/contact'
        : '/api/contact';
      
      const response = await fetch(functionsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending form data:', error);
      throw error;
    }
  }
  
  // Success message with user's name and tick mark
  function showSuccessMessage(userName) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'notification notification-success success-animation';
    
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon success-tick">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
        </div>
        <div class="notification-message">
          <h4>Thank you, ${userName}!</h4>
          <p>Your message has been sent successfully. I'll get back to you soon!</p>
        </div>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 8 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 8000);
  }
  
  // Professional notification system
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">
          ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
        </span>
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      max-width: 400px;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    });
  }
})();

// Fullscreen image modal for .study-img and .profile-img
function createImgModal() {
  let modal = document.querySelector('.img-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'img-modal';
    modal.innerHTML = `
      <button class="img-modal-close" title="Close">&times;</button>
      <img class="img-modal-content" src="" alt="Full Image">
    `;
    document.body.appendChild(modal);
  }
  return modal;
}
function showImgModal(src, alt) {
  const modal = createImgModal();
  const img = modal.querySelector('.img-modal-content');
  img.src = src;
  img.alt = alt || '';
  modal.classList.add('active');
}
function hideImgModal() {
  const modal = document.querySelector('.img-modal');
  if (modal) modal.classList.remove('active');
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.study-img, .profile-img').forEach(img => {
    img.addEventListener('click', () => showImgModal(img.src, img.alt));
  });
  document.body.addEventListener('click', (e) => {
    const modal = document.querySelector('.img-modal');
    if (!modal || !modal.classList.contains('active')) return;
    if (e.target.classList.contains('img-modal-close') || e.target === modal) {
      hideImgModal();
    }
  });
}); 

// --- Fast loading overlay: percent quickly counts to 100, then overlay hides automatically ---
window.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('loading-overlay');
  const percent = document.getElementById('loading-percent');
  if (!overlay || !percent) return;
  let current = 0;
  const duration = 700; // ms, much faster
  const steps = 40;
  const increment = 100 / steps;
  const interval = duration / steps;
  function animateLoading() {
    if (current < 100) {
      current += increment;
      if (current > 100) current = 100;
      percent.textContent = Math.round(current) + '%';
      setTimeout(animateLoading, interval);
    } else {
      percent.textContent = '100%';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 400);
    }
  }
  document.body.style.overflow = 'hidden';
  animateLoading();
  setTimeout(() => {
    document.body.style.overflow = '';
  }, duration + 400);
}); 

// Hamburger menu toggle for mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  // Close menu when a nav link is clicked (on mobile)
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 700) {
        nav.classList.remove('open');
      }
    });
  });
} 

// Modern Scrollspy
window.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  function onScrollSpy() {
    let currentSectionId = '';
    const scrollY = window.scrollY + 150; // Offset for sticky nav
    
    for (const section of sections) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.id;
        break;
      }
    }
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', onScrollSpy);
  onScrollSpy(); // Run once on load
}); 