import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { JwtService } from '../services/jwt.service';
import { jwtDecode } from 'jwt-decode';

function isTokenExpired(token: string): boolean {
    const decoded = jwtDecode<any>(token);
    return decoded.exp < Date.now() / 1000;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const jwtService = inject(JwtService);
    const token = jwtService.getToken();

    if (token) {
        try {
            if (isTokenExpired(token)) {
                jwtService.logout();
            } else {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        } catch (error) {
            jwtService.logout();
        }

    }
    return next(req);

}