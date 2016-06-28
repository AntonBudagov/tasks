'use strict';

/* Controllers */
var taksApp = angular.module('taksApp', ['ngResource', 'ngRoute', 'angularInlineEdit']);


taksApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
      .when('/',{
        templateUrl:'template/home.html',
        controller:'TaskListCtrl'
      })
      .when('/task/:taskId', {
        templateUrl:'template/task-detail.html',
        controller:'TaskDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
// Factory

taksApp.factory('Task', function($resource) {
  return $resource('tasks/tasks.json',{});
});


taksApp.controller('TaskListCtrl',['$scope','$http', '$location', 'Task', function($scope, $http, $location, Task) {

  $scope.tasks = Task.query();
  $scope.setStyle = function(is_high_priority){
      return is_high_priority ? "font-weight:bold; color: #ce1717" : "font-weight:400"
    }

  // Filter
  $scope.activStatusFilter = function(taskItem) {
    return taskItem.obj_status === 'active';
  };

}]);

//Taks Detail Controller
taksApp.controller('TaskDetailCtrl',['$scope','$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

  $http.get('tasks/tasks.json').success(function(data) {
      $scope.tasks = data[$routeParams.taskId];
    });
}]);

//Taks Send Controller
taksApp.controller("HttpPutCtrl", function ($scope, $http) {

  $scope.UpdateData = function () {
      var data = $.param({
          name: $scope.name,
          description: $scope.description
      });

      // $http.put('http://example.com?'+ data)
      // .success(function (data, status, headers) {
      //     $scope.ServerResponse = data;
      // })
      // .error(function (data, status, header, config) {
      //     $scope.ServerResponse =  htmlDecode("Data: " + data +
      //         "\n\n\n\nstatus: " + status +
      //         "\n\n\n\nheaders: " + header +
      //         "\n\n\n\nconfig: " + config);
      // });
  };
});
