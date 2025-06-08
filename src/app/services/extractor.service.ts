import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: 'root',
})
export class ExtractorService {
    private http = inject(HttpClient);
    private url = environment.apiUrl + "/extract";

    extract(mode: 'citations' | 'annotations', formData: FormData) {
        const endpoint = `${this.url}/${mode}`;
        return this.http.post(endpoint, formData, {
            responseType: 'blob'
        });
    }
}