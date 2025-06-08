import { environment } from "../../environments/environment.development";
import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import type { UserLogin } from "../models/userLogin";
import { JwtService } from "./jwt.service";


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private jwtService = inject(JwtService);
    private url = environment.apiUrl + "/auth";

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    login(user: UserLogin): Observable<any> {
        return this.http.post<string>(`${this.url}/login`, user, this.httpOptions,);
    }

    setJwt(jwt : string) : void {
        this.jwtService.setToken(jwt);
    }
}
