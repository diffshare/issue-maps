/// <reference path="../../../typings/tsd.d.ts" />

import IssueService from "../services/IssueService";
export default class IssueDirective implements ng.IDirective {

    restrict:string = "E";
    scope:Object = {
        editMode: "&editMode",
    };
    bindToController:Boolean = true;
    controller = IssueController;
    controllerAs = "ctrl";
    templateUrl:string = "templates/_issue.html";
}

class IssueController {

    issue = null;
    isEditMode:boolean;
    editMode:Function;

    constructor(private $scope:ng.IScope, private $state:ng.ui.IStateService, private $stateParams:ng.ui.IStateParamsService, private IssueService:IssueService) {
        this.fetchIssue();
        this.isEditMode = !!this.editMode();
        console.log("isEditMode=" + this.isEditMode);
    }

    async fetchIssue() {
        this.issue = await this.IssueService.fetchRedmineIssue(this.$stateParams["id"]);
        this.$scope.$apply();
    }

    clickSubmit() {
        this.$state.go("issue", {id: this.$stateParams["id"]});
    }
}