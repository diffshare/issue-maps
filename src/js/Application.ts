/// <reference path="../../typings/tsd.d.ts" />

'use strict';

let module = angular.module("issueMaps", ["ui.router", "uiGmapgoogle-maps", "angularMoment", "ngMaterial", "http-auth-interceptor", "ngMdIcons"]);

module.run((amMoment)=> {
    amMoment.changeLocale("ja");
});

module.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'places' // Required for SearchBox.
    });
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
        .state("issues_new", {
            url: "/issues/new",
            template: '<issue mode="\'new\'"></issue>'
        })
        .state("issues", {
            url: "/",
            templateUrl: "templates/_home.html"
        })
        .state("issues.show", {
            url: "issues/:id",
            template: '<issue selected-issue="selectedIssue" flex></issue>'
        })
        .state("issues.edit", {
            url: "issues/:id/edit"
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

module.directive("root", ()=> new RootDirective());
module.directive("maps", ()=> new MapsDirective());
module.directive("issuesList", ()=> new IssuesListDirective());
module.directive("issue", ()=> new IssueDirective());
module.directive("login", ()=> new LoginDirective());

module.service("IssueService", IssueService);
