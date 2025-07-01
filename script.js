// Light/Dark mode toggle
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

modeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  modeToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// Persist dark mode
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  modeToggle.textContent = '☀️';
}

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Animated typing effect for tagline
const taglineTexts = [
  'Tech-Savvy Web Developer & Creative Designer',
  'WordPress, UI, Canva & Excel Automation',
  'Clean, Fast, Reliable Freelance Services',
  'No Calls, Just Results.'
];
let taglineIndex = 0, charIndex = 0, isDeleting = false;
const typedText = document.getElementById('typed-text');
function typeTagline() {
  const current = taglineTexts[taglineIndex];
  if (isDeleting) {
    charIndex--;
    if (charIndex < 0) {
      isDeleting = false;
      taglineIndex = (taglineIndex + 1) % taglineTexts.length;
      setTimeout(typeTagline, 600);
      return;
    }
  } else {
    charIndex++;
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeTagline, 1200);
      return;
    }
  }
  typedText.textContent = current.substring(0, charIndex);
  setTimeout(typeTagline, isDeleting ? 40 : 80);
}
typeTagline();

// Active link highlight on scroll
const sections = document.querySelectorAll('main section');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Contact form validation and feedback
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();
  if (!name || !email || !message) {
    formMessage.textContent = 'Please fill in all fields.';
    formMessage.style.color = 'crimson';
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.style.color = 'crimson';
    return;
  }
  formMessage.textContent = 'Thank you! Your message is ready to send.';
  formMessage.style.color = '';
  contactForm.reset();
  setTimeout(() => { formMessage.textContent = ''; }, 4000);
});

// Skills Tabs Functionality
const tabButtons = document.querySelectorAll('.skills-tab');
const tabPanels = document.querySelectorAll('.skills-tab-panel');
tabButtons.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    tabPanels[idx].classList.add('active');
  });
}); 