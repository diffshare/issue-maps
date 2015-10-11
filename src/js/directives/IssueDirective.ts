/// <reference path="../../../typings/tsd.d.ts" />

import IssueService from "../services/IssueService";
export default class IssueDirective implements ng.IDirective {

    restrict:string = "E";
    scope:Object = {
        selectedIssue: "=selectedIssue",
        mode: "&mode",
    };
    bindToController:Boolean = true;
    controller = IssueController;
    controllerAs = "ctrl";
    templateUrl:string = "templates/_issue.html";
}

class IssueController {

    selectedIssue:any = null;
    issue:any = null;
    isEditMode:boolean;
    mode:Function;
    loading:boolean = false;

    constructor(private $scope:ng.IScope, private $state:ng.ui.IStateService, private $stateParams:ng.ui.IStateParamsService, private IssueService:IssueService, private $rootScope:ng.IRootScopeService) {
        this.$scope.$watch(()=> this.selectedIssue, ()=> this.fetchIssue());
        this.fetchIssue();

        this.$rootScope.$on("$stateChangeSuccess", ()=> this.fetchIssue());
    }

    getPage():string {
        return "templates/issue/_" + this.mode() + ".html";
    }

    updateMode() {
        // 詳細もしくは編集の場合
        this.isEditMode = !!this.$state.includes("issues.edit");
    }

    async fetchIssue() {
        if (this.selectedIssue == null) return;
        //console.log("fetchIssue: "+this.selectedIssue.id);
        this.loading = true;
        this.issue = await this.IssueService.fetchRedmineIssue(this.selectedIssue.id);
        this.loading = false;
        this.$scope.$apply();
    }

    async clickSubmit() {
        await this.IssueService.updateRedmineIssue(this.issue.id, this.issue);
        this.$state.go("issue", {id: this.$stateParams["id"]});
    }
}