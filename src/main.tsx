import { ToastProvider } from '@core/common/providers';
import { MainLayout } from '@layout';
import { DayjsProvider, QueryProvider, RouterProvider, ThemeProvider } from '@providers';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './styles.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider>
      <ToastProvider>
        <ThemeProvider>
          <DayjsProvider>
            <QueryProvider>
              <MainLayout />
            </QueryProvider>
          </DayjsProvider>
        </ThemeProvider>
      </ToastProvider>
    </RouterProvider>
  </StrictMode>,
);
