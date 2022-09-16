import trash from './trash-can-outline.png';
import main from './main.js';
import './index.css';
import './sidebar.css';
import './main.css';

const DOM_cont_proj = (() => { //IIFE

    const projTitle = document.querySelector('#project_title');
    const projDesc = document.querySelector('#project_desc');
    const projects = document.querySelector('#projects'); //select parent instead of all children so don't have to keep updating

    const addProjButton = document.querySelector('#add_project_button');
    addProjButton.onclick = () => {
        //console.log(projTitle.value);
        const newProj = main.addProject(projTitle.value, projDesc.value);
        addProject(newProj);
        projTitle.value = '';
        projDesc.value = '';
    }

    const addProject = (newProj) => {  //add project info to DOM, including delete button.
        const newLi = document.createElement('li');
        newLi.classList.add('project');

        const newDiv = document.createElement('div');
        newDiv.innerHTML = newProj.getTitle();
        
        newDiv.addEventListener('click', () => changeProject(newProj)); //when clicked, sets current project

        //add delete button
        const delButton = document.createElement('input'); //image button to respond to 'click' to delete row and book
        delButton.type = "image";
        delButton.src = trash;
        delButton.classList.add = "delButton";
        delButton.alt = "Delete Book";
        delButton.onclick = () => { //button event that corres w/ project
            deleteProject(newProj);
        }
        newLi.appendChild(delButton);
        newLi.appendChild(newDiv);
        projects.appendChild(newLi);
        if (projects.childElementCount == 1) { //if previously no projects
            DOM_cont_item.greyList(false);
            DOM_cont_item.itemPop(newProj);
        }
        changeProject(newProj);
    }

    const deleteProject = (proj) => {  
        const indObj = main.deleteProject(proj); //will give which child to delete
        const delRow = document.querySelector(`#projects li:nth-child(${indObj[0]})`); //select li to delete
        delRow.remove();
        //if returns an object, means that 
        console.log(indObj[1] == undefined);
        if (indObj[1] != undefined) {
            if (indObj[1] === 1) { //no more projects, so just clear
                DOM_cont_item.clearTable();
                DOM_cont_item.greyList(true);
            }
            else {
                changeProject(indObj[1]);
            }
        } 

    }

    const changeProject = (proj) => {//switch to curr project
        if (main.getCurrChild()) { //make sure that there is an existing project
            const currChild = document.querySelector(`#projects li:nth-child(${main.getCurrChild()}`);
            currChild.classList.remove('clicked');
        }
        //get child number, add class to corres child
        const newCurr = document.querySelector(`#projects li:nth-child(${main.setCurr(proj)}`);
        newCurr.classList.add('clicked');
        DOM_cont_item.clearTable();
        DOM_cont_item.itemPop(proj);


    }

    return { addProject }
})();

const DOM_cont_item = (() => {
    const itemName = document.querySelector('#item_title')
    const itemDesc = document.querySelector('#item_desc')
    const itemPriority = document.querySelector('#item_priority')
    const tbody = document.querySelector('#tbody');

    const currTitle = document.querySelector('#current_project');
    const currDesc = document.querySelector('#current_project_desc');

    const addItemButton = document.querySelector('#add_item_button');
    addItemButton.onclick = () => {
        //console.log(main.getCurr());
        const newItemInd = main.getCurr().addItem(itemName.value, itemDesc.value, itemPriority.value);
        addItem(newItemInd[0], newItemInd[1]); //array of newItem and ind
        itemName.value = '';
        itemDesc.value = '';
        itemPriority.value = '';
    }

    const addItem = (newItem, ind) => {
        const newTr = document.createElement('tr');
        newTr.classList.add('item');

        const doneTd = document.createElement('td');
        const done = document.createElement('input');
        done.type = 'checkbox';
        done.addEventListener('change', () => newItem.toDone() ? newTr.classList.add('done') : newTr.classList.remove('done'));
        doneTd.appendChild(done);
        newTr.appendChild(doneTd);

        const titleTd = document.createElement('td');
        titleTd.innerHTML = newItem.getTitle(); 
        newTr.appendChild(titleTd);

        const descTd = document.createElement('td');
        descTd.innerHTML = newItem.getDesc();
        newTr.appendChild(descTd);

        const priorityTd = document.createElement('td');
        priorityTd.innerHTML = newItem.getPriority();
        newTr.appendChild(priorityTd);

        //add delete button
        const delTd = document.createElement('td');
        const delButton = document.createElement('input'); //image button to respond to 'click' to delete row and book
        delButton.type = "image";
        delButton.src = trash;
        delButton.classList.add = "delButton";
        delButton.alt = "Delete Book";
        delButton.onclick = () => { //button event that corres w/ project
            deleteItem(newItem);
        }
        delTd.appendChild(delButton);
        newTr.appendChild(delTd);

        if (ind != undefined) {
            const refNode = document.querySelector(`#tbody tr:nth-child(${ind})`)
            tbody.insertBefore(newTr, refNode);
        }
        else {
            tbody.appendChild(newTr);
        }        
    }

    const deleteItem = (item) => {
        const currProj = main.getCurr();
        const ind = currProj.deleteItem(item); //will give which child to delete
        const delRow = document.querySelector(`#tbody tr:nth-child(${ind})`); //select li to delete
        delRow.remove();
    }
    
    const itemPop = (project) => {
        currTitle.innerHTML = project.getTitle();
        currDesc.innerHTML = project.getDesc();
        let list = project.getItems();
        for(let i = 0; i < list.length; i++) {
            addItem(list[i]); //populate in DOM, but don't actually change project itself in main
        }
        //iterate through items of current project when selected and populate info to #table
        //use addItem function to each elem in array
    }

    const clearTable = () => {
        tbody.innerHTML = '';
        currTitle.innerHTML = '';
        currDesc.innerHTML = '';
    }

    const greyList = (bool) => {
        itemName.disabled = bool;
        itemDesc.disabled = bool;
        itemPriority.disabled = bool;
        addItemButton.disabled = bool;
        currTitle.innerHTML = 'add a project and start adding items!' ;
        currDesc.innerHTML = '(no more work to do?)';
    }

    return { itemPop, clearTable, greyList, addItem };
})();

let proj1 = main.addProject('Lorem Ipsum', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book');
DOM_cont_proj.addProject(proj1);
DOM_cont_proj.addProject(main.addProject(2, 22))
DOM_cont_proj.addProject(main.addProject(3, 33))

const temp1 = main.getCurr().addItem('Loremus Ipsumus', 'Contrary to popular belief, Lorem Ipsum is not simply random text.', 'high');
DOM_cont_item.addItem(temp1[0], temp1[1]); //array of newItem and ind

const temp2 = main.getCurr().addItem('Loremius Ispsumius', 'There are many variations of passages of Lorem Ipsum available', 'low');
DOM_cont_item.addItem(temp2[0], temp2[1]); //array of newItem and ind