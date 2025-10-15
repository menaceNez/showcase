import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CharSelectComponent } from './components/char-select/char-select.component'
import { authGuard } from './guards/auth.guard';
import { GearstatsComponent } from './components/gearstats/gearstats.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'characters', component: CharSelectComponent, canActivate: [authGuard] },
  { path: 'gearstats', component: GearstatsComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
  // { path: '/smells', componenet: SmellComponenet, outlet: 'smells'} example compnenet for using another router 
];
