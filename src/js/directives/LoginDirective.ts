/// <reference path="../../../typings/tsd.d.ts" />

import IssueService from "../services/IssueService";
export default class LoginDirective implements ng.IDirective {

    restrict:string = "E";
    scope:Object = {};
    bindToController:Boolean = true;
    controller = LoginController;
    controllerAs = "ctrl";
    templateUrl:string = "templates/_login.html";
}

class LoginController {

    accessKey:string = "";

    constructor(private $scope:ng.IScope, private $state:ng.ui.IStateService, private $mdDialog:any, private IssueService:IssueService, private $location:ng.ILocationService) {
    }

    clickLogin() {
        if (!this.accessKey || this.accessKey.length == 0) {
            this.$mdDialog.show(
                this.$mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title("おう")
                    .content("Access Keyが空です。")
                    .ok("OK")
            );
            return;
        }

        this.IssueService.setRedmineAccessKey(this.accessKey);
        window.location.href = "/";
    }
}
