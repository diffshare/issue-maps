import {Component} from "angular2/core";
import {RedmineService} from "../services/redmine_service";
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from "angular2-google-maps/directives-const";
import {MarkerManager} from "angular2-google-maps/services/marker-manager";
import {GoogleMapsAPIWrapper} from "angular2-google-maps/services/google-maps-api-wrapper";

require('./home.sass');

@Component({
    providers: [RedmineService],
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
    template: require("./home.slim")
})
export class Home {

    lat: number = 35.685175;
    lng: number = 139.752799;
    markers:any[] = [];

    constructor(private redmineService:RedmineService) {}

    ngOnInit() {
        this.redmineService.fetch().subscribe((result:any) => {
            //console.log(result);
            this.markers = result.issues;
        }, (error:any)=> {
            console.error(error);
            RedmineService.clearAPIKey();
        })
    }
}
