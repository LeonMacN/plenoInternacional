import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Profile } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userObject = { user:'', password:''};
  showLogOut: boolean = false;

  /**
   * Constructor de la clase. Valida si el usuario está logueado, muestra la opción para cerrar sesión.
   * @param navCtrl 
   * @param auth 
   * @param alertCtrl 
   */
  constructor(public navCtrl: NavController, private auth: AuthService, public alertCtrl: AlertController) {
    auth.getUser().subscribe(user =>{
      if(!!user){
        this.showLogOut = true;
      }
    });
  }

  /**
   * Registro de nuevos usuarios. 
   * En caso de resultar exitoso el registro, inicia sesión directamente y accede a la página de perfil.
   * En caso de error, muestra un mensaje con el error.
   */
  public register(){
    this.auth.register(this.userObject).then(success=>{
      this.navCtrl.push(Profile);
    }).catch(Error=>{
      this.handleError(Error);
    });
  }

  /**
   * Inicio de sesión. 
   * En caso de resultar exitoso inicia sesión y accede a la página de perfil.
   * En caso de error, muestra un mensaje con el error.
   */
  public login(){
    this.auth.logIn(this.userObject).then(success=>{
      this.navCtrl.push(Profile);
    }).catch(Error=>{
      this.handleError(Error);
    });
  }

  /**
   * Reinicio de contraseña. 
   * En caso de resultar exitoso, muestra un mensaje notificando el envío de correo.
   */
  public reset(){
    this.auth.resetPassword(this.userObject).then(success=>{
      let alert = this.alertCtrl.create({title:'Notificación', subTitle:'Email enviado!', buttons:['Ok']});
      alert.present();
    }).catch(Error=>{
      this.handleError(Error);
    });
  }

  /**
   * Cerrar sesión. 
   * En caso de resultar exitoso, recarga la página actual.
   */
  public logOut(){
    this.auth.logOut().then(success=>{
      location.reload();
    });
  }

  /**
   * Función para el manejo de errores.
   * @param Error Objeto Javascript con la información concerniente al error.
   */
  public handleError(Error){
    let alert = this.alertCtrl.create({title:'Error', subTitle:Error.message, buttons:['Ok']});
    alert.present();
  }

}
