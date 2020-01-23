import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilisateurService } from './utilisateur.service';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private utilisateurService: UtilisateurService, private route: Router) {
        /* Pour utiliser un service dans unautre service alors on met le decorateur injectable */
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): Observable<boolean> | Promise<boolean> | boolean {
        const currentUSer = this.utilisateurService.currentUserValue;
        if (currentUSer) {
            return true;
        }
        
        this.route.navigate(['/login-user'], {queryParams: {returnUrl: state.url}});
        return false;
        
    }
}
