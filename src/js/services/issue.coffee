module.exports = ($http)->
  new class

    constructor: ->

    fetchIssues: ->
      # 本来はここでredmineのissuesにアクセス
      url = "/assets/issues.json"

      $http.get url
