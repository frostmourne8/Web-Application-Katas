angular.module('services', [])

/**
 * ItemDataService is required to have these functions:
 *  -getIcon(Item.id)
 *  -getInfo(Item.id)
 *  -getDrops(Boss)
 */
 .factory('ItemDataService', function() {return new FakeItemDataService();})

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