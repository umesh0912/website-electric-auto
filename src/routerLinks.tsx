import { fetchHomeData } from './actions/index';
import App from './components/app/App';
import NotFound from './components/notFound/NotFound';
import Make from './components/make/Make';
import Variant from './components/variant/Variant';

export default [
  {
    component: App,
    routeName: 'home',
    path: '/',
    exact: true,
    loadData: fetchHomeData,
  },
  {
    component: Variant,
    routeName: 'variant',
    path: '/:makeId/:modelId',
    exact: true,
  },
  {
    component: Make,
    routeName: 'make',
    path: '/:makeId',
    exact: true,
  },
  {
    component: NotFound,
    routeName: 'pagenotfound',
    path: '*',
  },
];
