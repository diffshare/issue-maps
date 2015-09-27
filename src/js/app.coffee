module = angular.module "issueMaps", ["ui.router", "uiGmapgoogle-maps", "angularMoment"]

module.run (amMoment)->
  amMoment.changeLocale "ja"

module.config ($stateProvider, $urlRouterProvider)->

  $urlRouterProvider.otherwise "/"

  $stateProvider
  .state "home",
    url: "/"
    templateUrl: "templates/_home.html"
  .state "issue",
    url: "/issues/:id"
    templateUrl: "templates/_issues_show.html"

module.constant "Setting", require "./setting" # setting.sampleを動かす場合は"./setting.sample"と書く
module.factory "Issue", require "./services/issue"
module.controller "MapController", require "./controllers/map_controller"
