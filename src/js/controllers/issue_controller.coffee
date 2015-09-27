module.exports = class IssueController

  constructor: (@$scope, @$stateParams, @Issue)->

    @$scope.issue = null

    @Issue.checkKey().then (key)=>
      @Issue.fetchIssue key, @$stateParams.id
      .then (result)=>
        @$scope.issue = result.data.issue
        console.log result.data.issue