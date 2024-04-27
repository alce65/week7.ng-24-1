import { Routes } from '@angular/router';
import { loggedGuard } from './guards/logged.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component'),
  },
  {
    path: 'articles',
    canActivate: [loggedGuard],
    loadComponent: () => import('./components/articles/articles.component'),
  },
  { path: '**', redirectTo: 'home' },
];
