import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Storage} from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';


// import {SearchCarsPage} from "../search-cars/search-cars";

@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html'
})

export class SearchLocationPage {
  public fromto: any;
  // places
  public places = {
    nearby: [
      {
        id: 1,
        name: "Current Location"
      },
      {
        id: 2,
        name: "Kormangala,Bangalore"
      },
      {
        id: 3,
        name: "Jayanagar,Bangalore"
      },
      {
        id: 4,
        name: "Chennai"
      },
      {
        id: 5,
        name: "Jayanagar"
      },
      {
        id: 6,
        name: "Same as pickup"
      }
    ],
    recent: [
      
    ]
  };

  constructor(public alertCtrl:AlertController ,private storage: Storage, public nav: NavController, public navParams: NavParams, public geolocation:Geolocation) {
    this.fromto = this.navParams.data;
  }

  // search by item
  searchBy(item) {

    var latitude,longitude;
    if (this.fromto === 'from') {
      this.storage.set('pickup', item.name);
    }

    if (this.fromto === 'to') {
      this.storage.set('dropOff', item.name);
    }
//if geolocation required
    if(item["id"]==1)
      {
        this.geolocation.getCurrentPosition().then((resp) => {
          console.log("location found");
          console.log(latitude);
          latitude= resp.coords.latitude
          longitude=resp.coords.longitude
          
          let alert = this.alertCtrl.create({
            title: 'Location found',
            subTitle: 'Longitude :'+longitude+", Latitude :"+latitude,
            buttons: [{
              text: 'Accept Location',
              role: 'Accept',
              handler: () => {
                if (this.fromto === 'from') {
                  this.storage.set('pickup',latitude+","+longitude);
                }
            
                if (this.fromto === 'to') {
                  this.storage.set('dropOff', latitude+","+longitude);
                }
                this.nav.pop();
              }
            }]
          });
          alert.present();
          
         }).catch((error) => {
          let alert1 = this.alertCtrl.create({
            title: 'Location error',
            subTitle: "Please check your gps and try again",
            buttons: [{
              text: 'Close',
              role: 'Close',
              handler: () => {
                
                this.nav.pop();
              }
            }]
          });
          alert1.present();
         });
         
         let watch = this.geolocation.watchPosition();
         watch.subscribe((data) => {
          // data can be a set of coordinates, or an error (if an error occurred).
          // data.coords.latitude
          console.log(data.coords.latitude);
          // data.coords.longitude
         });
      }
    // this.nav.push(SearchCarsPage);
    else{
      this.nav.pop();
      
    }
  }
}
