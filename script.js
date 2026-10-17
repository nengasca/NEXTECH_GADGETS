const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '×' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '☰';
  });
});

const filterButtons = document.querySelectorAll('.filter-pill');
const productCards = document.querySelectorAll('.product-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    productCards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

let cartCount = 0;
const cartCountDisplay = document.querySelector('.cart-count');
const cartMessage = document.querySelector('.cart-message');
document.querySelectorAll('.add-btn').forEach(button => {
  button.addEventListener('click', () => {
    cartCount += 1;
    cartCountDisplay.textContent = cartCount;
    const name = button.closest('.product-card').querySelector('h3').textContent;
    cartMessage.textContent = `${name} added to your bag. Your bag has ${cartCount} item${cartCount === 1 ? '' : 's'}.`;
    button.textContent = '✓';
    window.setTimeout(() => { button.textContent = '+'; }, 800);
  });
});

document.querySelectorAll('.heart').forEach(button => {
  button.addEventListener('click', () => {
    const liked = button.classList.toggle('liked');
    button.textContent = liked ? '♥' : '♡';
    button.setAttribute('aria-pressed', String(liked));
  });
});

document.querySelector('#newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.querySelector('#email');
  document.querySelector('#newsletterMessage').textContent = `Thanks for joining, ${email.value}! This demo form does not send emails.`;
  email.value = '';
});


// READ CATEGORY FROM URL, e.g. shop.html?category=audio
const params = new URLSearchParams(window.location.search);
const requestedCategory = params.get("category");
if (requestedCategory && filterButtons.length) {
  const requestedButton = document.querySelector(
    `.filter-pill[data-filter="${requestedCategory}"]`
  );
  if (requestedButton) requestedButton.click();
}

// CONTACT FORM DEMO (no backend/email sending)
const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#contactFormMessage").textContent =
      "Thank you! This demo form is working, but it does not send messages.";
    contactForm.reset();
  });
}
