export default function LocalServiceWorkerRegister() {
    const path = `workers/service-worker.js`;
    if ('serviceWorker' in navigator && window.isSecureContext && process.env.NODE_ENV !== 'production') {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register(path, {scope:"http://localhost:8080/workers/"}).then(registration => {
          console.log('Service worker registered');
        });
      });
    }
  }