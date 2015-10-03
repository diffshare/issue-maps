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
    query:string = "";
    filteredIssues:Array<any>;

    constructor(private $scope:ng.IScope, private $filter:ng.IFilterService) {
        this.$scope.$watch(()=> this.query, ()=> this.updateFilteredIssues());
        this.$scope.$watch(()=> this.issues, ()=> this.updateFilteredIssues());
    }

    updateFilteredIssues() {
        this.filteredIssues = this.$filter("filter")(this.issues, this.query);
    }
}
