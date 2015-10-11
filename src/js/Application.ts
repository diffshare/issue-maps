/// <reference path="../../typings/tsd.d.ts" />

'use strict';

let module = angular.module("issueMaps", ["ui.router", "uiGmapgoogle-maps", "angularMoment", "ngMaterial", "http-auth-interceptor", "ngMdIcons"]);

module.run((amMoment)=> {
    amMoment.changeLocale("ja");
});

module.run(($rootScope:ng.IRootScopeService, $state:ng.ui.IStateService)=> {
    $rootScope.$on("event:auth-loginRequired", ()=> {
        $state.go("login");
    });
});

module.config(($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider)=> {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("login", {
            url: "/login",
            template: "<login></login>"
        })
        .state("home", {
            url: "/",
            templateUrl: "templates/_home.html"
        })
        .state("issue", {
            url: "/issues/:id",
            templateUrl: "templates/_issues_show.html"
        })
        .state("issue_edit", {
            url: "/issues/:id/edit",
            templateUrl: "templates/_issues_edit.html"
        })
});

module.config(($httpProvider:ng.IHttpProvider)=> {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});

import ENDPOINT from "./Setting"
import RootDirective from "./directives/RootDirective";
import MapsDirective from "./directives/MapsDirective";
import IssuesListDirective from "./directives/IssuesListDirective";
import IssueDirective from "./directives/IssueDirective";
import LoginDirective from "./directives/LoginDirective";
import IssueService from "./services/IssueService"

module.directive("root", ()=> {
    return new RootDirective();
});
module.directive("maps", ()=> {
    return new MapsDirective();
});
module.directive("issuesList", ()=> {
    return new IssuesListDirective();
});
module.directive("issue", ()=> {
    return new IssueDirective();
});
module.directive("login", ()=> {
    return new LoginDirective();
});
module.service("IssueService", IssueService);
