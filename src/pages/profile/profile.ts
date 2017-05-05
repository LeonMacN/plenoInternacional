import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  userMail: string;

  /**
   * Valida que exista un usuario con sesión iniciada, en caso de que no se haya iniciado sesión,
   * devuelve al usuario a la sección de inicio de sesión.
   * @param navCtrl 
   * @param navParams 
   * @param auth 
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService) {
    auth.getUser().subscribe(user =>{
      if(!!user){
        this.userMail = user.email;
      } else {
        this.navCtrl.popToRoot();
      }
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
}
