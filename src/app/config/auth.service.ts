import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { Usuario } from '../shared/models';
import { auth } from 'firebase';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  authState: any = null;
  token_ik: string;
  mensagem: string;
  userRef: AngularFirestoreCollection<Usuario>
  mostrarLayout = new EventEmitter<boolean>()
    
  constructor(
      private afAuth: AngularFireAuth, 
      private dbf: AngularFirestore,
      private db: AngularFireDatabase, 
      private router: Router) {
      this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
    this.userRef = dbf.collection('/usuarios')
  }
 
  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }
 
  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }
 
  get currentUserName(): string {
    return this.authState['email']
  }
 
  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }
 
  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  createUser(usuario: Usuario): Promise<any>{
     return auth().createUserWithEmailAndPassword(usuario.email,usuario.senha)   
     .catch((error:Error) =>{
            console.log(error)
        })
  }

  ResetPassword(email){
    return auth().sendPasswordResetEmail(email)
  }

  disableUser(){
    
  }

 /*
  signUpWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
       // this.authState = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }
  */

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        
        this.afAuth.auth.currentUser.getIdToken()
          .then((IdToken: string)=>{
            this.token_ik = IdToken
            localStorage.setItem('IdToken', IdToken)
            this.router.navigate(['/admin'])
          })
        
      })
      .catch(error => {
        this.mensagem = error.message
        throw error
      });
  }

  authenticated(): boolean{
        
    if(this.token_ik === undefined && localStorage.getItem('IdToken') !=null){
        this.token_ik = localStorage.getItem('IdToken')
        this.mostrarLayout.emit(true)
    }
    if(this.token_ik === undefined && localStorage.getItem('IdToken') === null){
        this.router.navigate(['/login'])
        this.mostrarLayout.emit(false)
    }
    
    return this.token_ik !== undefined

  }
 
  signOut(): void {
    this.afAuth.auth.signOut().then(() =>{
      localStorage.clear()
      this.token_ik = undefined
      this.router.navigate(['/login'])
    })
  }
}