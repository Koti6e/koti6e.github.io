// Fade-in sections with IntersectionObserver
const fadeSections = document.querySelectorAll('.fade-in-section');
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

fadeSections.forEach((section) => revealObserver.observe(section));

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.getElementById('primary-nav');

if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('open');
  });
}

// Sticky nav active link highlighting on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const sectionId = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        const target = link.getAttribute('href')?.replace('#', '');
        link.classList.toggle('active', target === sectionId);
      });
    });
  },
  {
    rootMargin: '-35% 0px -50% 0px',
    threshold: 0.01,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// Close mobile menu after selecting a section
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 860px)').matches && primaryNav && menuToggle) {
      primaryNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Footer dynamic year
const yearNode = document.getElementById('currentYear');
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
