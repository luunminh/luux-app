import { RootContainer as MainAppNavigator } from '@containers';
import { ToastProvider } from '@core/common/providers';
import { MainLayout } from '@layout';
import { DayjsProvider, QueryProvider, RouterProvider, ThemeProvider } from '@providers';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './styles.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider>
      <QueryProvider>
        <ToastProvider>
          <ThemeProvider>
            <DayjsProvider>
              <MainLayout>
                <MainAppNavigator />
              </MainLayout>
            </DayjsProvider>
          </ThemeProvider>
        </ToastProvider>
      </QueryProvider>
    </RouterProvider>
  </StrictMode>,
);
