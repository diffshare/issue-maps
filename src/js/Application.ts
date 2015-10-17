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

module.run(($rootScope:ng.IRootScopeService, $mdDialog:any, IssueService:any, authService:any)=> {
    $rootScope.$on("event:auth-loginRequired", ()=> {
        $mdDialog.show({
            templateUrl: "templates/_login_dialog.html",
            parent: angular.element(document.body),
            controller: ($scope:any, $mdDialog:any)=> {
                $scope.answer = (key)=> {
                    $mdDialog.hide(key);
                }
            }
        }).then((key:any)=> {
            IssueService.setRedmineAccessKey(key);
            authService.loginConfirmed("success", (config:any)=> {
                config.headers["X-Redmine-API-Key"] = key;
                return config;
            });
        });
    });
});

module.config(($httpProvider:ng.IHttpProvider)=> {
    $httpProvider.defaults.withCredentials = true;
});

module.config(($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider)=> {

    $urlRouterProvider.otherwise("/issues");

    $stateProvider
        .state("issues", {
            url: "/issues",
            abstract: true,
            template: '<ui-view layout-fill></ui-view>'
        })
        .state("issues.index", {
            url: "",
            template: '<issues-list layout="column" filtered-issues="ctrl.filteredIssues" selected-issue="ctrl.selectedIssue"></issues-list>'
        })
        .state("issues.new", {
            url: "/new",
            template: '<issue mode="\'new\'"></issue>'
        })
        .state("issues.show", {
            url: "/:id",
            template: '<issue mode="\'show\'"></issue>'
        })
        .state("issues.edit", {
            url: "/:id/edit",
            template: '<issue mode="\'edit\'"></issue>'
        })
});

import ENDPOINT from "./Setting"
import RootDirective from "./directives/RootDirective";
import MapsDirective from "./directives/MapsDirective";
import IssuesListDirective from "./directives/IssuesListDirective";
import IssueDirective from "./directives/IssueDirective";
import IssueService from "./services/IssueService"

module.directive("root", ()=> new RootDirective());
module.directive("maps", ()=> new MapsDirective());
module.directive("issuesList", ()=> new IssuesListDirective());
module.directive("issue", ()=> new IssueDirective());

module.service("IssueService", IssueService);
