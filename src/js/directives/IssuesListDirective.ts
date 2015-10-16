/// <reference path="../../../typings/tsd.d.ts" />

import IssueService from "../services/IssueService";
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

    constructor(private $scope:ng.IScope, private $filter:ng.IFilterService, private $state:ng.ui.IStateService, private $stateParams:ng.ui.IStateParamsService, private $rootScope:ng.IRootScopeService, private $mdDialog:any, private IssueService:IssueService) {
        this.$scope.$watch(()=> this.query, ()=> this.updateFilteredIssues());
        this.$scope.$watch(()=> this.issues, ()=> this.updateFilteredIssues());
        this.firstIssueId = this.$stateParams["id"];
        this.$rootScope.$on("$stateChangeSuccess", ()=> this.updateSelectedIssue());

        this.updateIssues();
    }

    async updateIssues() {
        try {
            this.issues = await this.IssueService.fetchIssues();
            this.$scope.$apply();
        } catch (e) {
            console.error(e.message);
            this.$rootScope.$broadcast("event:auth-loginRequired");
            //this.$state.go("login");
            //this.IssueService.inputRedmineKey();
        }
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
        if (this.issues == null) return;
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
        this.selectIssue(issue.id);
    }

    dblclickIssue(issue:any) {
        this.$state.go("issues.show", {id: issue.id});
    }

    clickAdd() {
        this.$mdDialog.show({
            templateUrl: "templates/_new_issue_dialog.html"
        });
    }
}
