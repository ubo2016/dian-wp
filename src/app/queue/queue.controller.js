'use strict';

angular.module('dian')
  .config(function($routeProvider) {
    $routeProvider
      .when('/queue_history/', {
        templateUrl: 'app/queue/queue_history.html',
        controller: 'QueueHitstoryCtrl'
      })
      .when('/queue_items/:id', {
        templateUrl: 'app/queue/queue_items.html',
        controller: 'QueueItemsCtrl'
      });
  })
  .controller('QueueHitstoryCtrl', function(config, $scope, $http) {
    $http.get(config.api_url + '/wp/registration/list-history-registration/').then(function(res) {
      console.log('queue history');
      console.log(res.data);
      $scope.queue = res.data;
    });
  })
  .controller('QueueItemsCtrl', function(config, $scope, $http, $routeParams) {
    var queue_item_id;
    console.log('queue item id');
    console.log($routeParams.id);
    queue_item_id = $routeParams.id;
    $http.get(config.api_url + '/wp/registration/get-detail-registration/', {
      params: {
        id: queue_item_id
      }
    }).then(function(res) {
      console.log('queue_item');
      console.log(res.data);
      $scope.queue_item = res.data;
    });
  })
  .controller('QueueCtrl', function (config, $scope, $http) {
    $http.get(config.api_url + '/wp/registration/list-current-registration/')
    .then(function(res) {
      console.log('queue list');
      console.log(res.data);
      $scope.queue = res.data || [];
      
    });
    $scope.queue = [{
        restaurant: {
          name: 'this is restaurant'
        },
        id: 1
      }];
  });
