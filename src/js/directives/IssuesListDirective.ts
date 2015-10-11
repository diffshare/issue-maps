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
    firstIssueId:string = null;

    constructor(private $scope:ng.IScope, private $filter:ng.IFilterService, private $state:ng.ui.IStateService, private $stateParams:ng.ui.IStateParamsService, private $rootScope:ng.IRootScopeService, private $mdDialog:any) {
        this.$scope.$watch(()=> this.query, ()=> this.updateFilteredIssues());
        this.$scope.$watch(()=> this.issues, ()=> this.updateFilteredIssues());
        this.firstIssueId = this.$stateParams["id"];
        this.$rootScope.$on("$stateChangeSuccess", ()=> this.updateSelectedIssue());
    }

    isIssueShow():boolean {
        return !!(this.$state.includes("issues.show") || this.$state.includes("issues.edit"));
    }

    updateSelectedIssue() {
        // issueが存在して、urlで指定されているのであれば、選択する
        if (this.issues.length > 0 && (this.$state.includes("issues.show") || this.$state.includes("issues.edit"))) {
            this.selectIssue(this.firstIssueId);
            this.firstIssueId = null;
        }
    }

    selectIssue(issueId) {
        this.issues.forEach((issue:any)=> {

            if (issue.id.toString() == issueId) {
                issue.show = true; // 地図のwindowを開く
                this.selectedIssue = issue;
                console.log("show:"+issueId+"/"+issue.id);
            }
            else
                issue.show = false;
        });
    }

    updateFilteredIssues() {
        this.categories = {};
        this.issues.forEach((issue)=> {
            if (!issue.category) return;
            this.categories[issue.category] = this.categories[issue.category] || 0;
            this.categories[issue.category] += 1;
        });
        this.filteredIssues = this.$filter("filter")(this.issues, this.query);

        this.updateSelectedIssue();
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

        if (this.isIssueShow()) {
            this.$state.go(this.$state.current, {id: issue.id});
        }
        this.selectIssue(issue.id);
    }

    clickAdd() {
        this.$mdDialog.show({
            templateUrl: "templates/_new_issue_dialog.html"
        });
    }
}
