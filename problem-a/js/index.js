'use strict';

/* your code goes here! */

class Task {
  constructor(newDescription, newIsComplete) {
    this.description = newDescription;
    this.complete = newIsComplete;
  }

  render() {
    let elem = document.createElement('li');
    elem.textContent = this.description;
    if (this.complete) { // if task is complete
      elem.classList.add('font-strike');
    }

    elem.addEventListener('click', () => {
      console.log('You clicked me');
      this.toggleFinished();
      elem.classList.toggle('font-strike');
    })

    return elem;
  }

  toggleFinished() {
    this.complete = !this.complete; // make opposite of what it was 
  }
}

class TaskList {
  constructor(taskArray) {
    console.log("what is this this refer to:" + this);
    this.tasks = taskArray; //remember this.task is an array.
  }

  addTask(descriptionString) {
    let newTask = new Task(descriptionString, false);
    this.tasks.push(newTask); //add to end of array
  }

  render() {
    let olElem = document.createElement('ol');
    this.tasks.forEach((aTask) => {
      let liElem = aTask.render();
      olElem.appendChild(liElem);
    })
    return olElem;
  }
}


class NewTaskForm {
  constructor(whatFunctionToCallWhenSubmitted) {
    this.submitCallback = whatFunctionToCallWhenSubmitted;
  }


  render() {
    let formElem = document.createElement('form');

    //children
    let inputElem = document.createElement('input');
    inputElem.classList.add('form-control', 'mb-3');
    inputElem.setAttribute('placeholder', "What else do you have to do?");
    formElem.appendChild(inputElem);
    
    let buttonElem = document.createElement('button');
    buttonElem.classList.add('btn', 'btn-primary');
    buttonElem.textContent = "Add task to list";
    formElem.appendChild(buttonElem);

    buttonElem.addEventListener('click', (event) => {
      event.preventDefault();

      let inputValue = inputElem.value;

      let whatToDo = this.submitCallback;
      whatToDo(inputValue); // call this when submitted
    })

    return formElem;
  }
}

class App {
  constructor(newParentElement, newTaskList) {
    this.parentElement = newParentElement;
    this.taskList = newTaskList;
  }

  //doesn't return, but attackhes to the tree.
  render() {
    let listElem = this.taskList.render();
    this.parentElement.appendChild(listElem);

    let whoYouGonnaCall = (arg) => this.addTaskToList(arg); //pass function, not result by adding (), we are calling the function
    let formObj = new NewTaskForm(whoYouGonnaCall);
    this.parentElement.appendChild(formObj.render());
  }

  //what to do
  addTaskToList(descriptionString) {
    this.taskList.addTask(descriptionString);
    
    //refresh with new content
    this.parentElement.innerHTML = '';
    this.render();
  }
}


let aTask = new Task('A sample', false);
let taskListObj = new TaskList([aTask, new Task('A second task', true)]);


let appElem = document.querySelector('#app');
let appObj = new App(appElem, taskListObj);
appObj.render();

//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined') 
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined') 
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined') 
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined') 
    module.exports.App = App;
}
