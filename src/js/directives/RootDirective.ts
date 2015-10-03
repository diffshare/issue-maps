/// <reference path="../../../typings/tsd.d.ts" />

import IssueAPI from "../api/IssueAPI"

export default class RootDirective implements ng.IDirective {

    restrict:string = "E";
    scope:Object = {};
    bindToController:Boolean = true;
    controller = RootController;
    controllerAs = "ctrl";
    template:string = "<div ui-view></div>";
}

class RootController {

    issues = [];

    constructor(private IssueAPI:IssueAPI) {
        this.updateIssues();
    }

    async updateIssues() {
        // XXX tryによるエラーハンドリング
        this.issues = await this.IssueAPI.fetchIssues();
    }
}
