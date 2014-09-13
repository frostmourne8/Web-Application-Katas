angular.module('app', ['services', 'ngRoute', 'ngAnimate'])
.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'app/wishlist/WishList.html',
                controller: 'WishListController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);