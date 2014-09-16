function BattleNetItemDataService($http) {

    var BASE_API_URL = 'https://us.api.battle.net/wow/item/';
    var API_KEY = 'k58ptvvakfwwmsas25nzu48xfmc7c3tt';

    var itemIndex = {};
    var bossDrops = {};
    var itemTypes = [];

    var HELM = addItemType("Helm", "images/items/helm.png");
    var NECK = addItemType("Neck", "images/items/amulet.png");
    var CHEST = addItemType("Chest", "images/items/chest.png");
    var GLOVES = addItemType("Gloves", "images/items/gloves.png");
    var BRACERS = addItemType("Bracers", "images/items/bracers.png");
    var SHOULDERS = addItemType("Shoulders", "images/items/shoulders.png");
    var CLOAK = addItemType("Cloak", "images/items/cloak.png");
    var BELT = addItemType("Belt", "images/items/belt.png");
    var BOOTS = addItemType("Boots", "images/items/boots.png");
    var PANTS = addItemType("Pants", "images/items/pants.png");
    var WEAPON = addItemType("Weapon", "images/items/weapon.png");
    var OFF_HAND = addItemType("OffHand", "images/items/shield.png");
    var TRINKET = addItemType("Trinket", "images/items/trinket.png");
    var RING = addItemType("Ring", "images/items/ring.png");

    this.getItemSlots = function() {
        return [
            new ItemSlot("Helm", HELM),
            new ItemSlot("Neck", NECK),
            new ItemSlot("Chest", CHEST),
            new ItemSlot("Weapon", WEAPON),
            new ItemSlot("Gloves", GLOVES),
            new ItemSlot("Ring One", RING),
            new ItemSlot("Belt", BELT),
            new ItemSlot("Trinket One", TRINKET),
            new ItemSlot("Boots", BOOTS),
            new ItemSlot("Trinket Two", TRINKET),
            new ItemSlot("Pants", PANTS),
            new ItemSlot("Ring Two", RING),
            new ItemSlot("Bracers", BRACERS),
            new ItemSlot("Off-Hand", OFF_HAND),
            new ItemSlot("Shoulders", SHOULDERS),
            new ItemSlot("Cloak", CLOAK)
        ];
    };

    this.getIcon = function(item) {
        return 'http://media.blizzard.com/wow/icons/56/' + item.icon + '.jpg';
    };

    this.getInfo = function(item, callback) {
        var url = BASE_API_URL + item.id + "?apikey=" + API_KEY;
        $http({method: 'GET', url: url}).success(callback);
    };

    this.getItemsOfType = function(itemType) {
        return itemIndex[itemType];
    };

    this.getDrops = function(boss) {
        return bossDrops[boss.name];
    };

    $http({method: 'GET', url: 'data/ItemIndex.csv'}).
        success(function(data) {
            var items = parseItemsResponse(data);
            indexItems(items);
        });

    $http({method: 'GET', url: 'data/BossDrops.csv'}).
        success(function(data) {
            indexBossDrops(data);
        });

    function addItemType(id, icon) {
        var itemType = new ItemType(id, icon);
        itemTypes.push(itemType);

        return itemType;
    }

    function indexItems(items) {
        for(var i = 0;i < items.length;i++) {
            var item = items[i];
            var typeItems = itemIndex[item.type];

            if(typeItems) {typeItems.push(item);}
            else {itemIndex[item.type] = [item];}
        }
    }

    /**
     * Using a shortcut here to avoid dealing with commas in item names.
     * Assumes that there are only three properties per line.
     * @param response
     */
    function parseItemsResponse(response) {
        var items = [];
        var lines = response.split('\n');
        for(var i = 0;i < lines.length;i++) {
            items.push(parseItemLine(lines[i]));
        }

        return items;
    }

    function parseItemLine(line) {
        var firstComma = line.indexOf(',');
        var lastComma = line.lastIndexOf(',');

        var id = line.slice(0, firstComma);
        var name = line.slice(firstComma+1, lastComma);
        var typeId = line.slice(lastComma+1, line.length);
        var type = getTypeWithId(typeId);

        return new Item(id, name, type);
    }

    function indexBossDrops(response) {
        var lines = response.split('\n');
        for(var i = 0;i < lines.length;i++) {
            var line = lines[i];
            var comma = line.indexOf(',');

            var itemId = line.slice(0, comma);
            var bossName = line.slice(comma+1, line.length);

            var bossItems = bossDrops[bossName];
            if(bossItems) {bossItems.push(itemId);}
            else {bossDrops[bossName] = [itemId];}
        }
    }

    function getTypeWithId(typeId) {
        for(var i = 0;i < itemTypes.length;i++) {
            if(itemTypes[i].id === typeId) {
                return itemTypes[i];
            }
        }
    }
}