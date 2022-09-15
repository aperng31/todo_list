import itemCreator from './item.js'

const projectCreator = (title, desc) => {
    let itemList = [];
    let myTitle = title;
    let myDesc = desc;
    let myID;

    const getTitle = () => {
        return myTitle;
    }
    const getDesc = () => {
        return myDesc;
    }
    const getItems = () => {
        return itemList;
    }
    const getID = () => {
        return myID;
    }
    const setID = (id) => {
        myID = id;
    }

    const addItem = (name, desc, priority) => {
        const newItem = itemCreator(name, desc, priority);
        let ind;
        if (itemList.length == 0) { //if first item
            itemList.push(newItem);
            ind = 1;
        }
        else {
            for (let i = 0; i < itemList.length; i++) {
                if (itemList[i].getPriority() < newItem.getPriority()) {
                    itemList.splice(i, 0, newItem);
                    ind = i + 1;
                    return [ newItem, ind ];
                }
            }
            itemList.push(newItem); //if escapes forloop, will add newItem to end of itemList
        }
        return [ newItem, ind ]; //return location for child insert
    }

    const deleteItem = (item) => {
        const ind = itemList.indexOf(item);
        itemList.splice(ind, 1);
        return ind + 1;

    }


    return { getTitle, getDesc, getItems, addItem, getID, setID, deleteItem }
}

export default projectCreator;