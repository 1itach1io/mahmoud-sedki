/**
 * Loading Screen Manager
 * Enhanced loading with school logo
 */

let loadingElement = null;
let isLoading = false;

/**
 * Create loading screen HTML
 * @returns {HTMLElement}
 */
function createLoadingScreen() {
    const loading = document.createElement('div');
    loading.id = 'loadingScreen';
    loading.className = 'loading-screen';

    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">
                <img src="assets/images/school_logo.png" 
                     alt="School Logo" 
                     class="logo-image"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="logo-fallback" style="display: none;">🎓</div>
            </div>
            <div class="loading-spinner">
                <div class="spinner"></div>
            </div>
            <p class="loading-text" data-i18n="msg.loading">جاري التحميل...</p>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;

    return loading;
}

/**
 * Show loading screen
 * @param {string} message - Optional loading message
 */
export function showLoading(message = null) {
    if (isLoading) return;

    // Create loading screen if doesn't exist
    if (!loadingElement) {
        loadingElement = createLoadingScreen();
        document.body.appendChild(loadingElement);
    }

    // Update message if provided
    if (message) {
        const textElement = loadingElement.querySelector('.loading-text');
        if (textElement) {
            textElement.textContent = message;
        }
    }

    // Show loading
    loadingElement.style.display = 'flex';
    isLoading = true;

    // Start progress animation
    animateProgress();
}

/**
 * Hide loading screen
 * @param {number} delay - Delay before hiding (ms)
 */
export function hideLoading(delay = 500) {
    if (!isLoading || !loadingElement) return;

    setTimeout(() => {
        loadingElement.classList.add('hidden');
        isLoading = false;

        // Remove from DOM after animation
        setTimeout(() => {
            if (loadingElement) {
                loadingElement.style.display = 'none';
                loadingElement.classList.remove('hidden');
            }
        }, 500);
    }, delay);
}

/**
 * Animate progress bar
 */
function animateProgress() {
    const progressBar = loadingElement?.querySelector('.loading-progress');
    if (!progressBar) return;

    let progress = 0;
    const interval = setInterval(() => {
        if (!isLoading) {
            clearInterval(interval);
            return;
        }

        progress += Math.random() * 15;
        if (progress > 90) {
            progress = 90; // Stop at 90% until actually loaded
        }

        progressBar.style.width = `${progress}%`;
    }, 200);
}

/**
 * Initialize loading screen on page load
 */
export function initLoadingScreen() {
    // Show loading immediately
    showLoading();

    // Hide when page is fully loaded
    window.addEventListener('load', () => {
        // Complete the progress bar
        const progressBar = document.querySelector('.loading-progress');
        if (progressBar) {
            progressBar.style.width = '100%';
        }

        // Hide loading after a short delay
        setTimeout(() => {
            hideLoading(300);
        }, 500);
    });

    // Fallback: hide after max 5 seconds
    setTimeout(() => {
        if (isLoading) {
            hideLoading(0);
        }
    }, 5000);
}

/**
 * Update loading message
 * @param {string} message - New message
 */
export function updateLoadingMessage(message) {
    if (!loadingElement) return;

    const textElement = loadingElement.querySelector('.loading-text');
    if (textElement) {
        textElement.textContent = message;
    }
}

/**
 * Check if loading is active
 * @returns {boolean}
 */
export function isLoadingActive() {
    return isLoading;
}

// Export default object
export default {
    show: showLoading,
    hide: hideLoading,
    init: initLoadingScreen,
    updateMessage: updateLoadingMessage,
    isActive: isLoadingActive
};