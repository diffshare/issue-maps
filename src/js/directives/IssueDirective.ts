/// <reference path="../../../typings/tsd.d.ts" />

import IssueService from "../services/IssueService";
export default class IssueDirective implements ng.IDirective {

    restrict:string = "E";
    scope:Object = {
        issues: "=issues",
        filteredIssues: "=filteredIssues",
        selectedIssue: "=selectedIssue"
    };
    bindToController:Boolean = true;
    controller = IssueController;
    controllerAs = "ctrl";
    templateUrl:string = "templates/_issue.html";
}

class IssueController {

    issue = null;

    constructor(private $scope:ng.IScope, private $stateParams:ng.ui.IStateParamsService, private IssueService:IssueService) {
        this.fetchIssue();
    }

    async fetchIssue() {
        this.issue = await this.IssueService.fetchRedmineIssue(this.$stateParams["id"]);
        this.$scope.$apply();
    }
}