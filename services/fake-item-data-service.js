function FakeItemDataService() {

    this.getTypes = function() {
        return [
            new ItemType("Helm", "images/items/helm.png"),
            new ItemType("Amulet", "images/items/amulet.png"),
            new ItemType("Chest", "images/items/chest.png"),
            new ItemType("Weapon", "images/items/weapon.png"),
            new ItemType("Gloves", "images/items/gloves.png"),
            new ItemType("Ring One", "images/items/ring.png"),
            new ItemType("Belt", "images/items/belt.png"),
            new ItemType("Trinket One", "images/items/trinket.png"),
            new ItemType("Boots", "images/items/boots.png"),
            new ItemType("Trinket Two", "images/items/trinket.png"),
            new ItemType("Pants", "images/items/pants.png"),
            new ItemType("Ring Two", "images/items/ring.png"),
            new ItemType("Bracers", "images/items/bracers.png"),
            new ItemType("Off-Hand", "images/items/shield.png"),
            new ItemType("Shoulders", "images/items/shoulders.png"),
            new ItemType("Cloak", "images/items/cloak.png")
        ];
    }

    this.getIcon = function(itemId) {
        return "images/chest.png";
    }
}