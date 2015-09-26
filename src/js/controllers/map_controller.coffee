module.exports = class MapController

  constructor: (@$scope)->

    @$scope.map =
      center:
        latitude: 35.68519569653298
        longitude: 139.75278877116398
      zoom: 12

    @$scope.markers = [
      id: 1
      latitude: 35.66558100912295
      longitude: 139.73042225078734
      title: "受賞展「グッドデザインエキシビション2015（G展）」"
      showWindow: true
    ]
