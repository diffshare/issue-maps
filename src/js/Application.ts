/// <reference path="../../typings/tsd.d.ts" />

'use strict';

let module = angular.module("issueMaps", ["ui.router", "uiGmapgoogle-maps", "angularMoment"]);

module.run((amMoment)=> {
    amMoment.changeLocale("ja");
});

module.config(($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider)=> {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("home", {
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

module.config(($httpProvider:ng.IHttpProvider)=> {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});

import ENDPOINT from "./Setting"
import RootDirective from "./directives/RootDirective";
import MapsDirective from "./directives/MapsDirective";
import IssuesListDirective from "./directives/IssuesListDirective";
import IssueDirective from "./directives/IssueDirective";
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
module.service("IssueService", IssueService);
