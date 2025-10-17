import { Routes, CanActivateFn } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { authGuard } from './guards/auth-guard';
import { Notes } from './components/notes/notes';
import { Home } from './components/home/home';
import { MyPage } from './components/my-page/my-page';
import { AnalyticsDashboard } from './components/analytics-dashboard/analytics-dashboard';
import { SignalsPortfolio } from './components/signals-portfolio/signals-portfolio';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'notes', component: Notes, canActivate: [authGuard] },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'my-page', component: MyPage, canActivate: [authGuard]},
  { path: 'analytics-dashboard', component: AnalyticsDashboard, canActivate: [authGuard] },
  { path: 'signals-portfolio', component: SignalsPortfolio, canActivate: [authGuard] },
  { path: '', redirectTo: 'my-page', pathMatch: 'full' },
  { path: '**', redirectTo: 'my-page' }
];
