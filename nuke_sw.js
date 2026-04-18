if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            registration.unregister();
        }
        console.log('All Service Workers unregistered');
        window.location.reload(true);
    });
}
