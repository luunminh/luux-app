import { ErrorService, timeConstants } from '@core/common';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: timeConstants.ONE_HOUR,
      onError(err: unknown | Error) {
        if ((err as Error).message === ErrorService.MESSAGES.forbidden) {
          return ErrorService.handler({
            message: 'You do not have permission to access this data.',
          });
        }
        ErrorService.handler(err);
      },
    },
    mutations: {
      onError(err: unknown | Error) {
        if ((err as Error).message === ErrorService.MESSAGES.forbidden) {
          return ErrorService.handler({
            message: 'You do not have permission to trigger this action.',
          });
        }
        // ErrorService.handler(err);
      },
    },
  },
});
type Props = PropsWithChildren & {};

const QueryProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
    </QueryClientProvider>
  );
};

export default QueryProvider;
