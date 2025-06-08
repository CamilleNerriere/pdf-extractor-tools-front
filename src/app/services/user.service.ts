import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import type { UserUpdate } from "../models/userUpdate";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private http = inject(HttpClient);
    private url = environment.apiUrl + "/user";

    getUserInfos() : Observable<any>{
        return this.http.get(`${this.url}/me`);
    }

    updateUserInfos(userInfos : UserUpdate) {
                const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.put<UserUpdate>(`${this.url}/update`, userInfos, httpOptions);
    }
}