import { type QueryClientConfig as TQConfig } from '@tanstack/react-query';

export const QueryClientConfig: TQConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
};
