module.exports = function($scope) {

  $scope.a = null;
  $scope.b = null;

  $scope.countResult = function() {
    var a = parseFloat($scope.a);
    var b = parseFloat($scope.b);
    if(a && b) {
      return a + b;
    } else {
      return "";
    }
  };

};
