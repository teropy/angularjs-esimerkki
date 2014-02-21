module.exports = function($scope) {

  $scope.who = "";

  $scope.sayHello = function() {
    alert("Hello, " + $scope.who);
  };

};
