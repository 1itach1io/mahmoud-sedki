/**
 * Theme Management System
 * Dark/Light mode with auto-detection
 */

// Theme state
let currentTheme = 'light';

/**
 * Detect system theme preference
 * @returns {string} 'dark' or 'light'
 */
export function detectSystemTheme() {
    // Check saved preference first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }

    // Check system preference
    if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
    }

    return 'light'; // Default
}

/**
 * Initialize theme system
 */
export function initTheme() {
    currentTheme = detectSystemTheme();
    applyTheme(currentTheme, false);

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            const newTheme = e.matches ? 'dark' : 'light';
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme-manual')) {
                applyTheme(newTheme, false);
            }
        });
    }

    console.log(`🎨 Theme initialized: ${currentTheme}`);
}

/**
 * Apply theme to the page
 * @param {string} theme - 'dark' or 'light'
 * @param {boolean} animate - Whether to animate the transition
 */
export function applyTheme(theme, animate = true) {
    currentTheme = theme;

    // Add transition class for smooth animation
    if (animate) {
        document.body.classList.add('theme-transitioning');
    }

    // Apply theme
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Update theme toggle icons
    updateThemeToggleUI();

    // Save preference
    localStorage.setItem('theme', theme);

    // Remove transition class after animation
    if (animate) {
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    }

    // Dispatch event for other modules
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
}

/**
 * Toggle between dark and light theme
 */
export function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme, true);
    // Mark as manually set
    localStorage.setItem('theme-manual', 'true');
}

/**
 * Get current theme
 * @returns {string} Current theme ('dark' or 'light')
 */
export function getCurrentTheme() {
    return currentTheme;
}

/**
 * Update theme toggle button UI
 */
function updateThemeToggleUI() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    if (currentTheme === 'dark') {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    } else {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
    }
}

/**
 * Setup theme toggle button
 */
export function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', toggleTheme);
    updateThemeToggleUI();
}

/**
 * Check if dark mode is active
 * @returns {boolean}
 */
export function isDarkMode() {
    return currentTheme === 'dark';
}

/**
 * Set specific theme
 * @param {string} theme - 'dark' or 'light'
 */
export function setTheme(theme) {
    if (theme !== 'dark' && theme !== 'light') {
        console.warn(`Invalid theme: ${theme}`);
        return;
    }
    applyTheme(theme, true);
}

// Export for external use
export default {
    init: initTheme,
    toggle: toggleTheme,
    set: setTheme,
    get: getCurrentTheme,
    isDark: isDarkMode
};