document.addEventListener('DOMContentLoaded', () => {
  // Dark/Light Mode Toggle Functionality
  const modeToggle = document.querySelector('.mode-toggle');
  const modeText = document.querySelector('.mode-text');
  const darkModeIcon = document.querySelector('.dark-mode');
  const lightModeIcon = document.querySelector('.light-mode');
  let isDarkMode = true;

  modeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.className = isDarkMode ? '' : 'light-mode';
    modeText.textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
    darkModeIcon.style.display = isDarkMode ? 'inline' : 'none';
    lightModeIcon.style.display = isDarkMode ? 'none' : 'inline';
  });

  // Toggle Switch Functionality
  const toggleSwitches = document.querySelectorAll('.toggle-switch input');
  toggleSwitches.forEach(switchInput => {
    switchInput.addEventListener('change', () => {
      const isChecked = switchInput.checked;
      switchInput.setAttribute('aria-checked', isChecked);
    });
  });

  // Filter Button Functionality
  const filterButtons = document.querySelectorAll('.filter');
  const extensionCards = document.querySelectorAll('.DevLens, .JSONWizard, .Markup-Notes, .LinkChecker, .StyleSpy, .TabMaster-Pro, .DOM-Snapshot, .Grid-Guides, .SpeedBoost, .ViewportBuddy, .Palette-Picker, .ConsolePlus');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all filter buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.textContent.toLowerCase();

      extensionCards.forEach(card => {
        const toggleSwitch = card.querySelector('.toggle-switch input');
        const isActive = toggleSwitch.checked;

        if (filter === 'all') {
          card.style.display = 'flex';
        } else if (filter === 'active') {
          card.style.display = isActive ? 'flex' : 'none';
        } else if (filter === 'inactive') {
          card.style.display = !isActive ? 'flex' : 'none';
        }
      });
    });
  });

  // Initialize filter state (default to "All")
  filterButtons[0].click();

  // Ensure images are visible by forcing display
  const extensionIcons = document.querySelectorAll('.extension-icon');
  extensionIcons.forEach(icon => {
    icon.style.display = 'block';
  });
});