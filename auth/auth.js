/**
 * Authentication Module
 * Centralized authentication management
 */

import { getFirebaseAuth, isFirebaseReady } from '../config/firebase.js';
import { showNotification } from '../ui/notifications.js';
import { t } from '../ui/language.js';

let onAuthStateChanged = null;
let signOut = null;

// Current user state
let currentUser = null;

/**
 * Initialize authentication system
 * @returns {Promise<boolean>}
 */
export async function initAuth() {
    // Load authentication state from localStorage
    loadUserFromStorage();

    // Try to initialize Firebase Auth
    if (isFirebaseReady()) {
        try {
            const authModule = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js');
            onAuthStateChanged = authModule.onAuthStateChanged;
            signOut = authModule.signOut;

            // Listen to auth state changes
            const auth = getFirebaseAuth();
            if (auth && onAuthStateChanged) {
                onAuthStateChanged(auth, (firebaseUser) => {
                    if (firebaseUser) {
                        // User is signed in
                        updateCurrentUser({
                            uid: firebaseUser.uid,
                            name: firebaseUser.displayName || 'User',
                            email: firebaseUser.email,
                            photo: firebaseUser.photoURL || 'assets/images/default_avatar.png',
                            emailVerified: firebaseUser.emailVerified
                        });
                    } else {
                        // Check localStorage for demo user
                        if (!currentUser) {
                            loadUserFromStorage();
                        }
                    }
                });
            }

            console.log('✅ Auth system initialized (Firebase mode)');
            return true;

        } catch (error) {
            console.log('⚠️ Firebase Auth not available, using localStorage mode');
        }
    }

    console.log('✅ Auth system initialized (localStorage mode)');
    return true;
}

/**
 * Save user data
 * @param {Object} userData - User data object
 */
export function saveUserData(userData) {
    // Add timestamp
    userData.loginTime = new Date().toISOString();

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userData', JSON.stringify(userData));

    // Update current user
    currentUser = userData;

    // Dispatch event
    window.dispatchEvent(new CustomEvent('userChanged', { detail: { user: userData } }));
}

/**
 * Load user from localStorage
 */
function loadUserFromStorage() {
    const storedUser = localStorage.getItem('userData') || localStorage.getItem('user');
    if (storedUser) {
        try {
            currentUser = JSON.parse(storedUser);
        } catch (error) {
            console.error('Error parsing stored user data:', error);
            currentUser = null;
        }
    }
}

/**
 * Get current user
 * @returns {Object|null} User data or null
 */
export function getCurrentUser() {
    return currentUser;
}

/**
 * Update current user
 * @param {Object} userData - Updated user data
 */
function updateCurrentUser(userData) {
    currentUser = userData;
    saveUserData(userData);
}

/**
 * Check if user is logged in
 * @returns {boolean}
 */
export function isLoggedIn() {
    return currentUser !== null;
}

/**
 * Logout user
 * @returns {Promise<boolean>}
 */
export async function logout() {
    try {
        // Firebase logout if available
        if (isFirebaseReady() && signOut) {
            const auth = getFirebaseAuth();
            if (auth) {
                await signOut(auth);
            }
        }

        // Clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('userData');
        localStorage.removeItem('rememberMe');

        // Clear current user
        currentUser = null;

        // Dispatch event
        window.dispatchEvent(new CustomEvent('userLoggedOut'));

        console.log('✅ User logged out successfully');
        return true;

    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}

/**
 * Update user profile UI
 */
export function updateUserUI() {
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userAvatar = document.getElementById('userAvatar');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');

    if (currentUser) {
        // User is logged in
        if (userName) userName.textContent = currentUser.name || 'User';
        if (userEmail) userEmail.textContent = currentUser.email || '';

        // Update avatar
        if (userAvatar) {
            const avatarImg = userAvatar.querySelector('img');
            if (avatarImg && currentUser.photo) {
                avatarImg.src = currentUser.photo;
            }
        }

        // Show logout button, hide login button
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (loginBtn) loginBtn.style.display = 'none';

    } else {
        // User is not logged in
        if (userName) userName.textContent = t('profile.guest');
        if (userEmail) userEmail.textContent = 'guest@example.com';

        // Show login button, hide logout button
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (loginBtn) loginBtn.style.display = 'block';
    }
}

/**
 * Setup logout button
 */
export function setupLogoutButton() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', async () => {
        const confirmed = confirm(t('msg.logout.confirm'));
        if (!confirmed) return;

        try {
            await logout();

            // Update UI
            updateUserUI();

            // Close sidebar if open
            const sidebar = document.getElementById('userSidebar');
            const overlay = document.getElementById('overlay');
            if (sidebar) sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');

            // Show notification
            showNotification(t('msg.logout.success'), 'success');

        } catch (error) {
            showNotification('حدث خطأ أثناء تسجيل الخروج', 'error');
        }
    });
}

/**
 * Setup login button
 */
export function setupLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    loginBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}

/**
 * Require authentication (redirect to login if not logged in)
 * @param {string} redirectUrl - URL to redirect after login
 */
export function requireAuth(redirectUrl = null) {
    if (!isLoggedIn()) {
        if (redirectUrl) {
            sessionStorage.setItem('redirectAfterLogin', redirectUrl);
        }
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

/**
 * Check for redirect after login
 */
export function checkRedirectAfterLogin() {
    const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
    if (redirectUrl && isLoggedIn()) {
        sessionStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectUrl;
    }
}

/**
 * Get user display name
 * @returns {string}
 */
export function getUserDisplayName() {
    return currentUser?.name || t('profile.guest');
}

/**
 * Get user email
 * @returns {string}
 */
export function getUserEmail() {
    return currentUser?.email || 'guest@example.com';
}

/**
 * Get user avatar URL
 * @returns {string}
 */
export function getUserAvatar() {
    return currentUser?.photo || 'assets/images/default_avatar.png';
}

// Export for external use
export default {
    init: initAuth,
    saveUser: saveUserData,
    getCurrentUser,
    isLoggedIn,
    logout,
    updateUI: updateUserUI,
    setupLogout: setupLogoutButton,
    setupLogin: setupLoginButton,
    requireAuth,
    checkRedirect: checkRedirectAfterLogin,
    getDisplayName: getUserDisplayName,
    getEmail: getUserEmail,
    getAvatar: getUserAvatar
};