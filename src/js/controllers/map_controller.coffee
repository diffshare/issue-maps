module.exports = class MapController

  constructor: (@$scope, @Issue)->

    @$scope.issuesOrders = ["id", "title", "latitude", "longitude"]
    @$scope.selectedIssuesOrder = "id"

    @$scope.map =
      center:
        latitude: 35.68519569653298
        longitude: 139.75278877116398
      zoom: 12

    @$scope.markers = []

    @$scope.clickIssue = (target)=>
      closeAll()
      target.showWindow = true
      @$scope.map.center =
        latitude: target.latitude
        longitude: target.longitude

    closeAll = =>
      for m in @$scope.markers
        m.showWindow = false

    # redmine方式のissue読み込み
    @Issue.fetchIssues().then (result)=>

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
          start_date: i.start_date
          created_on: i.created_on
          icon: "//www.google.co.jp/maps/vt/icon/name=assets/icons/poi/quantum/star_shadow-1-small.png,assets/icons/poi/quantum/star_container-1-small.png,assets/icons/poi/quantum/star-1-small.png&highlight=ff000000,cd814b,ffed47&color=ff000000?scale=1"
