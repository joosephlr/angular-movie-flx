import { Routes } from '@angular/router';
import { Login } from './pages/not-logged/home/login';
import { Home } from './pages/logged/home/home';
import { Registration } from './pages/not-logged/registration/registration';
import { CreatedMovie } from './pages/logged/created-movie/created-movie';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivate: [authGuard]
  },
  {
    path: 'novo-filme',
    component: CreatedMovie,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'cadastre-se',
    component: Registration
  }
];
