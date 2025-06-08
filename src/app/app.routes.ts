import { Routes } from '@angular/router';
import { authGuard } from './guards/authGuard';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Extractor } from './components/extractor/extractor';
import { Profil } from './components/profil/profil';

export const routes: Routes = [
    {
        path: '', 
        component: Home
    },
    {
        path : 'login',
        component: Login
    },
    {
        path : 'extract', 
        component: Extractor,
        canActivate: [authGuard]
    },
    {
        path : 'profil', 
        component : Profil,
        canActivate: [authGuard]
    }
];
