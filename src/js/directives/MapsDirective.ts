/// <reference path="../../../typings/index.d.ts" />

export default class MapsDirective implements ng.IDirective {

    restrict:string = "E";
    scope:Object = {
        issues: "=issues",
        selectedIssue: "=selectedIssue",
        latlng: "=latlng"
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
        zoom: 12,
        show: true,
        control: {}
    };
    markersOptions:any = {};

    issues:Array<any> = [];
    selectedIssue:any = null;
    clickedMarker:any = {
        id: "clickedMaker",
        coords: null
    };
    latlng:any;
    private editable:boolean = false;

    markersEvents = {
        click: (marker, eventName, model, args)=> {
            this.issues.forEach((issue:any)=> {
                issue.show = false;
            });
            model.show = true;
            this.selectedIssue = model;
        },
        dragend: (marker, eventName, model, args)=> {
            this.latlng = args[0].latLng.lat() + "," + args[0].latLng.lng();
        }
    };

    searchEvents = {
        places_changed: (searchBox:any)=> {
            console.log(searchBox.getPlaces());
            var location:any = searchBox.getPlaces()[0].geometry.location;
            //this.map.control.refresh();

            //this.selectedIssue.latitude = location.lat();
            //this.selectedIssue.longitude = location.lng();
            this.map.center = {latitude: location.lat(), longitude: location.lng()};
            this.map.zoom = 15;
        }
    };

    mapEvents = {
        click: (e:any, e2:any, e3:any)=> {
            console.log(e3);
            this.clickedMarker.coords = {
                latitude: e3[0].latLng.J,
                longitude: e3[0].latLng.M
            };
            console.log(this.clickedMarker.coords);
            this.$scope.$apply();
        }
    };

    constructor(private $scope:ng.IScope, private $rootScope:ng.IRootScopeService, private $state:ng.ui.IStateService, private $timeout:ng.ITimeoutService) {
        $scope.$watch(() => this.selectedIssue, (issue)=> this.updateSelectedIssue());
        $scope.$watch(() => this.editable, (issue)=> this.changeEditable());

        $rootScope.$on("$stateChangeSuccess", ()=> this.updateEditable());
        this.updateEditable();
    }

    updateSelectedIssue() {
        if (!this.selectedIssue) return;
        this.gotoIssue(this.selectedIssue);
    }

    gotoIssue(issue) {
        if (!issue) return;
        this.map.center.latitude = issue.latitude;
        this.map.center.longitude = issue.longitude;
    }

    private changeEditable():void {
        console.log("editable: " + this.editable);
        this.markersOptions.draggable = this.editable;
        console.log(this.map.control);
        this.map.show = false;
        this.$timeout(()=> {
            this.map.show = true;
        });
    }

    private updateEditable():void {
        this.editable = !!(this.$state.includes("issues.new") || this.$state.includes("issues.edit"));
    }
}
