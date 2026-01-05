/**
 * Helper Utilities
 * Common utility functions used across the app
 */

/**
 * Debounce function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function} Throttled function
 */
export function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale string
 * @returns {string} Formatted date
 */
export function formatDate(date, locale = 'ar-EG') {
    const d = new Date(date);
    return d.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Format time to readable string
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale string
 * @returns {string} Formatted time
 */
export function formatTime(date, locale = 'ar-EG') {
    const d = new Date(date);
    return d.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Format datetime to readable string
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale string
 * @returns {string} Formatted datetime
 */
export function formatDateTime(date, locale = 'ar-EG') {
    return `${formatDate(date, locale)} ${formatTime(date, locale)}`;
}

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date to compare
 * @param {string} lang - Language code
 * @returns {string} Relative time string
 */
export function getRelativeTime(date, lang = 'ar') {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (lang === 'ar') {
        if (seconds < 60) return 'الآن';
        if (minutes < 60) return `منذ ${minutes} دقيقة`;
        if (hours < 24) return `منذ ${hours} ساعة`;
        if (days < 30) return `منذ ${days} يوم`;
        if (months < 12) return `منذ ${months} شهر`;
        return `منذ ${years} سنة`;
    } else {
        if (seconds < 60) return 'just now';
        if (minutes < 60) return `${minutes} min ago`;
        if (hours < 24) return `${hours} hours ago`;
        if (days < 30) return `${days} days ago`;
        if (months < 12) return `${months} months ago`;
        return `${years} years ago`;
    }
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @param {string} suffix - Suffix to add
 * @returns {string} Truncated text
 */
export function truncate(text, length = 100, suffix = '...') {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + suffix;
}

/**
 * Capitalize first letter
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export function capitalize(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Convert string to slug
 * @param {string} text - Text to convert
 * @returns {string} Slug
 */
export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

/**
 * Generate random string
 * @param {number} length - Length of string
 * @returns {string} Random string
 */
export function randomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }
}

/**
 * Download text as file
 * @param {string} text - Text content
 * @param {string} filename - File name
 * @param {string} type - MIME type
 */
export function downloadFile(text, filename = 'download.txt', type = 'text/plain') {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if in viewport
 */
export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Scroll to element smoothly
 * @param {string|HTMLElement} target - Target element or selector
 * @param {number} offset - Offset from top
 */
export function scrollTo(target, offset = 80) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const top = element.offsetTop - offset;
    window.scrollTo({
        top,
        behavior: 'smooth'
    });
}

/**
 * Get query parameter from URL
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value
 */
export function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Set query parameter in URL
 * @param {string} param - Parameter name
 * @param {string} value - Parameter value
 */
export function setQueryParam(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
}

/**
 * Remove query parameter from URL
 * @param {string} param - Parameter name
 */
export function removeQueryParam(param) {
    const url = new URL(window.location);
    url.searchParams.delete(param);
    window.history.pushState({}, '', url);
}

/**
 * Parse JSON safely
 * @param {string} json - JSON string
 * @param {any} defaultValue - Default value on error
 * @returns {any} Parsed object or default
 */
export function parseJSON(json, defaultValue = null) {
    try {
        return JSON.parse(json);
    } catch (error) {
        console.error('JSON parse error:', error);
        return defaultValue;
    }
}

/**
 * Check if device is mobile
 * @returns {boolean} True if mobile
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Check if device is iOS
 * @returns {boolean} True if iOS
 */
export function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

/**
 * Check if device is Android
 * @returns {boolean} True if Android
 */
export function isAndroid() {
    return /Android/.test(navigator.userAgent);
}

/**
 * Get current page name
 * @returns {string} Page name
 */
export function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0] || 'index';
    return page;
}

/**
 * Wait for specified time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry function on failure
 * @param {Function} fn - Function to retry
 * @param {number} retries - Number of retries
 * @param {number} delay - Delay between retries
 * @returns {Promise<any>} Function result
 */
export async function retry(fn, retries = 3, delay = 1000) {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0) throw error;
        await sleep(delay);
        return retry(fn, retries - 1, delay);
    }
}

// Export all as default object
export default {
    debounce,
    throttle,
    formatDate,
    formatTime,
    formatDateTime,
    getRelativeTime,
    truncate,
    capitalize,
    slugify,
    randomString,
    generateId,
    copyToClipboard,
    downloadFile,
    isInViewport,
    scrollTo,
    getQueryParam,
    setQueryParam,
    removeQueryParam,
    parseJSON,
    isMobile,
    isIOS,
    isAndroid,
    getCurrentPage,
    sleep,
    retry
};