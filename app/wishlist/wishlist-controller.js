angular.module('app')
.controller('WishListController', function($scope, CurrentCharacter, WishListDataService, ItemDataService) {

    $scope.character = CurrentCharacter;
    $scope.menuItems = createMenuItems();

    $scope.selectedMenuItem = undefined;
    $scope.hoveredItem = undefined;
    $scope.newItemMatch = undefined;

    $scope.itemSelected = function(item) {
        ItemDataService.getInfo(item, function(itemInfo) {
            $scope.newItemMatch = itemInfo;
            $scope.selectedMenuItem.setItem(itemInfo);
        });
    };

    $scope.itemSelectTextChanged = function(itemName) {
        var newItem = $scope.potentialNewItemIndex[itemName];
        if(!newItem) {return;}

        ItemDataService.getInfo(newItem, function(itemInfo) {
            $scope.newItemMatch = itemInfo;
        });
    };

    $scope.getItemIcon = function(item) {
        return ItemDataService.getIcon(item.id);
    };

    $scope.menuItemClicked = function(menuItem) {
        var previousItem = $scope.selectedMenuItem;
        deselectMenuItem();
        if(menuItem != previousItem) {selectMenuItem(menuItem);}
    };

    $scope.menuItemMouseOver = function(menuItem) {
        $scope.hoveredItem = menuItem;
    };

    $scope.menuItemMouseOut = function() {
        $scope.hoveredItem = undefined;
    };

    function indexItems(items) {
        var index = {};
        for(var i = 0;i < items.length;i++) {
            var item = items[i];
            index[item.name] = item;
        }

        return index;
    }

    function selectMenuItem(menuItem) {
        $scope.selectedMenuItem = menuItem;
        $scope.potentialNewItems = ItemDataService.getItemsOfType(menuItem.itemSlot.type);
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
        var itemSlots = ItemDataService.getItemSlots();

        var menuItems = [];
        for(var i = 0;i < itemSlots.length;i++) {
            var itemSlot = itemSlots[i];
            var wishListItem = wishlist.getItemForType(itemSlot.type);

            if(wishListItem) {
                menuItems.push(createWishListItemMenuItem(itemSlot, wishListItem));
            } else {menuItems.push(createItemSlotMenuItem(itemSlot));}
        }

        return menuItems;
    }

    function createItemSlotMenuItem(itemSlot) {
        return new MenuItem(itemSlot);
    }

    function createWishListItemMenuItem(itemSlot, item) {
        return new MenuItem(itemSlot, item);
    }

    function MenuItem(itemSlot, item) {
        this.itemSlot = itemSlot;
        this.icon = itemSlot.icon;
        if(item) {this.setItem(item);}
    }

    MenuItem.prototype.setItem = function(item) {
        this.item = item;
        this.icon = $scope.getItemIcon(item);
    }
});