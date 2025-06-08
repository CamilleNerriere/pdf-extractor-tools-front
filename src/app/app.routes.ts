import { Routes } from '@angular/router';
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
        component: Extractor
    },
    {
        path : 'profil', 
        component : Profil
    }
];
