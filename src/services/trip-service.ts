import {Injectable} from "@angular/core";
import {TRIPS} from "./mock-trips";

@Injectable()
export class TripService {
  private trips: any;

  constructor() {
    this.trips = TRIPS;
  }

  getAll() {
    return this.trips;
  }

  getItem(id) {
    for (var i = 0; i < this.trips.length; i++) {
      if (this.trips[i].id === parseInt(id)) {
        return this.trips[i];
      }
    }
    return null;
  }

  remove(item) {
    this.trips.splice(this.trips.indexOf(item), 1);
  }

  getPubs(city:string)
  {
    var citypubs=[];
    console.log("checkking for city"+city);
    for(var index in this.trips)
      {
        console.log("index val"+this.trips[index][city]);
        if(this.trips[index]["city"]==city)
          {citypubs.push(this.trips[index]);
          console.log(citypubs);}
      }
      return citypubs;
  }
}
