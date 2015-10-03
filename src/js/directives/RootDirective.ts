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
        var result = await this.IssueAPI.fetchIssues();
        this.issues = result.data.issues.map((issue:any) => {
            for (var c of issue.custom_fields) {
                if (c.name == "場所")
                    [issue.latitude, issue.longitude] = c.value.split(",");
            }
            return {
                id: issue.id,
                latitude: issue.latitude,
                longitude: issue.longitude,
                title: issue.subject,
                description: issue.description,
                //author: issue.author.name
            };
        });
    }
}
