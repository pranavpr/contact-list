function AppCtrl($scope, $http) {

	var refresh = function() {
		$http.get('/contacts').success(function(response) {
			$scope.contactlist = response;
			$scope.contact = "";
		});
	};

	refresh();

	$scope.addContact = function() {
		$http.post('/contacts', $scope.contact).success(function (response) {
			refresh();
		});
	};

	$scope.removeContact = function (id) {
		$http.delete('/contacts/' + id).success(function (response) {
		refresh();
		});
	};

	$scope.editContact = function (id) {
		$http.get('/contacts/' + id).success(function (response) {
			$scope.contact = response;
		});
	};
}