import { Routes } from '@angular/router';
import { AutologinComponent } from './pages/autologin/autologin.component';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./pages/autologin/autologin.routes').then((route) => route.AutoLoginRoutes) },
    {
        path: 'autologin/:token',
        component: AutologinComponent
    },
    { path: 'home', loadChildren: () => import('./pages/layout/layout.routes').then(route => route.LayoutRoutes) },
    {
        path: '**',
        redirectTo: ''
    }
];
