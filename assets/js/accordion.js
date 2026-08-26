document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isOpen = item.classList.contains('active');

    // Close all open items
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

    // Toggle current selection
    if (!isOpen) {
      item.classList.add('active');
    }
  });
});