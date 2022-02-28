class Item {

    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

}

class ItemArray {
    constructor() {
        this.list = [];
    }

    getItem(itemName) {
        // Return 'foundItem' of class Item whose name matches 'itemName'
        const foundItem = this.list.find(item => item.name === itemName);

        return foundItem;
    }

    addItem(newItem) {
        // Add 'newItem' of class Item to 'list' array of ItemArray instance
        this.list.push(newItem);
        return newItem;
    }

    modItem(itemName, newName, newPrice) {
        // Find 'foundItem' of class Item in 'list' array of ItemArray instance whose  
        // name matches 'itemName'. Modify 'foundItem' by 'newName' and 'newPrice'.
        // Return the updated item or undefined if no name matches 'itemName' in 
        // 'list' array.
        const foundItem = this.getItem(itemName);

        if (foundItem === undefined) return undefined;

        foundItem.name = newName;
        foundItem.price = newPrice;

        return foundItem;
    }

    removeItem(itemName) {
        // Find 'foundItemIndex' whose index is the item of class Item in 'list' array of 
        // ItemArray instance whose name matches 'itemName'. Remove this object from 'list' 
        // array. Return message object or undefined if no name matches 'itemName' in 
        // 'list' array.
        const foundItemIndex = this.list.findIndex(item => item.name === itemName);

        if (foundItemIndex === -1) return undefined;

        this.list.splice(foundItemIndex, 1);
        return { message: "Deleted" };
    }
}

global.items = new ItemArray();

module.exports = items;