/// <reference path="../../../typings/tsd.d.ts" />

export default class MapsDirective implements ng.IDirective {

    restrict:string = "E";
    scope:Object = {
        issues: "=issues",
        selectedIssue: "=selectedIssue"
    };
    bindToController:Boolean = true;
    controller = MapsController;
    controllerAs = "ctrl";
    templateUrl:string = "templates/_maps.html";
}

class MapsController {

    map:any = {
        center: {
            latitude: 35.68519569653298,
            longitude: 139.75278877116398
        },
        zoom: 12
    };

    issues:Array<any>;
    selectedIssue:any;

    markersEvents = {
        click: (marker, eventName, model, args)=> {
            this.issues.forEach((issue)=> {
                issue.show = false;
            });
            model.show = true
        }
    };

    constructor(private $scope:ng.IScope) {
        $scope.$watch(() => this.selectedIssue, (issue)=> this.gotoIssue(issue));
    }

    gotoIssue(issue) {
        if (!issue) return;
        this.map.center.latitude = issue.latitude;
        this.map.center.longitude = issue.longitude;
    }
}
