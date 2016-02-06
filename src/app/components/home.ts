import {Component} from "angular2/core";
import {ListService} from "../services/list_service";
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from "angular2-google-maps/directives-const";

require('./home.sass');

@Component({
    providers: [ListService],
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
    template: require("./home.slim")
})
export class Home {

    lat: number = 35.685175;
    lng: number = 139.752799;

    constructor() {}

    ngOnInit() {
    }
}
