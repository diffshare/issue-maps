/// <reference path="../../../typings/tsd.d.ts" />

export default class IssuesListDirective implements ng.IDirective {

    restrict:string = "E";
    scope:Object = {
        issues: "=issues"
    };
    bindToController:Boolean = true;
    controller = IssuesListController;
    controllerAs = "ctrl";
    templateUrl:string = "templates/_issues_list.html";
}

class IssuesListController {

    issues:Array<any>;

    constructor(private $scope:ng.IScope) {
        console.log(`issues: ${this.issues}`);
    }
}
