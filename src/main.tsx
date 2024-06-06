import { RootContainer as MainAppNavigator } from '@containers';
import { ToastProvider } from '@core/common/providers';
import { MainLayout } from '@layout';
import { DayjsProvider, QueryProvider, RouterProvider, ThemeProvider } from '@providers';
import ReactDOM from 'react-dom/client';

import { ProSidebarProvider } from 'react-pro-sidebar';
import './styles.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider>
    <QueryProvider>
      <ProSidebarProvider>
        <ToastProvider>
          <ThemeProvider>
            <DayjsProvider>
              <MainLayout>
                <MainAppNavigator />
              </MainLayout>
            </DayjsProvider>
          </ThemeProvider>
        </ToastProvider>
      </ProSidebarProvider>
    </QueryProvider>
  </RouterProvider>,
);
