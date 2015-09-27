module.exports = class MapController

  constructor: (@$scope, @$filter, @Issue)->
    @$scope.issuesOrders = ["id", "start_date", "created_on", "title", "latitude", "longitude"]
    @$scope.selectedIssuesOrder = "id"
    @$scope.query = ""

    @$scope.$watch "query", ->
      filterMarkers()

    @$scope.map =
      center:
        latitude: 35.68519569653298
        longitude: 139.75278877116398
      zoom: 12

    @$scope.markers = []
    @$scope.filteredMarkers = []

    @$scope.markersEvents =
      click: (marker, eventName, model, args)->
        closeAll()
        model.show = true

    @$scope.clickIssue = (target)=>
      closeAll()
      target.show = true
      @$scope.map.center =
        latitude: target.latitude
        longitude: target.longitude

    closeAll = =>
      for m in @$scope.markers
        m.show = false

    filterMarkers = =>
      @$scope.filteredMarkers = @$filter("filter")(@$scope.markers, @$scope.query)

    # redmine方式のissue読み込み
    loading = =>
      @Issue.checkKey()
      .then @Issue.fetchIssues
      .then (result)=>
        for i in result.data.issues
          for c in i.custom_fields
            if c.name == "場所"
              [i.latitude, i.longitude] = c.value.split(",")
          @$scope.markers.push
            id: i.id
            latitude: i.latitude
            longitude: i.longitude
            title: i.subject
            description: i.description
            author: i.author.name
            start_date: i.start_date
            created_on: i.created_on
            category: i.category && i.category.name
          filterMarkers()
      .catch (error)=>
        if error.status && error.status == 404 # なぜ401ではない？
          alert "Redmine Access Keyが異なる可能性があります"
          @Issue.inputKey().then loading
        else
          alert error.statusText || error

    loading()