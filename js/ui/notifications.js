/**
 * Notifications System
 * Beautiful toast notifications
 */

// Notification types and their styles
const notificationStyles = {
    success: {
        icon: '✅',
        color: '#4CAF50',
        bgColor: '#E8F5E9'
    },
    error: {
        icon: '❌',
        color: '#f44336',
        bgColor: '#FFEBEE'
    },
    warning: {
        icon: '⚠️',
        color: '#FF9800',
        bgColor: '#FFF3E0'
    },
    info: {
        icon: 'ℹ️',
        color: '#2196F3',
        bgColor: '#E3F2FD'
    }
};

// Active notifications
const activeNotifications = [];

/**
 * Show notification
 * @param {string} message - Notification message
 * @param {string} type - Type: 'success', 'error', 'warning', 'info'
 * @param {number} duration - Duration in ms (0 = permanent)
 */
export function showNotification(message, type = 'success', duration = 3000) {
    const style = notificationStyles[type] || notificationStyles.info;

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.setAttribute('data-type', type);

    notification.innerHTML = `
        <div class="notification-icon">${style.icon}</div>
        <div class="notification-content">
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" aria-label="Close">×</button>
    `;

    // Apply styles
    notification.style.cssText = `
        position: fixed;
        top: ${20 + (activeNotifications.length * 80)}px;
        right: 20px;
        background: ${style.bgColor};
        color: ${style.color};
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        max-width: 400px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid ${style.color};
        font-family: 'Segoe UI', Tahoma, sans-serif;
    `;

    // Add to page
    document.body.appendChild(notification);
    activeNotifications.push(notification);

    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });

    // Auto-remove after duration
    if (duration > 0) {
        setTimeout(() => {
            removeNotification(notification);
        }, duration);
    }

    return notification;
}

/**
 * Remove notification
 * @param {HTMLElement} notification - Notification element
 */
function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease';

    setTimeout(() => {
        notification.remove();

        // Remove from active list
        const index = activeNotifications.indexOf(notification);
        if (index > -1) {
            activeNotifications.splice(index, 1);
        }

        // Reposition remaining notifications
        repositionNotifications();
    }, 300);
}

/**
 * Reposition all active notifications
 */
function repositionNotifications() {
    activeNotifications.forEach((notification, index) => {
        notification.style.top = `${20 + (index * 80)}px`;
    });
}

/**
 * Show success notification
 * @param {string} message - Success message
 * @param {number} duration - Duration in ms
 */
export function showSuccess(message, duration = 3000) {
    return showNotification(message, 'success', duration);
}

/**
 * Show error notification
 * @param {string} message - Error message
 * @param {number} duration - Duration in ms
 */
export function showError(message, duration = 4000) {
    return showNotification(message, 'error', duration);
}

/**
 * Show warning notification
 * @param {string} message - Warning message
 * @param {number} duration - Duration in ms
 */
export function showWarning(message, duration = 3500) {
    return showNotification(message, 'warning', duration);
}

/**
 * Show info notification
 * @param {string} message - Info message
 * @param {number} duration - Duration in ms
 */
export function showInfo(message, duration = 3000) {
    return showNotification(message, 'info', duration);
}

/**
 * Clear all notifications
 */
export function clearAllNotifications() {
    activeNotifications.forEach(notification => {
        removeNotification(notification);
    });
}

/**
 * Initialize notification system
 */
export function initNotifications() {
    // Add notification styles to head
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        .notification {
            transition: top 0.3s ease;
        }
        
        .notification-icon {
            font-size: 24px;
            flex-shrink: 0;
        }
        
        .notification-content {
            flex: 1;
        }
        
        .notification-message {
            font-size: 15px;
            font-weight: 500;
            line-height: 1.4;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 24px;
            color: inherit;
            cursor: pointer;
            opacity: 0.6;
            transition: opacity 0.2s;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        @media (max-width: 480px) {
            .notification {
                right: 10px;
                left: 10px;
                min-width: auto;
                max-width: none;
            }
        }
    `;

    document.head.appendChild(style);
    console.log('✅ Notification system initialized');
}

// Export for external use
export default {
    show: showNotification,
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    clear: clearAllNotifications,
    init: initNotifications
};