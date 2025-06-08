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

    login(user: UserLogin): Observable<{ token: string }> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<{token : string}>(`${this.url}/login`, user, httpOptions,);
    }

    logout(){
        this.jwtService.logout();
    }

}
