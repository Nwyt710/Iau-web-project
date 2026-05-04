/* ========================================
   Healthy Leaf — Shared Scripts
   ======================================== */

// --- Mobile Navigation Toggle ---
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const icon = toggle.querySelector('i');
    if (mobileMenu.classList.contains('open')) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle.querySelector('i').className = 'fas fa-bars';
    });
  });
}

// --- Scroll Fade-In Animation ---
function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// --- Toast Notification System ---
function showToast(message, icon = 'fa-check-circle') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3200);
}

// --- Settings Modal ---
function initSettingsModal() {
  const overlay = document.getElementById('settingsModal');
  if (!overlay) return;

  const openBtns = document.querySelectorAll('.nav-settings, .open-settings');
  const closeBtn = overlay.querySelector('.modal-close');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => overlay.classList.add('open'));
  });

  closeBtn.addEventListener('click', () => overlay.classList.remove('open'));

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });

  // Toggle switches
  overlay.querySelectorAll('.toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
    });
  });
}

// --- Navbar scroll effect ---
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    }
  });
}

// --- Init all on DOM ready ---
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFadeIn();
  initSettingsModal();
  initNavbarScroll();
});