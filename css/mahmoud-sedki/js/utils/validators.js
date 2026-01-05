/**
 * Validation Utilities
 * Input validation functions
 */

import { REGEX } from '../config/constants.js';

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export function isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    return REGEX.email.test(email.trim());
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @param {number} minLength - Minimum length
 * @returns {Object} Validation result
 */
export function validatePassword(password, minLength = 6) {
    const result = {
        valid: false,
        errors: [],
        strength: 'weak'
    };

    if (!password) {
        result.errors.push('كلمة المرور مطلوبة');
        return result;
    }

    if (password.length < minLength) {
        result.errors.push(`كلمة المرور يجب أن تكون ${minLength} أحرف على الأقل`);
    }

    // Check strength
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) result.strength = 'weak';
    else if (strength <= 3) result.strength = 'medium';
    else result.strength = 'strong';

    result.valid = result.errors.length === 0;
    return result;
}

/**
 * Validate phone number
 * @param {string} phone - Phone to validate
 * @returns {boolean} True if valid
 */
export function isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    return REGEX.phone.test(phone.trim());
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export function isValidURL(url) {
    if (!url || typeof url !== 'string') return false;
    return REGEX.url.test(url.trim());
}

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} True if valid
 */
export function isRequired(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
}

/**
 * Validate string length
 * @param {string} str - String to validate
 * @param {number} min - Minimum length
 * @param {number} max - Maximum length
 * @returns {boolean} True if valid
 */
export function isValidLength(str, min = 0, max = Infinity) {
    if (typeof str !== 'string') return false;
    const length = str.trim().length;
    return length >= min && length <= max;
}

/**
 * Validate number range
 * @param {number} num - Number to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} True if valid
 */
export function isInRange(num, min = -Infinity, max = Infinity) {
    if (typeof num !== 'number' || isNaN(num)) return false;
    return num >= min && num <= max;
}

/**
 * Validate Arabic text
 * @param {string} text - Text to validate
 * @returns {boolean} True if contains Arabic
 */
export function isArabic(text) {
    if (!text || typeof text !== 'string') return false;
    return /[\u0600-\u06FF]/.test(text);
}

/**
 * Validate English text
 * @param {string} text - Text to validate
 * @returns {boolean} True if contains English
 */
export function isEnglish(text) {
    if (!text || typeof text !== 'string') return false;
    return /[a-zA-Z]/.test(text);
}

/**
 * Validate credit card number (Luhn algorithm)
 * @param {string} cardNumber - Card number to validate
 * @returns {boolean} True if valid
 */
export function isValidCreditCard(cardNumber) {
    if (!cardNumber || typeof cardNumber !== 'string') return false;

    const cleaned = cardNumber.replace(/\s/g, '');
    if (!/^\d+$/.test(cleaned)) return false;

    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i]);

        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}

/**
 * Validate date format (YYYY-MM-DD)
 * @param {string} date - Date to validate
 * @returns {boolean} True if valid
 */
export function isValidDate(date) {
    if (!date || typeof date !== 'string') return false;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) return false;

    const d = new Date(date);
    return d instanceof Date && !isNaN(d);
}

/**
 * Validate age (18+)
 * @param {string|Date} birthDate - Birth date
 * @param {number} minAge - Minimum age
 * @returns {boolean} True if valid
 */
export function isValidAge(birthDate, minAge = 18) {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        return (age - 1) >= minAge;
    }

    return age >= minAge;
}

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSize - Max size in bytes
 * @returns {boolean} True if valid
 */
export function isValidFileSize(file, maxSize) {
    if (!file || !file.size) return false;
    return file.size <= maxSize;
}

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {string[]} allowedTypes - Allowed MIME types
 * @returns {boolean} True if valid
 */
export function isValidFileType(file, allowedTypes) {
    if (!file || !file.type) return false;
    return allowedTypes.includes(file.type);
}

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {Object} Validation result
 */
export function validateUsername(username) {
    const result = {
        valid: false,
        errors: []
    };

    if (!username) {
        result.errors.push('اسم المستخدم مطلوب');
        return result;
    }

    if (username.length < 3) {
        result.errors.push('اسم المستخدم يجب أن يكون 3 أحرف على الأقل');
    }

    if (username.length > 20) {
        result.errors.push('اسم المستخدم يجب ألا يتجاوز 20 حرفاً');
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        result.errors.push('اسم المستخدم يجب أن يحتوي على حروف وأرقام فقط');
    }

    result.valid = result.errors.length === 0;
    return result;
}

/**
 * Validate form data
 * @param {Object} data - Form data
 * @param {Object} rules - Validation rules
 * @returns {Object} Validation result
 */
export function validateForm(data, rules) {
    const errors = {};
    let isValid = true;

    for (let field in rules) {
        const value = data[field];
        const fieldRules = rules[field];

        if (fieldRules.required && !isRequired(value)) {
            errors[field] = `${field} مطلوب`;
            isValid = false;
            continue;
        }

        if (fieldRules.email && !isValidEmail(value)) {
            errors[field] = 'البريد الإلكتروني غير صالح';
            isValid = false;
        }

        if (fieldRules.minLength && !isValidLength(value, fieldRules.minLength)) {
            errors[field] = `الحد الأدنى ${fieldRules.minLength} أحرف`;
            isValid = false;
        }

        if (fieldRules.maxLength && !isValidLength(value, 0, fieldRules.maxLength)) {
            errors[field] = `الحد الأقصى ${fieldRules.maxLength} حرفاً`;
            isValid = false;
        }

        if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
            errors[field] = fieldRules.message || 'صيغة غير صالحة';
            isValid = false;
        }
    }

    return { isValid, errors };
}

/**
 * Sanitize HTML string
 * @param {string} html - HTML to sanitize
 * @returns {string} Sanitized HTML
 */
export function sanitizeHTML(html) {
    const temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
export function escapeHTML(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;'
    };
    return text.replace(/[&<>"'/]/g, m => map[m]);
}

// Export all as default object
export default {
    isValidEmail,
    validatePassword,
    isValidPhone,
    isValidURL,
    isRequired,
    isValidLength,
    isInRange,
    isArabic,
    isEnglish,
    isValidCreditCard,
    isValidDate,
    isValidAge,
    isValidFileSize,
    isValidFileType,
    validateUsername,
    validateForm,
    sanitizeHTML,
    escapeHTML
};