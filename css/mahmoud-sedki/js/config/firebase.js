/**
 * Firebase Configuration Module
 * Centralized Firebase setup and initialization
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
    getAuth,
    connectAuthEmulator
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDs1B9r21Ir7y91nTQ7QTMplq_bcH1Bfzk",
    authDomain: "school-project-91aee.firebaseapp.com",
    projectId: "school-project-91aee",
    storageBucket: "school-project-91aee.firebasestorage.app",
    messagingSenderId: "634655281566",
    appId: "1:634655281566:web:a7b07ebce526d391c8468f"
};

// App State
let app = null;
let auth = null;
let isInitialized = false;

/**
 * Initialize Firebase
 * @returns {Promise<boolean>} Success status
 */
export async function initializeFirebase() {
    if (isInitialized) {
        return true;
    }

    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);

        // للتطوير المحلي (اختياري)
        // if (location.hostname === 'localhost') {
        //     connectAuthEmulator(auth, "http://localhost:9099");
        // }

        isInitialized = true;
        console.log('✅ Firebase initialized successfully');
        return true;

    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
        return false;
    }
}

/**
 * Get Firebase Auth instance
 * @returns {Auth|null}
 */
export function getFirebaseAuth() {
    if (!isInitialized) {
        console.warn('⚠️ Firebase not initialized. Call initializeFirebase() first.');
        return null;
    }
    return auth;
}

/**
 * Check if Firebase is ready
 * @returns {boolean}
 */
export function isFirebaseReady() {
    return isInitialized;
}

/**
 * Get Firebase App instance
 * @returns {FirebaseApp|null}
 */
export function getFirebaseApp() {
    return app;
}

// Auto-initialize on import (optional)
// initializeFirebase();

export { auth };