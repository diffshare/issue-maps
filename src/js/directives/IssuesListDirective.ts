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
    selectedIssue:any = null;

    constructor(private $scope:ng.IScope, private $filter:ng.IFilterService, private $state:ng.ui.IStateService, private $stateParams:ng.ui.IStateParamsService, private $rootScope:ng.IRootScopeService) {
        this.$scope.$watch(()=> this.query, ()=> this.updateFilteredIssues());
        this.$scope.$watch(()=> this.issues, ()=> this.updateFilteredIssues());
        this.$rootScope.$on("$stateChangeSuccess", ()=> this.updateFilteredIssues());
    }

    selectIssue(issueId) {
        this.closeAll();
        var issue = this.issues.filter((issue:any)=> {
            return issue.id.toString() == issueId
        })[0];
        issue.show = true; // 地図のwindowを開く
        this.selectedIssue = issue;
    }

    updateFilteredIssues() {
        this.categories = {};
        this.issues.forEach((issue)=> {
            if (!issue.category) return;
            this.categories[issue.category] = this.categories[issue.category] || 0;
            this.categories[issue.category] += 1;
        });
        this.filteredIssues = this.$filter("filter")(this.issues, this.query);

        // issueが存在して、urlで指定されているのであれば、選択する
        if (this.issues.length > 0 && (this.$state.includes("issues.show") || this.$state.includes("issues.edit")))
            this.selectIssue(this.$stateParams["id"]);
    }

    clickCategory(category) {
        this.query = category;
    }

    clickIssue(issue:any) {
        if (issue == this.selectedIssue) {
            issue.show = false; // 地図のwindowを閉じる
            this.selectedIssue = null;
            this.$state.go("issues");
            return;
        }

        this.$state.go("issues.show", {
            id: issue.id
        });
    }

    closeAll() {
        this.issues.forEach((issue:any)=> {
            issue.show = false;
        });
    }
}
