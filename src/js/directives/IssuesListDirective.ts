/// <reference path="../../../typings/tsd.d.ts" />

export default class IssuesListDirective implements ng.IDirective {

    restrict:string = "E";
    scope:Object = {
        issues: "=issues",
        filteredIssues: "=filteredIssues",
        selectedIssue: "=selectedIssue"
    };
    bindToController:Boolean = true;
    controller = IssuesListController;
    controllerAs = "ctrl";
    templateUrl:string = "templates/_issues_list.html";
}

class IssuesListController {

    issues:Array<any>;
    query:string = "";
    filteredIssues:Array<any>;
    categories:Object;
    issuesOrders = ["id", "start_date", "created_on", "title", "latitude", "longitude"];
    selectedIssuesOrder = "id";
    selectedIssue = null;

    constructor(private $scope:ng.IScope, private $filter:ng.IFilterService) {
        this.$scope.$watch(()=> this.query, ()=> this.updateFilteredIssues());
        this.$scope.$watch(()=> this.issues, ()=> this.updateFilteredIssues());
    }

    updateFilteredIssues() {
        this.categories = {};
        this.issues.forEach((issue)=> {
            if (!issue.category) return;
            this.categories[issue.category] = this.categories[issue.category] || 0;
            this.categories[issue.category] += 1;
        });
        this.filteredIssues = this.$filter("filter")(this.issues, this.query);
    }

    clickCategory(category) {
        this.query = category;
    }

    clickIssue(issue) {
        //console.log("clickIssue");
        this.closeAll();
        issue.show = true;
        this.selectedIssue = issue;
    }

    closeAll() {
        this.issues.forEach((issue)=> {
            issue.show = false;
        });
    }
}
