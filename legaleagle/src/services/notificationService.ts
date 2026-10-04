export const requestNotificationPermissions = async () => {
    if (!('Notification' in window)) {
        console.warn('This browser does not support desktop notification');
        return false;
    }
    
    if (Notification.permission === 'granted') {
        return true;
    }
    
    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    
    return false;
};

export const scheduleAuditCompletionNotification = (documentName: string, delayMs: number = 3000) => {
    setTimeout(() => {
        if (Notification.permission === 'granted') {
            new Notification('Legal Eagle Audit Complete', {
                body: `The AI Paralegal has finished analyzing "${documentName}". 3 critical risks found.`,
                icon: '/legal_eagle_logo.png'
            });
        }
    }, delayMs);
};
