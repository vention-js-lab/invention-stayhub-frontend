import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { appTheme } from '#/styles/theme';
import '#/styles/root.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QueryClientConfig } from '#/configs/query-client.config';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { router } from '#/routes';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { store } from './store/store';

import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const queryClient = new QueryClient(QueryClientConfig);

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={appTheme}>
            <SnackbarProvider maxSnack={3}>
              <RouterProvider router={router} />
            </SnackbarProvider>
            <CssBaseline />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
