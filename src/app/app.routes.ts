import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./pages/layout/layout.routes').then((route) => route.LayoutRoutes) },
    { path: 'home', loadChildren: () => import('./pages/layout/layout.routes').then(route => route.LayoutRoutes) },
    {
        path: '**',
        redirectTo: ''
    }
];
