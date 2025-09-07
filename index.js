// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1500);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';

  setTimeout(() => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  }, 100);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Menu
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animate counters for stats
      if (entry.target.classList.contains('stat-card')) {
        const counter = entry.target.querySelector('.stat-number');
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
      }
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.stat-card, .feature-card, .menu-item').forEach(el => {
  observer.observe(el);
});

// Counter Animation
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();

    // Add % or + for specific counters
    if (target === 98) {
      element.textContent = Math.floor(current) + '%';
    } else if (target === 500000) {
      element.textContent = Math.floor(current).toLocaleString() + '+';
    }
  }, 20);
}

// Menu Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const menuContents = document.querySelectorAll('.menu-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabName = button.getAttribute('data-tab');

    // Remove active class from all
    tabButtons.forEach(btn => btn.classList.remove('active'));
    menuContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked
    button.classList.add('active');
    document.getElementById(tabName).classList.add('active');
  });
});

// Parallax Effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.floating-food');

  parallaxElements.forEach((el, index) => {
    const speed = 0.5 + (index * 0.1);
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Form Submit Handler
function handleSubmit(event) {
  event.preventDefault();

  // Animate button
  const button = event.target.querySelector('.submit-button');
  button.textContent = 'Отправлено! ✓';
  button.style.background = 'var(--secondary)';

  // Reset form
  setTimeout(() => {
    event.target.reset();
    button.textContent = 'Отправить сообщение';
    button.style.background = 'var(--primary)';
  }, 3000);
}

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .feature-card, .menu-item, .stat-card');

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
  });

  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// Hide cursor on mobile
if (window.innerWidth <= 768) {
  cursor.style.display = 'none';
  cursorFollower.style.display = 'none';
}

document.querySelectorAll('.single-column').forEach(column => {
  column.style.setProperty('--animation', 'slide');
  column.style.setProperty('height', '200%');
  column.innerHTML = column.innerHTML + column.innerHTML;
});

let currentIndex = 0;

function moveSlide(direction) {
  const slides = document.querySelectorAll('.slide');
  currentIndex = (currentIndex + direction + slides.length) % slides.length;

  const slidesContainer = document.querySelector('.slides');
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentIndex);
  });
}



