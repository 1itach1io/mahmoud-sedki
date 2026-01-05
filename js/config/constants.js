/**
 * Application Constants
 * Global configuration and constants
 */

// App Information
export const APP_INFO = {
    name: 'منصة مدرستنا التعليمية',
    nameEn: 'Our School Learning Platform',
    version: '2.0.0',
    author: 'Mahmoud Sedki',
    description: 'مكان للتعلم والإبداع والنجاح'
};

// Firebase Configuration
export const FIREBASE_CONFIG = {
    enabled: false, // Set to true to enable Firebase
    apiKey: "AIzaSyDs1B9r21Ir7y91nTQ7QTMplq_bcH1Bfzk",
    authDomain: "school-project-91aee.firebaseapp.com",
    projectId: "school-project-91aee",
    storageBucket: "school-project-91aee.firebasestorage.app",
    messagingSenderId: "634655281566",
    appId: "1:634655281566:web:a7b07ebce526d391c8468f"
};

// Supported Languages
export const LANGUAGES = {
    ar: {
        code: 'ar',
        name: 'العربية',
        nameEn: 'Arabic',
        flag: '🇸🇦',
        dir: 'rtl'
    },
    en: {
        code: 'en',
        name: 'English',
        nameEn: 'English',
        flag: '🇬🇧',
        dir: 'ltr'
    },
    fr: {
        code: 'fr',
        name: 'Français',
        nameEn: 'French',
        flag: '🇫🇷',
        dir: 'ltr'
    }
};

// Default Settings
export const DEFAULTS = {
    language: 'ar',
    theme: 'light',
    autoDetectLanguage: true,
    autoDetectTheme: true
};

// Storage Keys
export const STORAGE_KEYS = {
    user: 'userData',
    userLegacy: 'user',
    theme: 'theme',
    themeManual: 'theme-manual',
    language: 'language',
    rememberMe: 'rememberMe',
    redirectAfterLogin: 'redirectAfterLogin'
};

// API Endpoints (for future use)
export const API_ENDPOINTS = {
    base: 'https://api.school.com',
    auth: '/auth',
    users: '/users',
    courses: '/courses',
    teachers: '/teachers',
    activities: '/activities'
};

// Demo Credentials
export const DEMO_CREDENTIALS = {
    email: 'student@school.com',
    password: '123456',
    user: {
        name: 'أحمد محمد',
        nameEn: 'Ahmed Mohamed',
        role: 'student'
    }
};

// Theme Colors
export const THEME_COLORS = {
    light: {
        primary: '#4CAF50',
        secondary: '#2196F3',
        background: '#f5f5f5',
        surface: '#ffffff',
        text: '#333333'
    },
    dark: {
        primary: '#4CAF50',
        secondary: '#2196F3',
        background: '#1a1a1a',
        surface: '#2d2d2d',
        text: '#f0f0f0'
    }
};

// Animation Durations (ms)
export const ANIMATION_DURATION = {
    fast: 200,
    normal: 300,
    slow: 500,
    loading: 1500
};

// Breakpoints (px)
export const BREAKPOINTS = {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    wide: 1200
};

// Contact Information
export const CONTACT_INFO = {
    email: 'school@edu.eg',
    phone: '+20 123 456 7890',
    address: 'الاسكندريه، مصر',
    addressEn: 'alex, Egypt'
};

// Social Media Links (optional)
export const SOCIAL_LINKS = {
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    linkedin: ''
};

// Routes
export const ROUTES = {
    home: 'index.html',
    login: 'login.html',
    profile: 'profile.html',
    courses: 'courses.html',
    teachers: 'teachers.html',
    activities: 'activities.html',
    contact: 'contact.html'
};

// Regular Expressions
export const REGEX = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\d\s\-\+\(\)]+$/,
    url: /^https?:\/\/.+/
};

// File Upload Limits
export const FILE_LIMITS = {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
};

// Notification Settings
export const NOTIFICATION_SETTINGS = {
    duration: {
        success: 3000,
        error: 4000,
        warning: 3500,
        info: 3000
    },
    position: 'top-right',
    maxVisible: 3
};

// Loading Screen Settings
export const LOADING_SETTINGS = {
    minDuration: 1000,
    maxDuration: 5000,
    showProgress: true,
    showLogo: true
};

// Feature Flags (for gradual rollout)
export const FEATURE_FLAGS = {
    enableFirebase: false,
    enableGoogleSignIn: true,
    enableEmailSignIn: true,
    enableDarkMode: true,
    enableMultiLanguage: true,
    enableNotifications: true,
    enableOfflineMode: false,
    enablePWA: false
};

// Error Messages
export const ERROR_MESSAGES = {
    network: 'فشل الاتصال بالإنترنت',
    networkEn: 'Network connection failed',
    unknown: 'حدث خطأ غير متوقع',
    unknownEn: 'An unexpected error occurred',
    timeout: 'انتهت مهلة الطلب',
    timeoutEn: 'Request timeout'
};

// Success Messages
export const SUCCESS_MESSAGES = {
    loginSuccess: 'تم تسجيل الدخول بنجاح!',
    logoutSuccess: 'تم تسجيل الخروج بنجاح!',
    saveSuccess: 'تم الحفظ بنجاح!',
    updateSuccess: 'تم التحديث بنجاح!'
};

// Development Mode
export const IS_DEV = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

// Production Mode
export const IS_PROD = !IS_DEV;

// Console Logging (disable in production)
export const ENABLE_LOGS = IS_DEV;

// Export all as default object
export default {
    APP_INFO,
    FIREBASE_CONFIG,
    LANGUAGES,
    DEFAULTS,
    STORAGE_KEYS,
    API_ENDPOINTS,
    DEMO_CREDENTIALS,
    THEME_COLORS,
    ANIMATION_DURATION,
    BREAKPOINTS,
    CONTACT_INFO,
    SOCIAL_LINKS,
    ROUTES,
    REGEX,
    FILE_LIMITS,
    NOTIFICATION_SETTINGS,
    LOADING_SETTINGS,
    FEATURE_FLAGS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    IS_DEV,
    IS_PROD,
    ENABLE_LOGS
};