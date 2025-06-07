import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Connect } from './connect/connect';
import { Extractor } from './extractor/extractor';

export const routes: Routes = [
    {
        path: '', 
        component: Home
    },
    {
        path : 'connect',
        component: Connect
    },
    {
        path : 'extract', 
        component: Extractor
    }
];
