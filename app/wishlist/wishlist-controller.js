angular.module('app')
.controller('WishListController', function($scope, CurrentCharacter, WishListDataService, ItemDataService) {

    $scope.character = CurrentCharacter;
    $scope.menuItems = createMenuItems();
    $scope.items = ItemDataService.getAllItems();

    $scope.selectedItem = undefined;
    $scope.selectedItemType = undefined;
    $scope.hoveredItem = undefined;

    $scope.menuItemClicked = function(menuItem) {
      if(menuItem.itemType === $scope.selectedItemType) {
          $scope.selectedItemType = undefined;
          $scope.selectedItemType = undefined;
      } else {
          $scope.selectedItemType = menuItem.item;
          $scope.selectedItemType = menuItem.itemType;
      }
    }

    $scope.menuItemMouseOver = function(menuItem) {
        $scope.hoveredItem = menuItem;
    }

    $scope.menuItemMouseOut = function() {
        $scope.hoveredItem = undefined;
    }

    $scope.itemSelected = function() {
        alert("Selected an item: " + $scope.itemName);
    }

    function createMenuItems() {
        var wishlist = WishListDataService.getWishList(CurrentCharacter);
        var itemTypes = ItemDataService.getTypes();

        var menuItems = [];
        for(var i = 0;i < itemTypes.length;i++) {
            var itemType = itemTypes[i];
            var wishListItem = wishlist.getItemForType(itemType);

            if(wishListItem) {
                var alternates = wishlist.getAlternatesForType(itemType);
                menuItems.push(createWishListItemMenuItem(wishListItem, alternates));
            } else {menuItems.push(createItemTypeMenuItem(itemType));}
        }

        return menuItems;
    }

    function createItemTypeMenuItem(itemType) {
        return new MenuItem(itemType);
    }

    function createWishListItemMenuItem(item, alternates) {
        return new MenuItem(item.type, item);
    }

    function MenuItem(itemType, item) {
        this.itemType = itemType;
        this.item = item;

        this.icon = item ? ItemDataService.getIcon(item.id) : itemType.icon;
    }
});