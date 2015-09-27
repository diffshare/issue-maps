module.exports = ($http, $window, $q, Setting)->
  new class

    checkKey: ->
      key = $window.localStorage.getItem "redmine-access-key"
      deferred = $q.defer()
      if Setting.backend.issue.type != "redmine"
        deferred.resolve true
      else
        if key == null
          key = $window.prompt "Redmine Access Keyを入力してください"

        if key and key.length > 0
          $window.localStorage.setItem "redmine-access-key", key
          deferred.resolve key
        else
          deferred.reject("Issueの表示にはRedmine Access Keyが必要です")

      deferred.promise

    inputKey: ->
      deferred = $q.defer()
      key = $window.prompt "Redmine Access Keyを入力してください"

      if key and key.length > 0
        $window.localStorage.setItem "redmine-access-key", key
        deferred.resolve key
      else
        deferred.reject("Issueの表示にはRedmine Access Keyが必要です")

      deferred.promise

    fetchIssues: (key)->
      url = Setting.backend.issues.url
      if Setting.backend.issues.type == "redmine"

        # redmineがjsonpのcallback文字列からdotを消してしまう件について
        c = $window.angular.callbacks.counter.toString(36);
        $window['angularcallbacks_' + c] = (data)->
          $window.angular.callbacks['_' + c](data)
          delete $window['angularcallbacks_' + c]
        # ここまで対処

        # 本来はここでredmineのissuesにアクセス
        url =

          $http.jsonp url + "&key=" + key
      else if Setting.backend.issues.type == "json"
        $http.get url
      else
        throw new Error("知らんがな backend.issues.type:" + Setting.backend.issues.type)

    fetchIssue: (key, id)->
      url = Setting.backend.issue.url
      if Setting.backend.issue.type == "redmine"

        # redmineがjsonpのcallback文字列からdotを消してしまう件について
        c = $window.angular.callbacks.counter.toString(36);
        $window['angularcallbacks_' + c] = (data)->
          $window.angular.callbacks['_' + c](data)
          delete $window['angularcallbacks_' + c]
        # ここまで対処

        # 本来はここでredmineのissuesにアクセス
        url =

          $http.jsonp (url + "&key=" + key).replace(":id", id)
      else if Setting.backend.issue.type == "json"
        $http.get url
      else
        throw new Error("知らんがな backend.issue.type:" + Setting.backend.issue.type)
