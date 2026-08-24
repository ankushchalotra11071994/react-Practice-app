export function logToService(payload) {
  console.error('[ErrorReport]', payload);
  // Later: Sentry.captureException(...) or your API
}

export function registerGlobalHandlers() {
  window.addEventListener('error', (event) => {
    logToService({
      type: 'uncaught',
      message: event.message,
      stack: event.error?.stack,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    logToService({
      type: 'u ',
      message: event.reason?.message ?? String(event.reason),
      stack: event.reason?.stack,
    });
  });
}