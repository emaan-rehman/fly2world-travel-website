document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  // 1. Sticky Navbar style update on scroll
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. Responsive Mobile Menu Toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // 3. Initialize Animate On Scroll (AOS)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
      once: true,     // Whether animation should happen only once while scrolling
      offset: 100     // Offset distance to trigger animations
    });
  }

  // 4. Auto-select Destination from URL Parameters & Toggle Custom Input
  const urlParams = new URLSearchParams(window.location.search);
  const selectedDestination = urlParams.get('destination');

  if (selectedDestination) {
    const destinationSelect = document.getElementById('destinationSelect') || document.querySelector('select[name="destination"]');
    
    if (destinationSelect) {
      // Decode URL parameter string
      const targetValue = decodeURIComponent(selectedDestination).trim();

      // Loop through select options to find a matching value or text
      for (let option of destinationSelect.options) {
        if (option.value.toLowerCase() === targetValue.toLowerCase() || 
            option.text.toLowerCase() === targetValue.toLowerCase()) {
          option.selected = true;
          
          // Trigger custom text box display if unlisted country option is selected
          if (typeof toggleCustomCountryInput === 'function') {
            toggleCustomCountryInput(destinationSelect);
          }
          break;
        }
      }
    }
  }
});