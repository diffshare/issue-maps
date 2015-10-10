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

    issues = [];

    constructor(private $scope:ng.IScope, private IssueService:IssueService) {
        this.updateIssues();
    }

    async updateIssues() {
        // XXX tryによるエラーハンドリング
        try {
            this.issues = await this.IssueService.fetchIssues();
            this.$scope.$apply();
        } catch (e) {
            console.error(e.message);
            //this.IssueService.inputRedmineKey();
        }
    }
}
