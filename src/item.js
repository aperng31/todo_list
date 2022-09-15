
const itemCreator = (title, desc, priority) => {

    let myTitle = title;
    let myDesc = desc;
    let myPriority;
    if (priority === 'high') {
        myPriority = 3;
    }
    else if (priority === 'medium') {
        myPriority = 2;
    }
    else {
        myPriority = 1;
    }
    let done = false;
    let myId;

    const getTitle = () => { 
        return myTitle;
    }
    const getDesc = () => {
        return myDesc;
    }
    const getPriority = () => {
        return myPriority;
    }
    const getID = () => {
        return myID;
    }

    const toDone = () => {
        if (!done) {
            done = true;
        }
        else {
            done = false;
        }
        return done;
    }

    return { getTitle, getDesc, getPriority, toDone }
}

export default itemCreator;