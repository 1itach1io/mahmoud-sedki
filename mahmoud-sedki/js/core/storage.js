/**
 * Storage Management Module
 * Handles localStorage with error handling and encryption support
 */

import { STORAGE_KEYS } from '../config/constants.js';

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @returns {boolean} Success status
 */
export function setItem(key, value) {
    try {
        const serialized = JSON.stringify(value);
        localStorage.setItem(key, serialized);
        return true;
    } catch (error) {
        console.error('Storage setItem error:', error);
        return false;
    }
}

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} Stored value or default
 */
export function getItem(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        if (item === null) return defaultValue;
        return JSON.parse(item);
    } catch (error) {
        console.error('Storage getItem error:', error);
        return defaultValue;
    }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export function removeItem(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Storage removeItem error:', error);
        return false;
    }
}

/**
 * Clear all items from localStorage
 * @returns {boolean} Success status
 */
export function clear() {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('Storage clear error:', error);
        return false;
    }
}

/**
 * Check if key exists in localStorage
 * @param {string} key - Storage key
 * @returns {boolean} True if exists
 */
export function hasItem(key) {
    return localStorage.getItem(key) !== null;
}

/**
 * Get all keys in localStorage
 * @returns {string[]} Array of keys
 */
export function getAllKeys() {
    return Object.keys(localStorage);
}

/**
 * Get storage size in bytes
 * @returns {number} Size in bytes
 */
export function getStorageSize() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length + key.length;
        }
    }
    return total;
}

/**
 * Get storage size in KB
 * @returns {number} Size in KB
 */
export function getStorageSizeKB() {
    return (getStorageSize() / 1024).toFixed(2);
}

/**
 * Export all storage data
 * @returns {Object} All storage data
 */
export function exportData() {
    const data = {};
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            try {
                data[key] = JSON.parse(localStorage[key]);
            } catch {
                data[key] = localStorage[key];
            }
        }
    }
    return data;
}

/**
 * Import storage data
 * @param {Object} data - Data to import
 * @returns {boolean} Success status
 */
export function importData(data) {
    try {
        for (let key in data) {
            setItem(key, data[key]);
        }
        return true;
    } catch (error) {
        console.error('Storage import error:', error);
        return false;
    }
}

// Specialized getters/setters for common data

/**
 * Get user data
 * @returns {Object|null} User data
 */
export function getUserData() {
    return getItem(STORAGE_KEYS.user) || getItem(STORAGE_KEYS.userLegacy);
}

/**
 * Set user data
 * @param {Object} userData - User data
 */
export function setUserData(userData) {
    setItem(STORAGE_KEYS.user, userData);
    setItem(STORAGE_KEYS.userLegacy, userData); // For backward compatibility
}

/**
 * Remove user data
 */
export function removeUserData() {
    removeItem(STORAGE_KEYS.user);
    removeItem(STORAGE_KEYS.userLegacy);
    removeItem(STORAGE_KEYS.rememberMe);
}

/**
 * Get theme preference
 * @returns {string} 'light' or 'dark'
 */
export function getTheme() {
    return getItem(STORAGE_KEYS.theme, 'light');
}

/**
 * Set theme preference
 * @param {string} theme - 'light' or 'dark'
 */
export function setTheme(theme) {
    setItem(STORAGE_KEYS.theme, theme);
}

/**
 * Get language preference
 * @returns {string} Language code
 */
export function getLanguage() {
    return getItem(STORAGE_KEYS.language, 'ar');
}

/**
 * Set language preference
 * @param {string} lang - Language code
 */
export function setLanguage(lang) {
    setItem(STORAGE_KEYS.language, lang);
}

/**
 * Check if user is remembered
 * @returns {boolean}
 */
export function isRemembered() {
    return getItem(STORAGE_KEYS.rememberMe) === 'true';
}

/**
 * Set remember me status
 * @param {boolean} remember
 */
export function setRememberMe(remember) {
    setItem(STORAGE_KEYS.rememberMe, remember ? 'true' : 'false');
}

/**
 * Get redirect URL after login
 * @returns {string|null}
 */
export function getRedirectUrl() {
    return sessionStorage.getItem(STORAGE_KEYS.redirectAfterLogin);
}

/**
 * Set redirect URL after login
 * @param {string} url
 */
export function setRedirectUrl(url) {
    sessionStorage.setItem(STORAGE_KEYS.redirectAfterLogin, url);
}

/**
 * Clear redirect URL
 */
export function clearRedirectUrl() {
    sessionStorage.removeItem(STORAGE_KEYS.redirectAfterLogin);
}

// Export for external use
export default {
    set: setItem,
    get: getItem,
    remove: removeItem,
    clear,
    has: hasItem,
    keys: getAllKeys,
    size: getStorageSize,
    sizeKB: getStorageSizeKB,
    export: exportData,
    import: importData,

    // Specialized methods
    getUserData,
    setUserData,
    removeUserData,
    getTheme,
    setTheme,
    getLanguage,
    setLanguage,
    isRemembered,
    setRememberMe,
    getRedirectUrl,
    setRedirectUrl,
    clearRedirectUrl
};