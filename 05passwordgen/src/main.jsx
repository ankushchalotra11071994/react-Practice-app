import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
 // main.jsx / index.jsx
import ErrorBoundary from './components/ErrorBoundary';
import { registerGlobalHandlers, logToService } from './lib/errorReporting';

registerGlobalHandlers();

createRoot(document.getElementById('root')).render(
  <ErrorBoundary onError={(err, info) => logToService(err, info)}>
    <App />
  </ErrorBoundary>
);