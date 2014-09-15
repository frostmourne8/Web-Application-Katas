angular.module('app')
.controller('WishListController', function($scope, CurrentCharacter, WishListDataService, ItemDataService) {

    $scope.character = CurrentCharacter;
    $scope.menuItems = createMenuItems();

    $scope.selectedMenuItem = undefined;
    $scope.hoveredItem = undefined;
    $scope.newItemMatch = undefined;

    $scope.itemSelected = function(item) {
        $scope.newItemMatch = item;
        $scope.selectedMenuItem.setItem(item);
    }

    $scope.itemSelectTextChanged = function(itemName) {
        $scope.newItemMatch = $scope.potentialNewItemIndex[itemName];
    }

    $scope.getItemIcon = function(item) {
        return ItemDataService.getIcon(item.id);
    }

    $scope.menuItemClicked = function(menuItem) {
        var previousItem = $scope.selectedMenuItem;
        deselectMenuItem();
        if(menuItem != previousItem) {selectMenuItem(menuItem);}
    }

    $scope.menuItemMouseOver = function(menuItem) {
        $scope.hoveredItem = menuItem;
    }

    $scope.menuItemMouseOut = function() {
        $scope.hoveredItem = undefined;
    }

    function indexItems(items) {
        var index = {}
        for(var i = 0;i < items.length;i++) {
            var item = items[i];
            index[item.name] = item;
        }

        return index;
    }

    function selectMenuItem(menuItem) {
        $scope.selectedMenuItem = menuItem;
        $scope.potentialNewItems = ItemDataService.getItemsOfType(menuItem.itemType);
        $scope.potentialNewItemIndex = indexItems($scope.potentialNewItems);

        if(menuItem.item) {
            $scope.newItemName = menuItem.item.name;
            $scope.newItemMatch = menuItem.item;
        }
    }

    function deselectMenuItem() {
        $scope.selectedMenuItem = undefined;
        $scope.newItemMatch = undefined;
        $scope.newItemName = undefined;
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
        this.icon = itemType.icon;

        if(item) {this.setItem(item);}
    }

    MenuItem.prototype.setItem = function(item) {
        this.item = item;
        this.icon = $scope.getItemIcon(item);
    }
});