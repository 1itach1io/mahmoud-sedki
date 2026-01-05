// app.js - مدرسة محمود صدقي - نظام متعدد اللغات مع الكشف التلقائي
(() => {
    'use strict';

    // ========== Firebase Configuration ==========
    const firebaseConfig = {
        apiKey: "AIzaSyDs1B9r21Ir7y91nTQ7QTMplq_bcH1Bfzk",
        authDomain: "school-project-91aee.firebaseapp.com",
        projectId: "school-project-91aee",
        storageBucket: "school-project-91aee.firebasestorage.app",
        messagingSenderId: "634655281566",
        appId: "1:634655281566:web:b0e6f545617e47edc8468f"
    };

    // ========== Translations (Embedded) ==========
    const translations = {
        ar: {
            ourSchool: 'مدرسة محمود صدقي',
            smartPlatform: 'منصة تعليمية ذكية متطورة',
            home: 'الرئيسية',
            schedule: 'الجدول',
            teachers: 'المعلمون',
            activities: 'الأنشطة',
            contact: 'اتصل بنا',
            welcome: 'مرحباً بك في مدرسة محمود صدقي',
            modernPlatform: 'منصة تعليمية حديثة ومتميزة لمستقبل أفضل لأبنائنا',
            exploreNow: 'استكشف الآن',
            startLearning: 'ابدأ التعلم',
            content: 'محتوى تعليمي',
            contentDesc: 'مكتبة شاملة من الدروس المتميزة',
            organized: 'جدول منظم',
            organizedDesc: 'تتبع الحصص بسهولة ويسر',
            teachersTitle: 'معلمون متميزون',
            teachersDesc: 'نخبة من المعلمين المتميزين',
            evaluation: 'نظام التقييم',
            evaluationDesc: 'متابعة مستمرة للتطور',
            schoolSchedule: 'الجدول الدراسي',
            ourTeachers: 'نخبة المعلمين',
            activitiesTitle: 'الأنشطة المدرسية',
            contactTitle: 'تواصل معنا',
            contactInfo: 'معلومات الاتصال',
            email: 'البريد الإلكتروني',
            phone: 'الهاتف',
            address: 'العنوان',
            location: 'الاسكندرية، مصر',
            sendMsg: 'أرسل رسالة',
            namePlaceholder: 'الاسم',
            emailPlaceholder: 'البريد الإلكتروني',
            messagePlaceholder: 'الرسالة',
            send: 'إرسال',
            rights: 'جميع الحقوق محفوظة',
            login: 'تسجيل الدخول',
            loginBtn: 'دخول',
            logout: 'تسجيل الخروج',
            googleLogin: 'تسجيل بجوجل',
            demo: 'حسابات تجريبية:',
            adminAccount: 'مدير: admin@school.com / admin123',
            studentAccount: 'طالب: student@school.com / student123',
            teacherAccount: 'معلم: teacher@school.com / teacher123',
            emailExample: 'example@school.com',
            invalidCredentials: 'بيانات الدخول غير صحيحة',
            contactSent: 'تم إرسال رسالتك بنجاح!',
            addTeacher: 'إضافة معلم',
            addDay: 'إضافة يوم',
            edit: 'تحرير',
            save: 'حفظ',
            teacherName: 'اسم المعلم',
            subject: 'المادة',
            day: 'اليوم',
            morning: 'الفترة الصباحية',
            evening: 'الفترة المسائية'
        },
        en: {
            ourSchool: 'Mahmoud Sidky School',
            smartPlatform: 'Advanced Smart Learning Platform',
            home: 'Home',
            schedule: 'Schedule',
            teachers: 'Teachers',
            activities: 'Activities',
            contact: 'Contact',
            welcome: 'Welcome to Mahmoud Sidky School',
            modernPlatform: 'A modern and distinguished educational platform for a better future for our children',
            exploreNow: 'Explore Now',
            startLearning: 'Start Learning',
            content: 'Educational Content',
            contentDesc: 'Comprehensive library of distinguished lessons',
            organized: 'Organized Schedule',
            organizedDesc: 'Track classes with ease',
            teachersTitle: 'Distinguished Teachers',
            teachersDesc: 'Elite group of distinguished teachers',
            evaluation: 'Evaluation System',
            evaluationDesc: 'Continuous progress monitoring',
            schoolSchedule: 'School Schedule',
            ourTeachers: 'Our Teachers',
            activitiesTitle: 'School Activities',
            contactTitle: 'Contact Us',
            contactInfo: 'Contact Information',
            email: 'Email',
            phone: 'Phone',
            address: 'Address',
            location: 'alex, Egypt',
            sendMsg: 'Send Message',
            namePlaceholder: 'Name',
            emailPlaceholder: 'Email',
            messagePlaceholder: 'Message',
            send: 'Send',
            rights: 'All Rights Reserved',
            login: 'Login',
            loginBtn: 'Login',
            logout: 'Logout',
            googleLogin: 'Sign in with Google',
            demo: 'Demo Accounts:',
            adminAccount: 'Admin: admin@school.com / admin123',
            studentAccount: 'Student: student@school.com / student123',
            teacherAccount: 'Teacher: teacher@school.com / teacher123',
            emailExample: 'example@school.com',
            invalidCredentials: 'Invalid credentials',
            contactSent: 'Your message has been sent successfully!',
            addTeacher: 'Add Teacher',
            addDay: 'Add Day',
            edit: 'Edit',
            save: 'Save',
            teacherName: 'Teacher Name',
            subject: 'Subject',
            day: 'Day',
            morning: 'Morning Period',
            evening: 'Evening Period'
        },
        fr: {
            ourSchool: 'École Mahmoud Sidky',
            smartPlatform: 'Plateforme d\'apprentissage intelligente avancée',
            home: 'Accueil',
            schedule: 'Emploi du temps',
            teachers: 'Enseignants',
            activities: 'Activités',
            contact: 'Contact',
            welcome: 'Bienvenue à l\'École Mahmoud Sidky',
            modernPlatform: 'Une plateforme éducative moderne et distinguée pour un meilleur avenir pour nos enfants',
            exploreNow: 'Explorer maintenant',
            startLearning: 'Commencer l\'apprentissage',
            content: 'Contenu éducatif',
            contentDesc: 'Bibliothèque complète de leçons distinguées',
            organized: 'Emploi du temps organisé',
            organizedDesc: 'Suivez les cours facilement',
            teachersTitle: 'Enseignants distingués',
            teachersDesc: 'Groupe d\'élite d\'enseignants distingués',
            evaluation: 'Système d\'évaluation',
            evaluationDesc: 'Suivi continu des progrès',
            schoolSchedule: 'Emploi du temps scolaire',
            ourTeachers: 'Nos enseignants',
            activitiesTitle: 'Activités scolaires',
            contactTitle: 'Contactez-nous',
            contactInfo: 'Informations de contact',
            email: 'Email',
            phone: 'Téléphone',
            address: 'Adresse',
            location: 'Le alex, Égypte',
            sendMsg: 'Envoyer un message',
            namePlaceholder: 'Nom',
            emailPlaceholder: 'Email',
            messagePlaceholder: 'Message',
            send: 'Envoyer',
            rights: 'Tous droits réservés',
            login: 'Connexion',
            loginBtn: 'Se connecter',
            logout: 'Déconnexion',
            googleLogin: 'Se connecter avec Google',
            demo: 'Comptes de démonstration:',
            adminAccount: 'Admin: admin@school.com / admin123',
            studentAccount: 'Étudiant: student@school.com / student123',
            teacherAccount: 'Enseignant: teacher@school.com / teacher123',
            emailExample: 'example@school.com',
            invalidCredentials: 'Identifiants invalides',
            contactSent: 'Votre message a été envoyé avec succès!',
            addTeacher: 'Ajouter un enseignant',
            addDay: 'Ajouter un jour',
            edit: 'Modifier',
            save: 'Enregistrer',
            teacherName: 'Nom de l\'enseignant',
            subject: 'Matière',
            day: 'Jour',
            morning: 'Période du matin',
            evening: 'Période du soir'
        }
    };

    // ========== DOM Elements ==========
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));

    const yearEl = $('#year');
    const userArea = $('#userArea');
    const langSelect = $('#langSelect');
    const darkBtn = $('#darkBtn');
    const menuToggle = $('#menuToggle');
    const mobileNav = $('#mobileNav');
    const navBtns = $$('.nav-btn');
    const pages = $$('.page');
    const loginModal = $('#loginModal');
    const editModal = $('#editModal');
    const loginError = $('#loginError');
    const loginEmail = $('#loginEmail');
    const loginPass = $('#loginPass');
    const doLogin = $('#doLogin');
    const googleLogin = $('#googleLogin');
    const togglePass = $('#togglePass');
    const exploreBtn = $('#exploreBtn');
    const teacherListEl = $('#teacherList');
    const scheduleListEl = $('#scheduleList');
    const activitiesListEl = $('#activitiesList');
    const teachersAdminEl = $('#teachersAdmin');
    const scheduleAdminEl = $('#scheduleAdmin');
    const contactForm = $('#contactForm');

    // ========== State ==========
    let currentLang = localStorage.getItem('site_lang') || detectBrowserLanguage();
    let currentUser = JSON.parse(localStorage.getItem('site_user') || 'null');
    let dark = JSON.parse(localStorage.getItem('site_dark') || 'null');

    // Auto-detect dark mode from system preference if not set
    if (dark === null) {
        dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // ========== Demo Users ==========
    const demoUsers = [
        { email: 'admin@school.com', password: 'admin123', name: 'المدير', role: 'admin', avatar: '👨‍💼' },
        { email: 'student@school.com', password: 'student123', name: 'محمود صدقي', role: 'student', avatar: '👨‍🎓' },
        { email: 'teacher@school.com', password: 'teacher123', name: 'أ. أحمد محمد', role: 'teacher', avatar: '👨‍🏫' }
    ];

    // ========== Language Detection ==========
    function detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();

        // Check if detected language is supported
        if (translations[langCode]) {
            return langCode;
        }

        // Default to Arabic
        return 'ar';
    }

    // ========== Translation Function ==========
    function t(key) {
        return translations[currentLang]?.[key] || translations['ar'][key] || key;
    }

    // ========== Apply Translations ==========
    function applyTranslations() {
        // Translate all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = t(key);
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = t(key);
        });

        // Set RTL/LTR direction
        const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
        document.documentElement.dir = rtlLanguages.includes(currentLang) ? 'rtl' : 'ltr';
        document.documentElement.lang = currentLang;

        // Update language selector
        if (langSelect) langSelect.value = currentLang;
    }

    // ========== Language Change Handler ==========
    function changeLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('site_lang', lang);
        applyTranslations();
        renderUserArea();
        renderAdminControls();
    }

    // ========== Dark Mode ==========
    function applyDarkMode() {
        if (dark) {
            document.documentElement.classList.add('dark');
            if (darkBtn) {
                const icon = darkBtn.querySelector('.dark-icon');
                if (icon) icon.textContent = '☀️';
            }
        } else {
            document.documentElement.classList.remove('dark');
            if (darkBtn) {
                const icon = darkBtn.querySelector('.dark-icon');
                if (icon) icon.textContent = '🌙';
            }
        }
        localStorage.setItem('site_dark', JSON.stringify(dark));
    }

    function toggleDarkMode() {
        dark = !dark;
        applyDarkMode();
    }

    // ========== Firebase Initialization ==========
    let firebaseAvailable = false;
    let auth = null, db = null, storage = null;

    try {
        if (typeof firebase !== 'undefined') {
            firebase.initializeApp(firebaseConfig);
            auth = firebase.auth();
            db = firebase.firestore();
            storage = firebase.storage();
            firebaseAvailable = true;
            console.log('✅ Firebase initialized successfully');
        }
    } catch (err) {
        console.warn('⚠️ Firebase initialization failed:', err);
        firebaseAvailable = false;
    }

    // ========== User Area Rendering ==========
    function renderUserArea() {
        if (!userArea) return;

        if (currentUser) {
            userArea.innerHTML = `
                <div class="user">
                    <span class="avatar">${currentUser.avatar || '👤'}</span>
                    <span>${currentUser.name || currentUser.email}</span>
                    <button id="logoutBtn" class="control" style="padding: 8px 12px;">${t('logout')}</button>
                </div>
            `;
            const logoutBtn = $('#logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', handleLogout);
            }
        } else {
            userArea.innerHTML = `
                <button id="openLogin" class="btn primary" style="padding: 10px 20px;">${t('login')}</button>
            `;
            const openLogin = $('#openLogin');
            if (openLogin) {
                openLogin.addEventListener('click', openLoginModal);
            }
        }
    }

    // ========== Login/Logout Functions ==========
    function openLoginModal() {
        if (loginModal) {
            loginModal.classList.remove('hidden');
            if (loginError) loginError.classList.add('hidden');
            if (loginEmail) loginEmail.value = '';
            if (loginPass) loginPass.value = '';
        }
    }

    function closeLoginModal() {
        if (loginModal) loginModal.classList.add('hidden');
    }

    async function handleLogout() {
        if (firebaseAvailable && auth && auth.currentUser) {
            try {
                await auth.signOut();
            } catch (e) {
                console.warn('Sign out error:', e);
            }
        }
        currentUser = null;
        localStorage.removeItem('site_user');
        renderUserArea();
        renderAdminControls();
    }

    function tryLocalLogin() {
        const email = loginEmail?.value.trim() || '';
        const pass = loginPass?.value || '';
        const user = demoUsers.find(u => u.email === email && u.password === pass);

        if (user) {
            currentUser = {
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                role: user.role,
                provider: 'local'
            };
            localStorage.setItem('site_user', JSON.stringify(currentUser));
            renderUserArea();
            renderAdminControls();
            closeLoginModal();
        } else {
            if (loginError) {
                loginError.textContent = t('invalidCredentials');
                loginError.classList.remove('hidden');
            }
        }
    }

    async function tryEmailPasswordLogin() {
        if (!firebaseAvailable || !auth) {
            return tryLocalLogin();
        }

        try {
            const email = loginEmail.value.trim();
            const pass = loginPass.value;
            await auth.signInWithEmailAndPassword(email, pass);
        } catch (err) {
            console.warn('Email login failed:', err);
            tryLocalLogin();
        }
    }

    async function handleGoogleLogin() {
        if (!firebaseAvailable || !auth) {
            alert('Firebase is not available. Please use demo accounts.');
            return;
        }

        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await auth.signInWithPopup(provider);
            closeLoginModal();
        } catch (err) {
            console.error('Google sign-in error:', err);
            if (loginError) {
                loginError.textContent = err.message || 'Google sign-in failed';
                loginError.classList.remove('hidden');
            }
        }
    }

    // ========== Firebase Auth Observer ==========
    if (firebaseAvailable && auth) {
        auth.onAuthStateChanged(async (fbUser) => {
            if (fbUser) {
                currentUser = {
                    uid: fbUser.uid,
                    email: fbUser.email,
                    name: fbUser.displayName || fbUser.email.split('@')[0],
                    avatar: fbUser.photoURL || '👤',
                    role: fbUser.email === 'admin@school.com' ? 'admin' : 'student',
                    provider: 'google'
                };
                localStorage.setItem('site_user', JSON.stringify(currentUser));
                renderUserArea();
                renderAdminControls();
            } else {
                const saved = JSON.parse(localStorage.getItem('site_user') || 'null');
                currentUser = saved;
                renderUserArea();
                renderAdminControls();
            }
        });
    }

    // ========== Admin Controls ==========
    function renderAdminControls() {
        if (teachersAdminEl) teachersAdminEl.innerHTML = '';
        if (scheduleAdminEl) scheduleAdminEl.innerHTML = '';

        if (currentUser && currentUser.role === 'admin') {
            if (teachersAdminEl) {
                const addBtn = document.createElement('button');
                addBtn.className = 'btn primary';
                addBtn.textContent = t('addTeacher');
                addBtn.addEventListener('click', openAddTeacherModal);
                teachersAdminEl.appendChild(addBtn);
            }

            if (scheduleAdminEl) {
                const addBtn = document.createElement('button');
                addBtn.className = 'btn primary';
                addBtn.textContent = t('addDay');
                addBtn.addEventListener('click', openAddScheduleModal);
                scheduleAdminEl.appendChild(addBtn);
            }
        }
    }

    function openAddTeacherModal() {
        if (!editModal) return;
        editModal.classList.remove('hidden');
        const editTitle = $('#editTitle');
        const editBody = $('#editBody');

        if (editTitle) editTitle.textContent = t('addTeacher');
        if (!editBody) return;

        editBody.innerHTML = `
            <input id="teacherNameInput" placeholder="${t('teacherName')}" style="width:100%;padding:12px;border-radius:10px;border:2px solid rgba(5,150,105,0.15);margin-bottom:12px;">
            <input id="teacherSubjectInput" placeholder="${t('subject')}" style="width:100%;padding:12px;border-radius:10px;border:2px solid rgba(5,150,105,0.15);margin-bottom:12px;">
            <button id="saveTeacher" class="btn primary">${t('save')}</button>
        `;

        const saveBtn = $('#saveTeacher');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                // Here you would save to Firebase/Firestore
                editModal.classList.add('hidden');
                alert('Teacher added (demo mode)');
            });
        }
    }

    function openAddScheduleModal() {
        if (!editModal) return;
        editModal.classList.remove('hidden');
        const editTitle = $('#editTitle');
        const editBody = $('#editBody');

        if (editTitle) editTitle.textContent = t('addDay');
        if (!editBody) return;

        editBody.innerHTML = `
            <input id="dayInput" placeholder="${t('day')}" style="width:100%;padding:12px;border-radius:10px;border:2px solid rgba(5,150,105,0.15);margin-bottom:12px;">
            <textarea id="morningInput" placeholder="${t('morning')}" rows="3" style="width:100%;padding:12px;border-radius:10px;border:2px solid rgba(5,150,105,0.15);margin-bottom:12px;"></textarea>
            <textarea id="eveningInput" placeholder="${t('evening')}" rows="3" style="width:100%;padding:12px;border-radius:10px;border:2px solid rgba(5,150,105,0.15);margin-bottom:12px;"></textarea>
            <button id="saveSchedule" class="btn primary">${t('save')}</button>
        `;

        const saveBtn = $('#saveSchedule');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                editModal.classList.add('hidden');
                alert('Schedule added (demo mode)');
            });
        }
    }

    // ========== Navigation ==========
    function showPage(pageId) {
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.remove('hidden');
            } else {
                page.classList.add('hidden');
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ========== Intersection Observer for Animations ==========
    function initObservers() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });

        const animatedElements = [
            ...$$('.animate-on-scroll'),
            ...$$('.teacher'),
            ...$$('.schedule-item'),
            ...$$('.activity')
        ];

        animatedElements.forEach(el => {
            el.classList.remove('in-view');
            observer.observe(el);
        });
    }

    // ========== Render Sample Content ==========
    function renderSampleContent() {
        // Sample Teachers
        if (teacherListEl) {
            teacherListEl.innerHTML = `
                <div class="teacher animate-on-scroll">
                    <div style="text-align:center">
                        <div class="avatar">👨‍🏫</div>
                        <h4>${currentLang === 'ar' ? 'أ. محمد أحمد' : currentLang === 'fr' ? 'M. Mohamed Ahmed' : 'Mr. Mohamed Ahmed'}</h4>
                        <div class="meta">${currentLang === 'ar' ? 'الرياضيات' : currentLang === 'fr' ? 'Mathématiques' : 'Mathematics'}</div>
                    </div>
                </div>
                <div class="teacher animate-on-scroll">
                    <div style="text-align:center">
                        <div class="avatar">👩‍🏫</div>
                        <h4>${currentLang === 'ar' ? 'أ. فاطمة علي' : currentLang === 'fr' ? 'Mme. Fatima Ali' : 'Mrs. Fatima Ali'}</h4>
                        <div class="meta">${currentLang === 'ar' ? 'العلوم' : currentLang === 'fr' ? 'Sciences' : 'Science'}</div>
                    </div>
                </div>
                <div class="teacher animate-on-scroll">
                    <div style="text-align:center">
                        <div class="avatar">👨‍🏫</div>
                        <h4>${currentLang === 'ar' ? 'أ. أحمد حسن' : currentLang === 'fr' ? 'M. Ahmed Hassan' : 'Mr. Ahmed Hassan'}</h4>
                        <div class="meta">${currentLang === 'ar' ? 'اللغة العربية' : currentLang === 'fr' ? 'Langue arabe' : 'Arabic Language'}</div>
                    </div>
                </div>
            `;
        }

        // Sample Schedule
        if (scheduleListEl) {
            const days = currentLang === 'ar'
                ? ['الأحد', 'الإثنين', 'الثلاثاء']
                : currentLang === 'fr'
                    ? ['Dimanche', 'Lundi', 'Mardi']
                    : ['Sunday', 'Monday', 'Tuesday'];

            const subjects = currentLang === 'ar'
                ? ['رياضيات، علوم', 'عربي، إنجليزي', 'تاريخ، جغرافيا']
                : currentLang === 'fr'
                    ? ['Maths, Sciences', 'Arabe, Anglais', 'Histoire, Géographie']
                    : ['Math, Science', 'Arabic, English', 'History, Geography'];

            scheduleListEl.innerHTML = days.map((day, i) => `
                <div class="schedule-item animate-on-scroll">
                    <h4>${day}</h4>
                    <div style="margin-top:12px">
                        <strong>${currentLang === 'ar' ? 'صباحاً:' : currentLang === 'fr' ? 'Matin:' : 'Morning:'}</strong>
                        <div style="color:var(--muted);margin-top:4px">${subjects[i]}</div>
                    </div>
                </div>
            `).join('');
        }

        // Sample Activities
        if (activitiesListEl) {
            const activities = currentLang === 'ar'
                ? [
                    { icon: '⚽', title: 'فريق كرة القدم', time: 'الإثنين 3:00' },
                    { icon: '🎨', title: 'نادي الفنون', time: 'الأربعاء 2:00' },
                    { icon: '🎵', title: 'نادي الموسيقى', time: 'الخميس 4:00' }
                ]
                : currentLang === 'fr'
                    ? [
                        { icon: '⚽', title: 'Équipe de football', time: 'Lundi 15:00' },
                        { icon: '🎨', title: 'Club d\'art', time: 'Mercredi 14:00' },
                        { icon: '🎵', title: 'Club de musique', time: 'Jeudi 16:00' }
                    ]
                    : [
                        { icon: '⚽', title: 'Football Team', time: 'Monday 3:00 PM' },
                        { icon: '🎨', title: 'Art Club', time: 'Wednesday 2:00 PM' },
                        { icon: '🎵', title: 'Music Club', time: 'Thursday 4:00 PM' }
                    ];

            activitiesListEl.innerHTML = activities.map(act => `
                <div class="activity animate-on-scroll">
                    <div style="font-size:48px;margin-bottom:12px">${act.icon}</div>
                    <h4>${act.title}</h4>
                    <div class="meta">${act.time}</div>
                </div>
            `).join('');
        }

        initObservers();
    }

    // ========== Event Listeners ==========
    function setupEventListeners() {
        // Language selector
        if (langSelect) {
            langSelect.addEventListener('change', (e) => {
                changeLanguage(e.target.value);
                renderSampleContent();
            });
        }

        // Dark mode toggle
        if (darkBtn) {
            darkBtn.addEventListener('click', toggleDarkMode);
        }

        // Menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                mobileNav?.classList.toggle('hidden');
            });
        }

        // Navigation buttons
        navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget.getAttribute('data-target');
                if (target) showPage(target);
                if (mobileNav && !mobileNav.classList.contains('hidden')) {
                    mobileNav.classList.add('hidden');
                }
            });
        });

        // Explore button
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => showPage('schedule'));
        }

        // Login buttons
        if (doLogin) {
            doLogin.addEventListener('click', () => {
                if (firebaseAvailable && auth) {
                    tryEmailPasswordLogin();
                } else {
                    tryLocalLogin();
                }
            });
        }

        if (googleLogin) {
            googleLogin.addEventListener('click', handleGoogleLogin);
        }

        // Toggle password visibility
        if (togglePass && loginPass) {
            togglePass.addEventListener('click', () => {
                loginPass.type = loginPass.type === 'password' ? 'text' : 'password';
            });
        }

        // Contact form
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert(t('contactSent'));
                contactForm.reset();
            });
        }

        // Close modals on background click
        if (loginModal) {
            loginModal.addEventListener('click', (e) => {
                if (e.target === loginModal) {
                    loginModal.classList.add('hidden');
                }
            });
        }

        if (editModal) {
            editModal.addEventListener('click', (e) => {
                if (e.target === editModal) {
                    editModal.classList.add('hidden');
                }
            });
        }
    }

    // ========== Initialization ==========
    function init() {
        // Set current year
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        // Apply dark mode
        applyDarkMode();

        // Apply translations
        applyTranslations();

        // Render UI
        renderUserArea();
        renderAdminControls();
        renderSampleContent();

        // Setup event listeners
        setupEventListeners();

        // Initialize observers
        initObservers();

        console.log('🎓 School website initialized successfully!');
        console.log(`📍 Current language: ${currentLang}`);
        console.log(`🌙 Dark mode: ${dark ? 'enabled' : 'disabled'}`);
    }

    // Start the application
    init();

    // Expose for debugging
    window.__school = {
        currentLang,
        currentUser: () => currentUser,
        changeLanguage,
        toggleDarkMode,
        firebaseAvailable
    };

})();
