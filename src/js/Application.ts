/// <reference path="../../typings/tsd.d.ts" />

'use strict';

let module = angular.module("issueMaps", ["ui.router", "uiGmapgoogle-maps", "angularMoment"]);

module.run((amMoment)=> {
    amMoment.changeLocale("ja");
});

module.config(($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider)=> {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("/", {
                url: "/",
                templateUrl: "templates/_home.html"
            })
            .state("issue",
            {
                url: "/issues/:id",
                templateUrl: "templates/_issues_show.html"
            })
    }
);

import RootDirective from "./directives/RootDirective";
import MapsDirective from "./directives/MapsDirective";
import IssuesListDirective from "./directives/IssuesListDirective";
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
//module.factory("IssueService", ()=> {
//    return new IssueService()
//});
module.service("IssueService", IssueService);