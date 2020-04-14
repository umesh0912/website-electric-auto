import importComponent from './AsyncComponent';

export const Foo = importComponent(() =>
  import('../components/notFound/NotFound').then((module) => module.default)
);
