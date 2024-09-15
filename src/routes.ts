import { lazy } from 'react';
const Books = lazy(() => import('./pages/Books/Books'));
const Shop = lazy(() => import('./pages/Shop/Shop'));
const Authers = lazy(() => import('./pages/Authers/Authers'));
const Stores = lazy(() => import('./pages/Stores/Stores'));

const allRoutes = [
    { path: `bookStore/authers`, exact: true, name: 'Authers', Element: Authers },
    { path: `bookStore/Shop`, exact: true, name: 'Shop', Element: Shop },
    { path: `bookStore/stores`, exact: true, name: 'Stores', Element: Stores },
];

export default allRoutes;