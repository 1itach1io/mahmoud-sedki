// app.js — مُحدَّث: يصحح الأخطاء، يهيئ i18next مع الكشف التلقائي للغة، يكتشف dark-mode، ويدمج Firebase إذا متاح
(() => {
    // ---------- Firebase configuration (احتفظ بالإعدادات التي زودتني بها) ----------
    const firebaseConfig = {
        apiKey: "AIzaSyDs1B9r21Ir7y91nTQ7QTMplq_bcH1Bfzk",
        authDomain: "school-project-91aee.firebaseapp.com",
        projectId: "school-project-91aee",
        storageBucket: "school-project-91aee.firebasestorage.app",
        messagingSenderId: "634655281566",
        appId: "1:634655281566:web:b0e6f545617e47edc8468f"
    };

    // ---------- DOM refs (سلامة الوصول: تحقّق من وجود العناصر) ----------
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));
    const yearEl = $('#year');
    const userArea = $('#userArea');
    const langSelect = $('#langSelect');
    const langBtn = $('#langBtn'); // موجود سابقًا لكن الآن نستخدم select
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
    const startBtn = $('#startBtn');
    const teacherListEl = $('#teacherList');
    const scheduleListEl = $('#scheduleList');
    const activitiesListEl = $('#activitiesList');
    const teachersAdminEl = $('#teachersAdmin');
    const scheduleAdminEl = $('#scheduleAdmin');
    const exploreBtn = $('#exploreBtn');

    // ---------- helper: safe element check ----------
    function ensure(el, name) {
        if (!el) console.warn(`Missing element: ${name}`);
        return el;
    }

    ensure(yearEl, '#year');
    ensure(userArea, '#userArea');
    ensure(langSelect, '#langSelect');

    // ---------- i18n setup (i18next) ----------
    // We use i18next + language detector + http backend to load translations dynamically from /locales/{{lng}}/translation.json
    // This allows you later to add >50 languages by adding JSON files under /locales.
    i18next
        .use(i18nextBrowserLanguageDetector)
        .use(i18nextHttpBackend)
        .init({
            fallbackLng: 'en',
            debug: false,
            whitelist: false, // allow any language (we'll load when needed)
            detection: {
                // detect order: urlQuerystring, cookie, localStorage, navigator
                order: ['querystring', 'localStorage', 'cookie', 'navigator'],
                caches: ['localStorage', 'cookie']
            },
            backend: {
                loadPath: '/locales/{{lng}}/translation.json'
            },
            interpolation: { escapeValue: false }
        })
        .then(() => {
            // i18next ready
            // After loading, call applyTranslations
            applyTranslations();
            buildLanguageSelector();
        })
        .catch(err => {
            console.warn('i18next init error', err);
            // applyFallbackTexts if any
            applyFallbackTexts();
            buildLanguageSelector();
        });

    // Simple fallback texts for minimal UI if translations unavailable
    const fallback = {
        ourSchool: 'Our School',
        smartPlatform: 'Smart Learning Platform',
        home: 'Home',
        schedule: 'Schedule',
        teachers: 'Teachers',
        activities: 'Activities',
        contact: 'Contact',
        welcome: 'Welcome to Our School',
        modernPlatform: 'A Modern Educational Platform for a Better Future',
        content: 'Educational Content',
        contentDesc: 'Comprehensive lesson library',
        organized: 'Organized Schedule',
        organizedDesc: 'Easy class tracking',
        ourTeachers: 'Our Teachers',
        schoolSchedule: 'School Schedule',
        contactTitle: 'Contact Us',
        send: 'Send',
        login: 'Login',
        loginBtn: 'Login',
        demo: 'Demo Accounts:',
        rights: 'All Rights Reserved'
    };

    function applyFallbackTexts() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (fallback[key]) el.textContent = fallback[key];
        });
    }

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const txt = i18next.t(key);
            el.textContent = txt || fallback[key] || key;
        });
        // set direction for RTL languages
        const rtlList = ['ar', 'he', 'fa', 'ur'];
        const currentLang = i18next.language || navigator.language || 'en';
        if (rtlList.includes(currentLang.split('-')[0])) {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
        // set lang attribute
        document.documentElement.lang = currentLang;
    }

    // ---------- build language selector (auto-detect languages list) ----------
    // We populate selector with many language options by using Intl.DisplayNames for native names.
    // This does NOT provide translations for UI — it only lists languages. To translate UI you must provide locales/{lng}/translation.json
    function buildLanguageSelector() {
        // A long list of language codes (covers >50 languages)
        const codes = [
            'en','ar','fr','es','de','it','pt','ru','zh','ja','ko','hi','bn','pa','mr','te','ta','ur','fa','he',
            'nl','sv','no','da','fi','pl','cs','sk','hu','ro','bg','sr','hr','sl','el','tr','vi','th','ms','id',
            'tl','sw','am','zu','xh','yo','ig','ha','km','lo','mn','ka','hy','lt','lv','et','uk','sr-Latn','bs'
        ];
        // Use Intl.DisplayNames to show native language names where supported
        let dn;
        try { dn = new Intl.DisplayNames([i18next.language || navigator.language || 'en'], {type: 'language'}); } catch (e) { dn = null; }
        langSelect.innerHTML = '';
        // Add current detected language first
        const detected = i18next.language || (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
        const addOption = (code) => {
            const name = dn ? dn.of(code) : code;
            const opt = document.createElement('option');
            opt.value = code;
            opt.textContent = `${name} (${code})`;
            langSelect.appendChild(opt);
        };
        // unique
        const uniqueCodes = Array.from(new Set([detected, ...codes]));
        uniqueCodes.forEach(addOption);
        // set current selected
        langSelect.value = detected;
        // on change -> change language and try to load translations
        langSelect.addEventListener('change', async (e) => {
            const lng = e.target.value;
            try {
                await i18next.changeLanguage(lng);
                applyTranslations();
                localStorage.setItem('i18nextLng', lng); // cache detector
                // attempt to load translations via backend: i18next-http-backend will fetch /locales/{lng}/translation.json
                // If missing, page will use fallback strings.
            } catch (err) {
                console.warn('changeLanguage error', err);
            }
        });
    }

    // ---------- dark mode auto-detection + toggle ----------
    // preference order: user saved setting > prefers-color-scheme > default light
    const savedDark = localStorage.getItem('site_dark');
    let dark = savedDark !== null ? JSON.parse(savedDark) : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    function applyDark() {
        if (dark) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');
        localStorage.setItem('site_dark', JSON.stringify(dark));
    }
    applyDark();
    if (darkBtn) darkBtn.addEventListener('click', () => { dark = !dark; applyDark(); });

    // ---------- Firebase init (safe) ----------
    let firebaseAvailable = false;
    let auth = null, db = null, storageRef = null;
    try {
        if (typeof firebase !== 'undefined') {
            firebase.initializeApp(firebaseConfig);
            auth = firebase.auth();
            db = firebase.firestore();
            storageRef = firebase.storage();
            firebaseAvailable = true;
            console.log('Firebase initialized');
        }
    } catch (err) {
        console.warn('Firebase init failed', err);
        firebaseAvailable = false;
    }

    // ---------- basic app state and demo fallback ----------
    let currentUser = JSON.parse(localStorage.getItem('site_user') || 'null');
    const demoUsers = [
        { email: 'admin@school.com', password: 'admin123', name: 'المدير', role: 'admin', avatar: '👨‍💼' },
        { email: 'student@school.com', password: 'student123', name: 'محمود', role: 'student', avatar: '👨‍🎓' },
        { email: 'teacher@school.com', password: 'teacher123', name: 'أ. أحمد', role: 'teacher', avatar: '👨‍🏫' }
    ];

    // ---------- helper UI functions ----------
    function renderUserArea() {
        if (!userArea) return;
        if (currentUser) {
            userArea.innerHTML = `<div class="user"><span class="avatar">${currentUser.avatar || '👤'}</span> <span>${currentUser.name || currentUser.email}</span> <button id="logoutBtn" class="control">${i18next.t('logout') || 'Logout'}</button></div>`;
            const logoutBtn = $('#logoutBtn');
            if (logoutBtn) logoutBtn.addEventListener('click', async () => {
                if (firebaseAvailable && auth && auth.currentUser) {
                    try { await auth.signOut(); } catch (e) { console.warn('signOut', e); }
                }
                currentUser = null;
                localStorage.removeItem('site_user');
                renderUserArea();
                renderAdminControls();
            });
        } else {
            userArea.innerHTML = `<button id="openLogin" class="btn">${i18next.t('login') || 'Login'}</button>`;
            const openLogin = $('#openLogin');
            if (openLogin) openLogin.addEventListener('click', () => openLoginModal());
        }
    }

    // ---------- login modal helpers ----------
    function openLoginModal() {
        if (loginModal) loginModal.classList.remove('hidden');
        if (loginError) { loginError.classList.add('hidden'); loginError.textContent = ''; }
        if (loginEmail) loginEmail.value = '';
        if (loginPass) loginPass.value = '';
    }
    function closeLoginModal() {
        if (loginModal) loginModal.classList.add('hidden');
    }

    // ---------- login actions ----------
    function tryLocalLogin() {
        const email = (loginEmail && loginEmail.value.trim()) || '';
        const pass = (loginPass && loginPass.value) || '';
        const u = demoUsers.find(x => x.email === email && x.password === pass);
        if (u) {
            currentUser = { email: u.email, name: u.name, avatar: u.avatar, role: u.role, provider: 'local' };
            localStorage.setItem('site_user', JSON.stringify(currentUser));
            renderUserArea();
            renderAdminControls();
            closeLoginModal();
        } else {
            if (loginError) {
                loginError.textContent = i18next.t('invalidCredentials') || 'Invalid credentials';
                loginError.classList.remove('hidden');
            }
        }
    }

    async function tryEmailPasswordLogin() {
        if (!firebaseAvailable || !auth) return tryLocalLogin();
        try {
            const email = loginEmail.value.trim();
            const pass = loginPass.value;
            await auth.signInWithEmailAndPassword(email, pass);
            // onAuthStateChanged will set currentUser
        } catch (err) {
            console.warn('email login failed', err);
            tryLocalLogin();
        }
    }

    async function googleSignIn() {
        if (!firebaseAvailable || !auth) {
            alert('Firebase غير متاح. يرجى تفعيل Firebase أو استخدام تسجيل محلي.');
            return;
        }
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await auth.signInWithPopup(provider);
            // onAuthStateChanged will apply user state
            closeLoginModal();
        } catch (err) {
            console.error('googleSignIn error', err);
            if (loginError) { loginError.textContent = err.message || 'Google sign-in failed'; loginError.classList.remove('hidden'); }
        }
    }

    // ---------- wire login buttons safely ----------
    if (doLogin) doLogin.addEventListener('click', async () => {
        if (firebaseAvailable && auth) await tryEmailPasswordLogin(); else tryLocalLogin();
    });
    if (googleLogin) googleLogin.addEventListener('click', googleSignIn);
    if (togglePass) togglePass.addEventListener('click', () => {
        if (loginPass) loginPass.type = loginPass.type === 'password' ? 'text' : 'password';
    });

    // ---------- Firebase auth state observer ----------
    if (firebaseAvailable && auth) {
        auth.onAuthStateChanged(async (fbUser) => {
            if (fbUser) {
                // build simple currentUser object (you should enrich from Firestore user doc)
                currentUser = {
                    uid: fbUser.uid,
                    email: fbUser.email,
                    name: fbUser.displayName || fbUser.email.split('@')[0],
                    avatar: fbUser.photoURL || '👤',
                    role: (fbUser.email === 'admin@school.com') ? 'admin' : 'student',
                    provider: 'google'
                };
                localStorage.setItem('site_user', JSON.stringify(currentUser));
                renderUserArea();
                renderAdminControls();
                // start Firestore listeners (if you implement them)
            } else {
                // logged out
                // keep local currentUser if exists (e.g., demo)
                const saved = JSON.parse(localStorage.getItem('site_user') || 'null');
                if (saved) { currentUser = saved; } else currentUser = null;
                renderUserArea();
                renderAdminControls();
            }
        });
    } else {
        // not using firebase -> just render UI
        renderUserArea();
        renderAdminControls();
    }

    // ---------- Admin controls (UI stub) ----------
    function renderAdminControls() {
        if (teachersAdminEl) teachersAdminEl.innerHTML = '';
        if (scheduleAdminEl) scheduleAdminEl.innerHTML = '';
        if (currentUser && currentUser.role === 'admin') {
            if (teachersAdminEl) {
                const addT = document.createElement('button'); addT.className = 'btn primary'; addT.textContent = i18next.t('addTeacher') || 'Add teacher';
                addT.addEventListener('click', () => openCreateTeacher());
                teachersAdminEl.appendChild(addT);
            }
            if (scheduleAdminEl) {
                const addS = document.createElement('button'); addS.className = 'btn primary'; addS.textContent = i18next.t('addDay') || 'Add Day';
                addS.addEventListener('click', () => openCreateSchedule());
                scheduleAdminEl.appendChild(addS);
            }
        }
    }

    // ---------- simple create/edit modals (stubs) ----------
    function openCreateTeacher() {
        if (!ensure(editModal, 'editModal')) return;
        editModal.classList.remove('hidden');
        const body = document.getElementById('editBody');
        if (!body) return;
        body.innerHTML = '';
        const name = document.createElement('input'); name.placeholder = 'اسم المعلم';
        const subj = document.createElement('input'); subj.placeholder = 'المادة';
        const save = document.createElement('button'); save.className = 'btn primary'; save.textContent = 'حفظ';
        save.addEventListener('click', async () => {
            const payload = { name: name.value || 'معلم جديد', subject: subj.value || '' };
            // if firebaseAvailable, add to Firestore (not implemented fully here)
            // close modal
            editModal.classList.add('hidden');
        });
        body.append(name, subj, save);
    }
    function openCreateSchedule() {
        if (!ensure(editModal, 'editModal')) return;
        editModal.classList.remove('hidden');
        const body = document.getElementById('editBody');
        if (!body) return;
        body.innerHTML = '';
        const day = document.createElement('input'); day.placeholder = 'اليوم';
        const morning = document.createElement('textarea'); morning.placeholder = 'الفترة الصباحية';
        const evening = document.createElement('textarea'); evening.placeholder = 'الفترة المسائية';
        const save = document.createElement('button'); save.className = 'btn primary'; save.textContent = 'حفظ';
        save.addEventListener('click', async () => { editModal.classList.add('hidden'); });
        body.append(day, morning, evening, save);
    }

    // ---------- navigation ----------
    function showPage(id) {
        pages.forEach(p => {
            if (p.id === id) p.classList.remove('hidden'); else p.classList.add('hidden');
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    navBtns.forEach(btn => btn.addEventListener('click', (e) => {
        const t = e.currentTarget.getAttribute('data-target');
        if (t) showPage(t);
        if (!mobileNav.classList.contains('hidden')) mobileNav.classList.add('hidden');
    }));
    if (menuToggle) menuToggle.addEventListener('click', () => mobileNav.classList.toggle('hidden'));
    if (exploreBtn) exploreBtn.addEventListener('click', () => showPage('schedule'));

    // ---------- animations: IntersectionObserver ----------
    function initObservers() {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(en => {
                if (en.isIntersecting) en.target.classList.add('in-view');
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.remove('in-view'); obs.observe(el);
        });
        document.querySelectorAll('.teacher, .schedule-item, .activity').forEach(el => {
            el.classList.remove('in-view'); obs.observe(el);
        });
    }

    // ---------- initial content render (fallback minimal) ----------
    function renderFallbackLists() {
        if (teacherListEl) {
            teacherListEl.innerHTML = '';
            const t1 = document.createElement('div'); t1.className = 'teacher animate-on-scroll';
            t1.innerHTML = `<div style="text-align:center"><div class="avatar">👨‍🏫</div><h4>أ. محمد أحمد</h4><div class="meta">الرياضيات</div></div>`;
            teacherListEl.appendChild(t1);
        }
        if (scheduleListEl) {
            scheduleListEl.innerHTML = '';
            const s1 = document.createElement('div'); s1.className = 'schedule-item animate-on-scroll';
            s1.innerHTML = `<h4>الأحد</h4><div><strong>صباحاً:</strong><div>رياضيات، علوم</div></div>`;
            scheduleListEl.appendChild(s1);
        }
        if (activitiesListEl) {
            activitiesListEl.innerHTML = '';
            const a1 = document.createElement('div'); a1.className = 'activity animate-on-scroll';
            a1.innerHTML = `<div style="font-size:28px">⚽</div><h4>فريق كرة القدم</h4><div class="meta">الإثنين 3:00</div>`;
            activitiesListEl.appendChild(a1);
        }
        initObservers();
    }

    // ---------- contact form ----------
    const contactForm = $('#contactForm');
    if (contactForm) contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert(i18next.t('contactSent') || 'Message sent (simulated)');
        contactForm.reset();
    });

    // close modals on background click
    if (editModal) editModal.addEventListener('click', (ev) => { if (ev.target === editModal) editModal.classList.add('hidden'); });
    if (loginModal) loginModal.addEventListener('click', (ev) => { if (ev.target === loginModal) loginModal.classList.add('hidden'); });

    // init
    function init() {
        yearEl && (yearEl.textContent = new Date().getFullYear());
        renderFallbackLists();
        renderUserArea();
        renderAdminControls();
        initObservers();
    }
    init();

    // expose for debugging
    window.__school = {
        i18next,
        firebaseAvailable,
        currentUser: () => JSON.parse(localStorage.getItem('site_user') || 'null')
    };

})();