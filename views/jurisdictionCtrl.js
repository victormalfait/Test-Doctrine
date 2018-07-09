angular.module("angApp")
.controller("Center", function ($http, $window) {
	let cr = this
  $http.get('/getJurisdictionContactInfos?jurisdiction_id=' + jurisdiction_id)
    .then(function(res) {
      cr.jurisdictionContactInfos = angular.fromJson(res.data.contact_infos)
  }, function(res) {
    throw new Error('Something went wront in jurisdiction contact infos query')
  })
})
