import { environment } from "../../environments/environment.development";
import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class JwtService {
    private readonly TOKEN_KEY = 'token';
    private http = inject(HttpClient);
    private url = environment.apiUrl + "/auth";
    private userSubject = new BehaviorSubject<string | null>(null);

    //get token when start
    constructor() {
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (token) {
            this.userSubject.next(token);
        }
    }

    get isLoggedIn$(): Observable<boolean> {
        return this.userSubject.asObservable().pipe(map((token: any) => !!token));
    }

    get currentToken$(): Observable<string | null> {
        return this.userSubject.asObservable();
    }

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    clearToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    logout() : void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.userSubject.next(null);
    }

    validateJwt(jwt: string): Observable<{ valid: boolean }> {
        const httpOptions = {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }
        return this.http.get<{ valid: boolean }>(`${this.url}/validateJwt`, httpOptions);
    }

}
