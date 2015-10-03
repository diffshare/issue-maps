/// <reference path="../../../typings/tsd.d.ts" />

export default class MapsDirective implements ng.IDirective {

    restrict:string = "E";
    scope:Object = {
        issues: "=issues"
    };
    bindToController:Boolean = true;
    controller = MapsController;
    controllerAs = "ctrl";
    templateUrl:string = "templates/_maps.html";
}

class MapsController {

    map:Object = {
        center: {
            latitude: 35.68519569653298,
            longitude: 139.75278877116398
        },
        zoom: 12
    };

    issues:Array<any>;

    constructor() {
    }
}
