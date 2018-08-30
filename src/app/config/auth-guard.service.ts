import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate{

    constructor(private authservice: AuthService){}

    public canActivate(): boolean{
        return this.authservice.authenticated()   
    }

}