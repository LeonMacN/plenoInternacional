import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  private currentUser: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.currentUser = afAuth.authState;
  }

  /**
   * Esta función permite la creación de nuevos usuarios.
   * @param userObject Objeto Javascript con la información correspondiente al usuario (mail y contraseña)
   */
  public register(userObject){
      return this.afAuth.auth.createUserWithEmailAndPassword(userObject.user, userObject.password);
  }

/**
 * Esta función permite obtener la información del usuario actual
 */
  public getUser(){
    return this.currentUser;
  }

  /**
   * Esta función permite realizar el inicio de sesión en la aplicación.
   * @param userObject Objeto Javascript con la información correspondiente al usuario (mail y contraseña)
   */
  public logIn(userObject){
    return this.afAuth.auth.signInWithEmailAndPassword(userObject.user, userObject.password);
  }

  /**
   * Esta función permite cerrar la sesión del usuario.
   */
  public logOut(){
    return this.afAuth.auth.signOut();
  }

  /**
   * Esta función permite resetear la contraseña a través de firebase. Envía un mail solicitando la nueva 
   * contraseña.
   * @param userObject Objeto Javascript con la información correspondiente al usuario (mail)
   */
  public resetPassword(userObject){
    return this.afAuth.auth.sendPasswordResetEmail(userObject.user);
  }

}
