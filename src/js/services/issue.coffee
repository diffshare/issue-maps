module.exports = ($http, $window, Setting)->
  new class

    constructor: ->

    fetchIssues: ->

      url = Setting.backend.issue.url
      if Setting.backend.issue.type == "jsonp"
        # redmineがjsonpのcallback文字列からdotを消してしまう件について
        c = $window.angular.callbacks.counter.toString(36);
        $window['angularcallbacks_' + c] = (data)->
          $window.angular.callbacks['_' + c](data)
          delete $window['angularcallbacks_' + c]
        # ここまで対処

        # 本来はここでredmineのissuesにアクセス
        url =

        $http.jsonp url
      else if Setting.backend.issue.type == "json"
        $http.get url
      else
        throw new Error("知らんがな backend.issue.type:" + Setting.backend.issue.type)
