document.addEventListener('DOMContentLoaded', function() {
  // Toggle switch functionality
  const toggleSwitches = document.querySelectorAll('.toggle-switch input');
  
  toggleSwitches.forEach(toggle => {
    toggle.addEventListener('change', function() {
      // Update aria-checked attribute
      this.setAttribute('aria-checked', this.checked);
      
      // Find the parent article element
      const extensionCard = this.closest('article');
      
      // If checkbox is checked, add active class, otherwise remove it
      if (this.checked) {
        extensionCard.classList.add('active');
        extensionCard.classList.remove('inactive');
      } else {
        extensionCard.classList.add('inactive');
        extensionCard.classList.remove('active');
      }
    });
    
    // Initialize classes based on checked state
    if (toggle.checked) {
      toggle.closest('article').classList.add('active');
      toggle.closest('article').classList.remove('inactive');
    } else {
      toggle.closest('article').classList.add('inactive');
      toggle.closest('article').classList.remove('active');
    }
  });
  
  // Remove button functionality
  const removeButtons = document.querySelectorAll('.remove');
  
  removeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const extensionCard = this.closest('article');
      
      // Add a fade-out animation
      extensionCard.style.transition = 'opacity 0.3s ease-out';
      extensionCard.style.opacity = '0';
      
      // Remove the element after animation completes
      setTimeout(() => {
        extensionCard.remove();
        updateExtensionCount();
      }, 300);
    });
  });
  
  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter');
  const allExtensions = document.querySelectorAll('article');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all filter buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');
      
      const filterType = this.textContent.trim().toLowerCase();
      
      // Show/hide extensions based on filter
      allExtensions.forEach(extension => {
        if (filterType === 'all') {
          extension.style.display = 'flex';
        } else if (filterType === 'active') {
          if (extension.classList.contains('active') || extension.querySelector('input').checked) {
            extension.style.display = 'flex';
          } else {
            extension.style.display = 'none';
          }
        } else if (filterType === 'inactive') {
          if (extension.classList.contains('inactive') || !extension.querySelector('input').checked) {
            extension.style.display = 'flex';
          } else {
            extension.style.display = 'none';
          }
        }
      });
    });
  });
  
  // Dark/Light mode toggle
  const modeToggle = document.getElementById('mode-toggle');
  const modeText = document.querySelector('.mode-text');
  const darkModeIcon = document.querySelector('.dark-mode');
  const lightModeIcon = document.querySelector('.light-mode');
  
  modeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    
    // Update mode text and icons
    if (document.body.classList.contains('light-mode')) {
      modeText.textContent = 'Light Mode';
      darkModeIcon.style.display = 'block';
      lightModeIcon.style.display = 'none';
      modeToggle.setAttribute('aria-pressed', 'true');
    } else {
      modeText.textContent = 'Dark Mode';
      darkModeIcon.style.display = 'none';
      lightModeIcon.style.display = 'block';
      modeToggle.setAttribute('aria-pressed', 'false');
    }
  });
  
  // Initialize extension counts and classes
  function updateExtensionCount() {
    const totalExtensions = document.querySelectorAll('article').length;
    const activeExtensions = document.querySelectorAll('article input[aria-checked="true"]').length;
    const inactiveExtensions = totalExtensions - activeExtensions;
    
    // You could update some counters here if needed
    console.log(`Total: ${totalExtensions}, Active: ${activeExtensions}, Inactive: ${inactiveExtensions}`);
  }
  
  // Initial count
  updateExtensionCount();
  
  // Initialize all extensions with proper active/inactive classes
  allExtensions.forEach(extension => {
    const checkbox = extension.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      extension.classList.add('active');
      extension.classList.remove('inactive');
    } else {
      extension.classList.add('inactive');
      extension.classList.remove('active');
    }
  });
});