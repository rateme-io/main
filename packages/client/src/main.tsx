import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import { Provider } from './app/provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
);
