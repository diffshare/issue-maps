/// <reference path="../../../typings/tsd.d.ts" />

import IssueService from "../services/IssueService"

export default class RootDirective implements ng.IDirective {

    restrict:string = "E";
    scope:Object = {};
    bindToController:Boolean = true;
    controller = RootController;
    controllerAs = "ctrl";
    templateUrl:string = "templates/_root.html";
}

class RootController {

    filteredIssues:Array<any> = [];

    constructor(private $scope:ng.IScope, private IssueService:IssueService, private $state:ng.ui.IStateService) {
    }

}
