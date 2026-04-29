// ─── Smooth scroll ───────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('active');
    }
  });
});

// ─── Navbar scroll effect ─────────────────────────────────────────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── Menú hamburguesa ─────────────────────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// ─── Animación de skill bars ──────────────────────────────────────────────────
function animateSkillBars() {
  const windowHeight = window.innerHeight;

  document.querySelectorAll('.skill-progress:not(.animated)').forEach((bar, index) => {
    const { top } = bar.getBoundingClientRect();

    if (top < windowHeight - 100) {
      const targetWidth = bar.getAttribute('data-width') || 70;

      setTimeout(() => {
        bar.style.width = targetWidth + '%';
        bar.classList.add('animated');
      }, index * 100);
    }
  });
}

// ─── Animación de secciones al hacer scroll ───────────────────────────────────
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      sectionObserver.unobserve(entry.target); // Solo animar una vez
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-section');
  sectionObserver.observe(section);
});

// ─── Efecto typing en el subtítulo ───────────────────────────────────────────
function startTypingEffect() {
  const subtitleEl = document.querySelector('.subtitle');
  if (!subtitleEl) return;

  const originalText = subtitleEl.textContent;
  subtitleEl.textContent = '';
  subtitleEl.style.opacity = '1';

  let i = 0;
  const typing = setInterval(() => {
    if (i < originalText.length) {
      subtitleEl.textContent += originalText.charAt(i++);
    } else {
      clearInterval(typing);
    }
  }, 50);
}

// ─── Año automático en el footer ─────────────────────────────────────────────
const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

// ─── Formulario de contacto ───────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalHTML = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    // Sustituir por llamada real a tu API cuando esté disponible
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje enviado!';
      contactForm.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
      }, 3000);
    }, 2000);
  });
}

// ─── Inicialización ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Skill bars: primer intento tras carga
  setTimeout(animateSkillBars, 400);

  // Typing effect con pequeño delay para que no solape la animación del hero
  setTimeout(startTypingEffect, 1000);
});

// Skill bars: disparar también al hacer scroll
window.addEventListener('scroll', animateSkillBars, { passive: true });