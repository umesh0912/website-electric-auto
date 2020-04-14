import { createMemoryHistory, createBrowserHistory } from 'history';

declare let __isBrowser__: boolean;

const baseUrl = '/';

export const browserHistory: any = __isBrowser__
  ? createBrowserHistory({ basename: baseUrl })
  : createMemoryHistory();
