/**
 * Email Authentication Module
 * Handles email/password authentication
 */

import { getFirebaseAuth, isFirebaseReady } from '../config/firebase.js';
import { saveUserData } from './auth.js';
import { showNotification } from '../ui/notifications.js';
import { t } from '../ui/language.js';

let signInWithEmailAndPassword = null;
let createUserWithEmailAndPassword = null;
let sendPasswordResetEmail = null;

/**
 * Initialize Email Authentication
 */
export async function initEmailAuth() {
    if (!isFirebaseReady()) {
        console.log('⚠️ Firebase not ready, using demo email auth');
        return false;
    }

    try {
        const authModule = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js');
        signInWithEmailAndPassword = authModule.signInWithEmailAndPassword;
        createUserWithEmailAndPassword = authModule.createUserWithEmailAndPassword;
        sendPasswordResetEmail = authModule.sendPasswordResetEmail;

        console.log('✅ Email authentication initialized');
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize email auth:', error);
        return false;
    }
}

/**
 * Sign in with email and password (Firebase)
 */
async function signInWithEmailFirebase(email, password) {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase not initialized');

    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return {
            uid: result.user.uid,
            name: result.user.displayName || result.user.email.split('@')[0],
            email: result.user.email,
            photo: result.user.photoURL || 'assets/images/default_avatar.png',
            provider: 'email',
            emailVerified: result.user.emailVerified
        };
    } catch (error) {
        throw handleAuthError(error);
    }
}

/**
 * Sign in with email (Demo mode)
 */
function signInWithEmailDemo(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Demo credentials
            if (email === 'student@school.com' && password === '123456') {
                resolve({
                    uid: 'demo_email_' + Date.now(),
                    name: 'أحمد محمد',
                    email: email,
                    photo: 'assets/images/default_avatar.png',
                    provider: 'email',
                    emailVerified: true,
                    isDemo: true
                });
            } else {
                reject(new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة'));
            }
        }, 800);
    });
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email, password, buttonElement = null) {
    // Validation
    if (!email || !password) {
        throw new Error(t('msg.error.fields'));
    }

    if (!isValidEmail(email)) {
        throw new Error('البريد الإلكتروني غير صالح');
    }

    if (password.length < 6) {
        throw new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
    }

    // Add loading state
    if (buttonElement) {
        buttonElement.classList.add('loading');
        buttonElement.disabled = true;
    }

    try {
        let userData;

        // Try Firebase first
        if (isFirebaseReady() && signInWithEmailAndPassword) {
            userData = await signInWithEmailFirebase(email, password);
            console.log('✅ Email sign-in successful (Firebase)');
        } else {
            // Fallback to demo
            userData = await signInWithEmailDemo(email, password);
            console.log('✅ Email sign-in successful (Demo)');
        }

        // Save user data
        saveUserData(userData);

        // Show success
        showNotification(t('msg.login.success'), 'success');

        // Redirect
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);

        return userData;

    } catch (error) {
        console.error('Email sign-in error:', error);
        showNotification(error.message, 'error');
        throw error;

    } finally {
        // Remove loading state
        if (buttonElement) {
            buttonElement.classList.remove('loading');
            buttonElement.disabled = false;
        }
    }
}

/**
 * Create new account with email/password
 */
export async function signUpWithEmail(email, password, displayName = null) {
    // Validation
    if (!email || !password) {
        throw new Error('الرجاء ملء جميع الحقول');
    }

    if (!isValidEmail(email)) {
        throw new Error('البريد الإلكتروني غير صالح');
    }

    if (password.length < 6) {
        throw new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
    }

    if (!isFirebaseReady() || !createUserWithEmailAndPassword) {
        throw new Error('التسجيل متاح فقط مع Firebase');
    }

    try {
        const auth = getFirebaseAuth();
        const result = await createUserWithEmailAndPassword(auth, email, password);

        // Update profile if name provided
        if (displayName && result.user) {
            const { updateProfile } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js');
            await updateProfile(result.user, { displayName });
        }

        const userData = {
            uid: result.user.uid,
            name: displayName || result.user.email.split('@')[0],
            email: result.user.email,
            photo: 'assets/images/default_avatar.png',
            provider: 'email',
            emailVerified: result.user.emailVerified
        };

        saveUserData(userData);
        showNotification('تم إنشاء الحساب بنجاح!', 'success');

        return userData;

    } catch (error) {
        throw handleAuthError(error);
    }
}

/**
 * Send password reset email
 */
export async function resetPassword(email) {
    if (!isValidEmail(email)) {
        throw new Error('البريد الإلكتروني غير صالح');
    }

    if (!isFirebaseReady() || !sendPasswordResetEmail) {
        throw new Error('استعادة كلمة المرور متاحة فقط مع Firebase');
    }

    try {
        const auth = getFirebaseAuth();
        await sendPasswordResetEmail(auth, email);
        showNotification('تم إرسال رابط إعادة تعيين كلمة المرور', 'success');
        return true;
    } catch (error) {
        throw handleAuthError(error);
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Handle Firebase auth errors
 */
function handleAuthError(error) {
    const errorMessages = {
        'auth/user-not-found': 'البريد الإلكتروني غير مسجل',
        'auth/wrong-password': 'كلمة المرور غير صحيحة',
        'auth/invalid-email': 'البريد الإلكتروني غير صالح',
        'auth/user-disabled': 'تم تعطيل هذا الحساب',
        'auth/too-many-requests': 'محاولات كثيرة. حاول لاحقاً',
        'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل',
        'auth/weak-password': 'كلمة المرور ضعيفة جداً',
        'auth/network-request-failed': 'فشل الاتصال بالإنترنت'
    };

    const message = errorMessages[error.code] || error.message || 'حدث خطأ في المصادقة';
    return new Error(message);
}

/**
 * Setup email login form
 */
export function setupEmailLoginForm(formId = 'loginForm') {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;
        const submitBtn = document.getElementById('submitBtn');

        try {
            await signInWithEmail(email, password, submitBtn);
        } catch (error) {
            // Error already handled
        }
    });

    console.log('✅ Email login form setup complete');
}

/**
 * Setup password toggle
 */
export function setupPasswordToggle(toggleId = 'togglePassword', inputId = 'password') {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);

    if (!toggle || !input) return;

    toggle.addEventListener('click', () => {
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        toggle.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });
}

// Export for external use
export default {
    init: initEmailAuth,
    signIn: signInWithEmail,
    signUp: signUpWithEmail,
    resetPassword,
    setupForm: setupEmailLoginForm,
    setupToggle: setupPasswordToggle
};