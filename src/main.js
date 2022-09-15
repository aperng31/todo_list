//import itemCreator from './item.js';
import projectCreator from './project.js';

const main = (() => { //IIFE
    let projectList = [];
    let currProj = 0;

    const addProject = (title, desc) => {
        const newProj = projectCreator(title, desc);
        projectList.push(newProj);
        return newProj;
    }
    const deleteProject = (proj) => {
        const ind = projectList.indexOf(proj);
        let tempObj;
        projectList.splice(ind, 1);
        if (currProj == ind) { //if deleted current project
            if (ind == projectList.length) { //deleted final project
                tempObj = projectList[projectList.length - 1];
                //later set curr proj to tempObj
            }
            else {
                tempObj = projectList[ind];
            }
        }
        if (projectList.length == 0) { //deleted last project
            tempObj = 1;
        }

        return [ ind + 1, tempObj ]; //return +1 for child deletion and new current project if necessary
    }
    const getProjects = () => {
        return projectList;
    }
    const getCurr = () => {
        return projectList[currProj];
    }
    const setCurr = (proj) => {
        const ind = projectList.indexOf(proj);
        currProj = ind; //or pass in project and use indexof?
        return ind + 1;
    }
    return { addProject, deleteProject, getCurr, setCurr, getProjects }
})();

export default main;


