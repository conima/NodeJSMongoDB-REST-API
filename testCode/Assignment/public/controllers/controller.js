var myApp = angular.module("AppModule", []);                   

myApp.controller("AppCtrl", function ($scope, $http, $q) {     
   	
	var companyResponse;
	var personResponse;
	
	var refresh = function()	{
		var company = $http.get('/companylist/company').then(function(response) {
			console.log("I got company data");
			companyResponse = response.data;
			
		})
		var person = $http.get('/companylist/person').then(function(response) {
			console.log("I got person data");
			personResponse = response.data;
		
		});
		 	$q.all([company, person]).then(function() {
				 $scope.companylist = companyResponse;
				 $scope.company = {};
				 $scope.person = {};
				 $scope.personlist = personResponse;
    	});
	};
	
	refresh();
	
	$scope.addCompany = function() {
	  console.log($scope.company);
	  	$http.post('/companylist/company', $scope.company).then(function(response) {
		console.log(response);
	  	});
	  refresh();
	  $scope.$apply();
	};
	
	$scope.addPerson = function() {
	  console.log($scope.person);
	  $http.post('/companylist/person', $scope.person).then(function(response) {
		console.log(response);
		
	  });
	  refresh();
	  $scope.$apply();
	};
	
	$scope.removePerson = function(id)	{
		console.log(id);
		$http.delete('/companylist/person/' + id).then(function(response)	{
		});
		refresh();
		$scope.$apply();
	};
	
	$scope.editCompany = function(id)	{
		console.log(id);
		angular.element("#companyUpdateBtn").prop('disabled', false);
		angular.element("#companyAddBtn").prop('disabled', true);
		$http.get('/companylist/company/' + id).then(function(response)	{
			$scope.company = response.data;
		});
	};
	
	$scope.editPerson = function(id)	{
		console.log(id);
		angular.element("#personUpdateBtn").prop('disabled', false);
		angular.element("#personAddBtn").prop('disabled', true);
		$http.get('/companylist/person/' + id).then(function(response)	{
			$scope.person = response.data;
		});
	};
	
	$scope.updateCompany = function() {
	  console.log($scope.company._id);
	  $http.put('/companylist/company/' + $scope.company._id, $scope.company).then(function(response) {
	  });
	  refresh();
	  angular.element("#companyUpdateBtn").prop('disabled', true);
	  angular.element("#companyAddBtn").prop('disabled', false);
	  $scope.$apply();
	};
	
	$scope.updatePerson = function() {
	  console.log($scope.person._id);
	  $http.put('/companylist/person/' + $scope.person._id, $scope.person).then(function(response) {
	  });
	  refresh();
	  angular.element("#personUpdateBtn").prop('disabled', true);
	  angular.element("#personAddBtn").prop('disabled', false);
	  $scope.$apply();
	};
	
	$scope.deselectCompany = function()	{
		$scope.company = {};
		angular.element("#companyUpdateBtn").prop('disabled', true);
		angular.element("#companyAddBtn").prop('disabled', false);
	};
	
	$scope.deselectPerson = function()	{
		$scope.person = {};
		angular.element("#personUpdateBtn").prop('disabled', true);
		angular.element("#personAddBtn").prop('disabled', false);
	};
	
});