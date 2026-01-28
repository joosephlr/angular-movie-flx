import { Routes } from '@angular/router';
import { Login } from './pages/not-logged/home/login';
import { Home } from './pages/logged/home/home';
import { Registration } from './pages/not-logged/registration/registration';
import { CreatedMovie } from './pages/logged/created-movie/created-movie';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'novo-filme',
    component: CreatedMovie
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
