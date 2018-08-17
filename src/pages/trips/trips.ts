import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {TripDetailPage} from "../trip-detail/trip-detail";

@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  // list of trips
  public trips: any;
  public city:string;
  public quantity:any;

  constructor(public nav: NavController, public tripService: TripService,public navparams:NavParams) {
    // set sample data
    this.trips = tripService.getAll();
    this.city= this.navparams.get("city")
    if(this.city!=null)
    {
      this.trips=tripService.getPubs(this.city);
    }
    this.quantity=this.trips.length;
  }

  // view trip detail
  viewDetail(id) {
    var obj;
    for(var i in this.trips)
      {if(this.trips[i]['id']==id)
          obj=this.trips[i];    
  }

  console.log(obj['name']+" is the name of the pub");
    this.nav.push(TripDetailPage, {id: id,name:obj['name']});
  }
}
