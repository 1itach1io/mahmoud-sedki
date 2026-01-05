/**
 * Main Application Module
 * Orchestrates all app components
 */

import { initializeFirebase } from '../config/firebase.js';
import { initAuth, updateUserUI, setupLogoutButton, setupLoginButton } from '../auth/auth.js';
import { initGoogleSignIn, setupGoogleSignInButton } from '../auth/google.js';
import { initTheme, setupThemeToggle } from '../ui/theme.js';
import { initLanguage, applyLanguage, switchLanguage } from '../ui/language.js';
import { initLoadingScreen } from '../ui/loading.js';
import { initNotifications } from '../ui/notifications.js';

// App state
let isInitialized = false;

/**
 * Initialize the application
 */
export async function initializeApp() {
    if (isInitialized) {
        console.warn('⚠️ App already initialized');
        return;
    }

    console.log('🚀 Initializing application...');

    try {
        // 1. Initialize loading screen
        initLoadingScreen();

        // 2. Initialize notifications
        initNotifications();

        // 3. Initialize theme (with auto-detection)
        initTheme();
        setupThemeToggle();

        // 4. Initialize language (with auto-detection)
        initLanguage();
        setupLanguageSelector();

        // 5. Initialize Firebase (optional)
        await initializeFirebase();

        // 6. Initialize authentication
        await initAuth();

        // 7. Initialize Google Sign-In
        await initGoogleSignIn();

        // 8. Setup UI components
        setupUI();

        // 9. Setup page-specific features
        setupPageFeatures();

        isInitialized = true;
        console.log('✅ Application initialized successfully!');

    } catch (error) {
        console.error('❌ Application initialization failed:', error);
    }
}

/**
 * Setup UI components
 */
function setupUI() {
    // Update user profile UI
    updateUserUI();

    // Setup logout button
    setupLogoutButton();

    // Setup login button
    setupLoginButton();

    // Setup user sidebar
    setupUserSidebar();

    // Setup smooth scrolling
    setupSmoothScroll();

    // Setup scroll animations
    setupScrollAnimations();
}

/**
 * Setup page-specific features
 */
function setupPageFeatures() {
    const currentPage = getCurrentPage();

    if (currentPage === 'login') {
        setupLoginPage();
    } else if (currentPage === 'index') {
        setupHomePage();
    }
}

/**
 * Get current page name
 * @returns {string}
 */
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0] || 'index';
    return page;
}

/**
 * Setup login page
 */
function setupLoginPage() {
    // Setup Google Sign-In button
    setupGoogleSignInButton('googleLoginBtn');

    // Setup email/password login
    setupEmailLogin();

    // Setup password toggle
    setupPasswordToggle();
}

/**
 * Setup home page
 */
function setupHomePage() {
    // Nothing specific for now
    console.log('📄 Home page setup complete');
}

/**
 * Setup email login form
 */
function setupEmailLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;

        // Demo login for now
        if (email === 'student@school.com' && password === '123456') {
            const { saveUserData } = await import('../auth/auth.js');
            const { showSuccess } = await import('../ui/notifications.js');

            saveUserData({
                uid: 'demo_' + Date.now(),
                name: 'أحمد محمد',
                email: email,
                photo: 'assets/images/default_avatar.png'
            });

            showSuccess('تم تسجيل الدخول بنجاح!');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            const { showError } = await import('../ui/notifications.js');
            showError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
    });
}

/**
 * Setup password toggle
 */
function setupPasswordToggle() {
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (!toggleBtn || !passwordInput) return;

    toggleBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        toggleBtn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });
}

/**
 * Setup user sidebar
 */
function setupUserSidebar() {
    const profileBtn = document.getElementById('userProfileBtn');
    const sidebar = document.getElementById('userSidebar');
    const overlay = document.getElementById('overlay');

    if (!profileBtn || !sidebar) return;

    // Open sidebar
    profileBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
    });

    // Close sidebar
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
}

/**
 * Setup smooth scrolling
 */
function setupSmoothScroll() {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = item.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Setup scroll animations
 */
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.section');

    // Initial setup
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Scroll handler
    const handleScroll = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
}

/**
 * Setup language selector
 */
function setupLanguageSelector() {
    const langBtn = document.getElementById('langBtn');
    if (!langBtn) return;

    langBtn.addEventListener('click', () => {
        const currentLang = document.documentElement.getAttribute('lang');
        const newLang = currentLang === 'ar' ? 'en' : currentLang === 'en' ? 'fr' : 'ar';
        switchLanguage(newLang);
    });
}

/**
 * Check if app is initialized
 * @returns {boolean}
 */
export function isAppInitialized() {
    return isInitialized;
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export for external use
export default {
    init: initializeApp,
    isInitialized: isAppInitialized
};