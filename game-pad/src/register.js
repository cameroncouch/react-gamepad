export default function LocalServiceWorkerRegister() {
    const path = `public/workers/service-worker.js`;
    if ('serviceWorker' in navigator && window.isSecureContext && process.env.NODE_ENV !== 'production') {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register(path).then(registration => {
          console.log('Service worker registered');
        });
      });
    }
  }