angular.module('app')
.controller('WishListController', function($scope, CurrentCharacter, WishListDataService, ItemDataService) {

    $scope.character = CurrentCharacter;
    $scope.menuItems = createMenuItems();

    function createMenuItems() {
        var wishlist = WishListDataService.getWishList(CurrentCharacter);
        var itemTypes = ItemDataService.getTypes();

        var menuItems = [];
        for(var i = 0;i < itemTypes.length;i++) {
            var itemType = itemTypes[i];
            var wishListItem = wishlist.getItemForType(itemType);

            if(wishListItem) {menuItems.push(createWishListItemMenuItem(wishListItem));}
            else {menuItems.push(createItemTypeMenuItem(itemType));}
        }

        return menuItems;
    }

    function createItemTypeMenuItem(itemType) {
        return new MenuItem(itemType.icon);
    }

    function createWishListItemMenuItem(item) {
        return new MenuItem(ItemDataService.getIcon(item.id));
    }

    function MenuItem(icon) {
        this.icon = icon;
        this.showSubItems = false;
    }
});