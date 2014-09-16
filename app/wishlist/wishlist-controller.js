angular.module('app')
.controller('WishListController', function($scope, CurrentCharacter, WishListDataService, ItemDataService) {

    $scope.character = CurrentCharacter;
    $scope.menuItems = createMenuItems();
    $scope.wishlist = WishListDataService.getWishList($scope.character);

    $scope.selectedMenuItem = undefined;
    $scope.hoveredItem = undefined;
    $scope.newItemMatch = undefined;

    $scope.itemSelected = function(item) {
        ItemDataService.getInfo(item, function(itemInfo) {
            $scope.newItemMatch = itemInfo;
        });
    };

    $scope.itemSelectTextChanged = function(itemName) {
        var newItem = $scope.potentialNewItemIndex[itemName];
        if(newItem) {
            ItemDataService.getInfo(newItem, function(itemInfo) {
                $scope.newItemMatch = itemInfo;
            });
        } else {$scope.newItemMatch = undefined;}
    };

    $scope.getItemIcon = function(item) {
        return ItemDataService.getIcon(item);
    };

    $scope.menuItemClicked = function(menuItem) {
        var previousItem = $scope.selectedMenuItem;

        deselectMenuItem();
        if(menuItem != previousItem) {selectMenuItem(menuItem);}
    };

    $scope.menuItemMouseOver = function(menuItem) {
        $scope.hoveredItem = menuItem.item;
        menuItem.highlight = true;
    };

    $scope.menuItemMouseOut = function(menuItem) {
        $scope.hoveredItem = undefined;

        if(menuItem !== $scope.selectedMenuItem) {
            menuItem.highlight = false;
        }
    };

    $scope.getItemInfoPane = function(item) {
        return ItemDataService.getItemInfoPane(item);
    };

    $scope.acceptItemClicked = function() {
        $scope.selectedMenuItem.setItem($scope.newItemMatch);
    };

    $scope.clearItemClicked = function() {
        $scope.selectedMenuItem.clearItem();
    };

    $scope.itemCollectedClicked = function() {
        var item = $scope.selectedMenuItem.item;
        $scope.wishlist.addCollectedItem(item);
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
        menuItem.highlight = true;
        $scope.selectedMenuItem = menuItem;
        $scope.potentialNewItems = ItemDataService.getItemsOfType(menuItem.itemSlot.type);
        $scope.potentialNewItemIndex = indexItems($scope.potentialNewItems);

        if(menuItem.item) {
            $scope.newItemName = menuItem.item.name;
            $scope.newItemMatch = menuItem.item;
        }
    }

    function deselectMenuItem() {
        if($scope.selectedMenuItem) {
            $scope.selectedMenuItem.highlight = false;
        }

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
        this.isCollected = false;

        if(item) {this.setItem(item);}
    }

    MenuItem.prototype.setItem = function(item) {
        this.item = item;
        this.isCollected = $scope.wishlist.isCollected(item);
        this.icon = $scope.getItemIcon(item);
    }

    MenuItem.prototype.clearItem = function() {
        this.item = undefined;
        this.isCollected = false;
        this.icon = this.itemSlot.icon;
    }
});