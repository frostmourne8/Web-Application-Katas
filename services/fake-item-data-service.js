function FakeItemDataService() {

    var HELM = new ItemType("Helm", "images/items/helm.png");
    var NECK = new ItemType("Amulet", "images/items/amulet.png");
    var CHEST = new ItemType("Chest", "images/items/chest.png");
    var GLOVES = new ItemType("Gloves", "images/items/gloves.png");
    var BRACERS = new ItemType("Bracers", "images/items/bracers.png");
    var SHOULDERS = new ItemType("Shoulders", "images/items/shoulders.png");
    var CLOAK = new ItemType("Cloak", "images/items/cloak.png");
    var BELT = new ItemType("Belt", "images/items/belt.png");
    var BOOTS = new ItemType("Boots", "images/items/boots.png");
    var PANTS = new ItemType("Pants", "images/items/pants.png");
    var WEAPON = new ItemType("Weapon", "images/items/weapon.png");
    var OFF_HAND = new ItemType("Off-Hand", "images/items/shield.png");
    var TRINKET_ONE = new ItemType("Trinket One", "images/items/trinket.png");
    var TRINKET_TWO = new ItemType("Trinket Two", "images/items/trinket.png");
    var RING_ONE = new ItemType("Ring One", "images/items/ring.png");
    var RING_TWO = new ItemType("Ring Two", "images/items/ring.png");

    this.getTypes = function() {
        return [
            HELM,
            NECK,
            CHEST,
            WEAPON,
            GLOVES,
            RING_ONE,
            BELT,
            TRINKET_ONE,
            BOOTS,
            TRINKET_TWO,
            PANTS,
            RING_TWO,
            BRACERS,
            OFF_HAND,
            SHOULDERS,
            CLOAK
        ];
    }

    this.getItemsOfType = function(itemType) {
        var items = [];
        for(var i = 0;i < 5;i++) {
            items.push(createFakeItem(itemType, i));
        }

        return items;
    }

    this.getIcon = function(itemId) {
        return "http://media.blizzard.com/wow/icons/56/inv_gizmo_02.jpg";
    }

    this.getInfo = function(itemId) {
        return {
            "id": itemId,
            "disenchantingSkillRank": 225,
            "description": "Property of Finkle Einhorn, Grandmaster Adventurer",
            "name": "Finkle's Lava Dredger",
            "icon": "inv_gizmo_02",
            "stackable": 1,
            "itemBind": 1,
            "bonusStats": [{
            "stat": 51,
            "amount": 15
        }, {
            "stat": 5,
            "amount": 24
        }, {
            "stat": 6,
            "amount": 22
        }, {
            "stat": 7,
            "amount": 25
        }],
            "itemSpells": [],
            "buyPrice": 474384,
            "itemClass": 2,
            "itemSubClass": 5,
            "containerSlots": 0,
            "weaponInfo": {
            "damage": {
                "min": 159,
                    "max": 239,
                    "exactMin": 159.28119,
                    "exactMax": 239.0
            },
            "weaponSpeed": 2.9,
                "dps": 68.66917
        },
            "inventoryType": 17,
            "equippable": true,
            "itemLevel": 70,
            "maxCount": 0,
            "maxDurability": 120,
            "minFactionId": 0,
            "minReputation": 0,
            "quality": 4,
            "sellPrice": 94876,
            "requiredSkill": 0,
            "requiredLevel": 60,
            "requiredSkillRank": 0,
            "itemSource": {
            "sourceId": 179703,
                "sourceType": "GAME_OBJECT_DROP"
        },
            "baseArmor": 0,
            "hasSockets": false,
            "isAuctionable": false,
            "armor": 0,
            "displayInfoId": 31265,
            "nameDescription": "",
            "nameDescriptionColor": "000000",
            "upgradable": false,
            "heroicTooltip": false
        }
    }

    function createFakeItem(itemType, index) {
        var name = 'Fake' + itemType.name + ' ' + index;
        var id = name + 'id';

        return new Item(id, name, itemType);
    }
}