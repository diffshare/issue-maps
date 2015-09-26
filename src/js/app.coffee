module = angular.module "issueMaps", ["ui.router"]

module.config ($stateProvider, $urlRouterProvider)->

  $urlRouterProvider.otherwise "/"

  $stateProvider
  .state "home",
    url: "/"
    templateUrl: "templates/_home.html"

