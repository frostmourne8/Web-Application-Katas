angular.module('app', ['ngRoute', 'services', 'WishList'])
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