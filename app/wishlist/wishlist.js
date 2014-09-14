angular.module("WishList", [])
    .directive('openOnLoad', function($timeout) {

        function getAngleForItem($scope) {
            var degIncrement = 360 / $scope.menuItems.length;
            return 90 + degIncrement * $scope.$index;
        }

        function getMenuTransform(degrees, radius) {
            return 'rotate(' + degrees + 'deg) translate(-' + radius + 'px) rotate(-' + degrees + 'deg)';
        }

        return function($scope, element) {
            var angle = getAngleForItem($scope);
            var transform = getMenuTransform(angle, 285);

            //TODO figure out a way to do this without timeout
            $timeout(function () {
                element[0].style.transform = transform;
            }, 100);
        };
    });


