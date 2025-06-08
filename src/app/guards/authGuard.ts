import { CanActivateFn, Router } from "@angular/router";
import { JwtService } from "../services/jwt.service";
import { inject } from "@angular/core";
import { map, Observable } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
    const jwtService = inject(JwtService);
    const router = inject(Router);

    return jwtService.isLoggedIn$.pipe(
        map((isLoggedIn: boolean) => isLoggedIn || router.createUrlTree(['/login']))
    );
}