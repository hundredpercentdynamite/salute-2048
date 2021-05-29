import React from 'react';
import ReactDOM from 'react-dom';
import { DeviceThemeProvider } from '@sberdevices/plasma-ui';
import { lightJoy } from '@sberdevices/plasma-tokens/themes/lightJoy';
import App from './App';

ReactDOM.render(
  <>
    <DeviceThemeProvider theme={lightJoy}>
      <App />
    </DeviceThemeProvider>
  </>,
  document.getElementById('game'),
);

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    const pathname = window.location.pathname.replace(/\/$/g, '');
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(`${pathname}/service-worker.js`)
        .then((registration) => {
          // eslint-disable-next-line no-console
          console.log('SW registered:', registration);
        })
        // eslint-disable-next-line no-console
        .catch((e) => console.error('SW registration failed', e));
    });
  }
}
