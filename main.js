const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const header = document.getElementById('header');
const introSection = document.getElementById('intro');
let introDismissed = false;

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

// Mobile menu toggle
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    header.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (header.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
      document.body.style.overflow = 'hidden';
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
      document.body.style.overflow = '';
    }
  });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
    
    // Close mobile menu
    if (header.classList.contains('active')) {
      header.classList.remove('active');
      const icon = mobileMenuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
      document.body.style.overflow = '';
    }
  });
});

// Throttle function for better performance
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.addEventListener('scroll', throttle(() => {
  // Hide intro section after user starts scrolling
  if (introSection && !introDismissed && window.scrollY > 40) {
    introSection.classList.add('intro-hidden');
    introDismissed = true;
  }

  // Add scrolled class to header for styling
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  if(window.scrollY > 500){
    backToTop.style.display = "flex";
    backToTop.style.opacity = "1";
  } else {
    backToTop.style.opacity = "0";
    setTimeout(() => {
      if (window.scrollY <= 500) {
        backToTop.style.display = "none";
      }
    }, 300);
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
}, 100));

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(71, 74, 240, 0.3);
  opacity: 0;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => {
  backToTop.style.transform = 'scale(1.15) translateY(-3px)';
  backToTop.style.boxShadow = '0 6px 20px rgba(71, 74, 240, 0.4)';
});
backToTop.addEventListener('mouseout', () => {
  backToTop.style.transform = 'scale(1) translateY(0)';
  backToTop.style.boxShadow = '0 4px 12px rgba(71, 74, 240, 0.3)';
});

// Enhanced card animations are now handled by CSS
// This ensures smoother performance with hardware acceleration

const typingElement = document.querySelector('.info-home h3'); 
const words = ["Full-Stack Developer", "Mobile Developer", "Backend Engineer", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    if (!typingElement) return;
    
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    typingElement.innerHTML = displayedText + '<span class="cursor" style="animation: blink 1s infinite;">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, isDeleting ? 500 : 1000);
    }
}

// Add cursor blink animation
const style = document.createElement('style');
style.textContent = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1000); // Delay typing animation
});

document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const loadingBarContainer = document.querySelector(".loading-bar-container");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay=0){
    if (!element) return;
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);
  showElement(loadingBarContainer, 400);
  showElement(mainIcon, 900);
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1700 + idx*350);
  });
  showElement(designerText, 2700);

  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.visibility = 'hidden';
      setTimeout(() => {
        if (loadingScreen) {
          loadingScreen.style.display = 'none';
        }
      }, 500);
    }
  }, 4000);
  
  // Initialize reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active-reveal');
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => observer.observe(el));
});

