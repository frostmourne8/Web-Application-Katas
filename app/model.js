
function ItemType(id, icon) {
    this.id = id;
    this.icon = icon;
}

function ItemSlot(name, type) {
    this.name = name;
    this.type = type;
    this.icon = type.icon;
}

function Item(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
}

function Character(id, name, server, image) {
    this.id = id;
    this.name = name;
    this.server = server;
    this.image = image;
}

function WishList(character, items, collectedItems) {
    this.character = character;
    this.items = items ? items : {};
    this.collectedItems = collectedItems ? collectedItems : {};

    this.addItem = function(item) {
        this.items[item.type] = item;
    }

    this.addCollectedItem = function(item) {
        this.collectedItems[item.type] = item;
    }

    this.removeCollectedItem = function(item) {
        this.collectedItems[item.type] = undefined;
    }

    this.getItemForType = function(itemType) {
        return this.items[itemType];
    }

    this.isCollected = function(item) {
        var collectedItem = this.collectedItems[item.type];
        return collectedItem ? collectedItem.id === item.id : false;
    }
}

function Character(id, name, server, image) {
    this.id = id;
    this.name = name;
    this.server = server;
    this.image = image;
}

function Boss(name, drops, image) {
    this.name = name;
    this.drops = drops;
    this.image = image;
}

function Raid(name, bosses, image) {
    this.name = name;
    this.bosses = bosses;
    this.image = image;
}

function RaidRun(raid) {
    this.raid = raid;
    this.currentBossIndex = 0;
    this.collectedItems = [];

    this.getCurrentBoss = function() {
        return this.raid.bosses[this.currentBossIndex];
    }

    this.addCollectedItem = function(item) {
        this.collectedItems.push(item);
    }
}