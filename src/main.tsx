import { ToastProvider } from '@core/common/providers';
import { DayjsProvider, QueryProvider, ThemeProvider } from '@providers';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './styles.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <ThemeProvider>
        <DayjsProvider>
          <QueryProvider>
            <App />
          </QueryProvider>
        </DayjsProvider>
      </ThemeProvider>
    </ToastProvider>
  </StrictMode>,
);
