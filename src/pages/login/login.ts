import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {RegisterPage} from "../register/register";
import {Home2Page} from "../home2/home2";
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';

//import { HomescreenPage } from "../homescreen/homescreen";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  public username:String;
  public password:String;
  public error:String;

 

  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,private uid: Uid, private androidPermissions: AndroidPermissions) {
    this.menu.swipeEnable(false);
    this.username="";
    this.password="";
    this.error="";
  }
 
  async getMac() {
     const { hasPermission } = await this.androidPermissions.checkPermission(
       this.androidPermissions.PERMISSION.READ_PHONE_STATE
     );

     if (!hasPermission) {
       const result = await this.androidPermissions.requestPermission(
         this.androidPermissions.PERMISSION.READ_PHONE_STATE
       );

       if (!result.hasPermission) {
         throw new Error('Permissions required');
       }

       // ok, a user gave us permission, we can get him identifiers after restart app
       return;
     }
     // console.log(this.uid.MAC);
    return this.uid.MAC
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

   login()
   { 
    var res;
    this.getMac()
        .then((data) => {
         const alert = this.forgotCtrl.create({
           title: 'Accessing Mac ID',
           subTitle: 'Mac ID: '+data ,
           buttons: [  {
            text: 'Ok',
            role: 'Ok',
            handler: () => {
              this.nav.push(Home2Page);
            }}]
         });
         alert.present();
         
       })
        .catch((err) => {
            console.log("Error occurred :", err);
            this.nav.push(Home2Page);
        });

    
     
   }

   register()
   {
     this.nav.push(RegisterPage);
   }
   



  

}
