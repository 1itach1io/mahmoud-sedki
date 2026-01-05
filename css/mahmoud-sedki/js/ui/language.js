/**
 * Multi-Language System
 * Automatic language detection and switching
 */

// Language translations
const translations = {
    ar: {
        // Navigation
        'nav.home': 'الرئيسية',
        'nav.schedule': 'الجدول الدراسي',
        'nav.teachers': 'المعلمون',
        'nav.activities': 'الأنشطة',
        'nav.contact': 'اتصل بنا',

        // Hero Section
        'hero.title': 'مرحباً بكم في مدرستنا',
        'hero.subtitle': 'مكان للتعلم والإبداع والنجاح',

        // About
        'about.title': 'عن مدرستنا',
        'about.text': 'مدرستنا هي مكان للتعلم والإبداع والنجاح. نهدف إلى تقديم أفضل تجربة تعليمية للطلاب.',

        // Schedule
        'schedule.title': 'الجدول الدراسي',
        'schedule.morning': 'الحصص الصباحية',
        'schedule.morning.time': '7:00 صباحاً – 11:00 صباحاً',
        'schedule.evening': 'الحصص المسائية',
        'schedule.evening.time': '1:00 مساءً – 5:00 مساءً',

        // Teachers
        'teachers.title': 'معلمونا',
        'teachers.math': 'مدرس رياضيات',
        'teachers.english': 'مدرسة لغة إنجليزية',
        'teachers.science': 'مدرس علوم',

        // Activities
        'activities.title': 'الأنشطة المدرسية',
        'activities.football': 'فريق كرة القدم',
        'activities.football.desc': 'التدريب كل يوم إثنين وأربعاء',
        'activities.art': 'نادي الفنون',
        'activities.art.desc': 'الرسم والتصميم كل يوم جمعة',
        'activities.reading': 'نادي القراءة',
        'activities.reading.desc': 'مناقشة الكتب كل يوم أحد',

        // Contact
        'contact.title': 'تواصل معنا',
        'contact.email': 'البريد الإلكتروني',
        'contact.phone': 'الهاتف',
        'contact.address': 'العنوان',

        // Login
        'login.title': 'مرحباً بعودتك',
        'login.subtitle': 'سجل دخولك للوصول إلى منصتك التعليمية',
        'login.email': 'البريد الإلكتروني',
        'login.password': 'كلمة المرور',
        'login.remember': 'تذكرني',
        'login.forgot': 'نسيت كلمة المرور؟',
        'login.submit': 'تسجيل الدخول',
        'login.google': 'تسجيل الدخول بواسطة Google',
        'login.or': 'أو',
        'login.signup': 'ليس لديك حساب؟',
        'login.signup.link': 'إنشاء حساب جديد',
        'login.back': 'العودة للصفحة الرئيسية',

        // Profile
        'profile.guest': 'زائر',
        'profile.logout': 'تسجيل الخروج',
        'profile.login': 'تسجيل الدخول',

        // Messages
        'msg.loading': 'جاري التحميل...',
        'msg.logout.confirm': 'هل أنت متأكد من تسجيل الخروج؟',
        'msg.logout.success': 'تم تسجيل الخروج بنجاح!',
        'msg.login.success': 'تم تسجيل الدخول بنجاح!',
        'msg.error.email': 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        'msg.error.fields': 'الرجاء ملء جميع الحقول',

        // Footer
        'footer.rights': '© 2025 منصة مدرستنا التعليمية – جميع الحقوق محفوظة'
    },

    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.schedule': 'Schedule',
        'nav.teachers': 'Teachers',
        'nav.activities': 'Activities',
        'nav.contact': 'Contact',

        // Hero Section
        'hero.title': 'Welcome to Our School',
        'hero.subtitle': 'A place for learning, creativity, and success',

        // About
        'about.title': 'About Our School',
        'about.text': 'Our school is a place for learning, creativity, and success. We aim to provide the best educational experience for students.',

        // Schedule
        'schedule.title': 'School Schedule',
        'schedule.morning': 'Morning Classes',
        'schedule.morning.time': '7:00 AM – 11:00 AM',
        'schedule.evening': 'Evening Classes',
        'schedule.evening.time': '1:00 PM – 5:00 PM',

        // Teachers
        'teachers.title': 'Our Teachers',
        'teachers.math': 'Math Teacher',
        'teachers.english': 'English Teacher',
        'teachers.science': 'Science Teacher',

        // Activities
        'activities.title': 'School Activities',
        'activities.football': 'Football Team',
        'activities.football.desc': 'Training every Monday and Wednesday',
        'activities.art': 'Art Club',
        'activities.art.desc': 'Painting and design every Friday',
        'activities.reading': 'Reading Club',
        'activities.reading.desc': 'Book discussions every Sunday',

        // Contact
        'contact.title': 'Contact Us',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.address': 'Address',

        // Login
        'login.title': 'Welcome Back',
        'login.subtitle': 'Sign in to access your learning platform',
        'login.email': 'Email',
        'login.password': 'Password',
        'login.remember': 'Remember me',
        'login.forgot': 'Forgot password?',
        'login.submit': 'Sign In',
        'login.google': 'Sign in with Google',
        'login.or': 'or',
        'login.signup': "Don't have an account?",
        'login.signup.link': 'Create new account',
        'login.back': 'Back to home',

        // Profile
        'profile.guest': 'Guest',
        'profile.logout': 'Logout',
        'profile.login': 'Login',

        // Messages
        'msg.loading': 'Loading...',
        'msg.logout.confirm': 'Are you sure you want to logout?',
        'msg.logout.success': 'Logged out successfully!',
        'msg.login.success': 'Logged in successfully!',
        'msg.error.email': 'Incorrect email or password',
        'msg.error.fields': 'Please fill in all fields',

        // Footer
        'footer.rights': '© 2025 Our School Learning Platform – All Rights Reserved'
    },

    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.schedule': 'Horaire',
        'nav.teachers': 'Professeurs',
        'nav.activities': 'Activités',
        'nav.contact': 'Contact',

        // Hero Section
        'hero.title': 'Bienvenue à Notre École',
        'hero.subtitle': 'Un lieu pour apprendre, créer et réussir',

        // Login
        'login.title': 'Bon Retour',
        'login.subtitle': 'Connectez-vous à votre plateforme',
        'login.google': 'Se connecter avec Google',

        // Add more French translations as needed...
    }
};

