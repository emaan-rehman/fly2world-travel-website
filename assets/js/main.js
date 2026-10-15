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

// Cloudflare Worker API Endpoint
const API_URL = 'https://fly2world-comments-api.fly2worldtravels.workers.dev/api/comments';

document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.getElementById('commentForm');
  const commentsList = document.getElementById('commentsList');
  const statusMsg = document.getElementById('commentStatusMessage');
  // Interactive Star Rating Handler
const starContainer = document.getElementById('starRating');
const ratingInput = document.getElementById('commentRating');

if (starContainer && ratingInput) {
  const stars = starContainer.querySelectorAll('.star');

  const updateStars = (ratingValue) => {
    stars.forEach(star => {
      const val = parseInt(star.getAttribute('data-value'));
      if (val <= ratingValue) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  };

  stars.forEach(star => {
    // Hover effect
    star.addEventListener('mouseenter', () => {
      const hoverVal = parseInt(star.getAttribute('data-value'));
      stars.forEach(s => {
        const val = parseInt(s.getAttribute('data-value'));
        if (val <= hoverVal) {
          s.classList.add('hover');
        } else {
          s.classList.remove('hover');
        }
      });
    });

    // Remove hover effect on leave
    star.addEventListener('mouseleave', () => {
      stars.forEach(s => s.classList.remove('hover'));
    });

    // Click to select rating
    star.addEventListener('click', () => {
      const selectedVal = star.getAttribute('data-value');
      ratingInput.value = selectedVal;
      updateStars(parseInt(selectedVal));
    });
  });

  // Ensure default rating (5) is highlighted initially
  updateStars(parseInt(ratingInput.value));
}

  if (commentsList) {
    fetchComments();
  }

  if (commentForm) {
    commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('commentName').value.trim();
      const rating = document.getElementById('commentRating').value;
      const message = document.getElementById('commentMessage').value.trim();
      const submitBtn = document.getElementById('submitCommentBtn');

      if (!name || !message) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      statusMsg.className = 'status-msg';
      statusMsg.textContent = '';

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, rating, message })
        });

        const data = await res.json();

        if (res.ok) {
          statusMsg.className = 'status-msg success';
          statusMsg.textContent = 'Thank you! Your comment has been posted.';
          commentForm.reset();
          fetchComments();
        } else {
          throw new Error(data.error || 'Failed to submit comment');
        }
      } catch (err) {
        statusMsg.className = 'status-msg error';
        statusMsg.textContent = err.message || 'Error submitting comment. Please try again.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit Comment <i class="fa-solid fa-paper-plane"></i>';
      }
    });
  }

  async function fetchComments() {
    try {
      const res = await fetch(API_URL);
      const comments = await res.json();

      if (!Array.isArray(comments) || comments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to leave a review!</p>';
        return;
      }

      commentsList.innerHTML = comments.map(c => `
        <div class="comment-item">
          <div class="comment-header">
            <span class="comment-author"><i class="fa-solid fa-circle-user"></i> ${escapeHtml(c.name)}</span>
            <span class="comment-rating">${'★'.repeat(c.rating)}${'☆'.repeat(5 - c.rating)}</span>
          </div>
          <p class="comment-text">${escapeHtml(c.message)}</p>
        </div>
      `).join('');
    } catch (err) {
      commentsList.innerHTML = '<p class="no-comments">Unable to load comments at this time.</p>';
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
});