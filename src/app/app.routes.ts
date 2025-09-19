import { Routes, CanActivateFn } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { authGuard } from './guards/auth-guard';
import { Notes } from './components/notes/notes';
import { Home } from './components/home/home';
import { MyPage } from './components/my-page/my-page';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'notes', component: Notes },
  { path: 'home', component: Home },
  {path: 'my-page', component: MyPage},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