// Current language state
let currentLanguage = 'ar';

/**
 * Detect browser/system language
 * @returns {string} Language code (ar, en, fr)
 */
export function detectLanguage() {
    // Check saved preference first
    const savedLang = localStorage.getItem('language');
    if (savedLang && translations[savedLang]) {
        return savedLang;
    }

    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();

    // Map to supported languages
    if (langCode === 'ar') return 'ar';
    if (langCode === 'fr') return 'fr';
    return 'en'; // Default to English
}

/**
 * Initialize language system
 */
export function initLanguage() {
    currentLanguage = detectLanguage();
    applyLanguage(currentLanguage);
    console.log(`🌍 Language detected: ${currentLanguage}`);
}

/**
 * Get translation for a key
 * @param {string} key - Translation key
 * @param {string} lang - Language code (optional)
 * @returns {string} Translated text
 */
export function t(key, lang = currentLanguage) {
    return translations[lang]?.[key] || key;
}

/**
 * Apply language to the page
 * @param {string} lang - Language code
 */
export function applyLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language "${lang}" not supported`);
        return;
    }

    currentLanguage = lang;

    // Set HTML attributes
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key, lang);
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key, lang);
    });

    // Save preference
    localStorage.setItem('language', lang);

    // Dispatch event for other modules
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

/**
 * Switch to a different language
 * @param {string} lang - Language code
 */
export function switchLanguage(lang) {
    if (lang === currentLanguage) return;
    applyLanguage(lang);
}

/**
 * Get current language
 * @returns {string} Current language code
 */
export function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * Get available languages
 * @returns {Array} Array of language objects
 */
export function getAvailableLanguages() {
    return [
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' }
    ];
}

// Export translations for direct access if needed
export { translations };