angular.module('services', [])

/**
 * The current Character using the application.
 */
.factory('CurrentCharacter', function() {return new Character("102552080", "Halech", "Arygos-US", "http://us.battle.net/static-render/us/llane/16/102552080-profilemain.jpg");})

/**
 * ItemDataService is required to have these functions:
 *  -getItemSlots()
 *  -getIcon(Item)
 *  -getItemInfoPane(Item)
 *  -getInfo(Item, callback)
 *  -getItemsOfType(ItemType)
 *  -getDrops(Boss)
 */
 .factory('ItemDataService', function($http) {return new BattleNetItemDataService($http);})

/**
 * WishListDataService is required to have these functions:
 *  -getWishList(Character)
 *  -saveWishList(Character, wishlist)
 */
.factory('WishListDataService', function() {return new FakeWishListDataService();})

/**
 * CharacterDataService is required to have these functions:
 *  -getCharacter(name, server)
 */
.factory('CharacterDataService', function() {return new FakeCharacterDataService();})

/**
 * RaidDataService is required to have these functions:
 *  -getRaids()
 */
.factory('RaidDataService', function() {return new FakeRaidDataService();});