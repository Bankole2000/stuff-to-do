M.AutoInit();

// DEFINE UI VARIABLES (GET ELEMENTS)
const form = document.querySelector('#todo-form');
const addButton = document.getElementById('submitButton');
const todoList = document.querySelector('.collection');
const clearList = document.querySelector('.clear-todo');
const todoInput = document.querySelector('#todo');
const filter = document.querySelector('#filter');
const toastTime = 1300;

// RUN DECLARED LOAD ALL EVENT LISTENERS FUNCTION
loadEventListeners();

// LOAD RANDOM TODO INPUT PLACEHOLDERS
loadRandomPlaceholder();

// LOAD todo COUNTER BADGE
todoCounter();

// DECLARE loadEventListeners() FUNCTION
function loadEventListeners(){
  // DOM LOAD EVENT
  document.addEventListener('DOMContentLoaded', getTodos);

  // ADD TODO EVENT LISTENER (FORM SUBMIT) - CALLS addTodo FUNCTION
  form.addEventListener('submit', addTodo);
  
  // ADD ADD TO DO BUTTON CLICK EVENT
  addButton.addEventListener('click', addTodo);

  // DELETE TODO EVENT LISTENER / DELEGATOR (X CLICK) - CALLS removeTodo FXN 
  todoList.addEventListener('click', removeTodo);

  // CLEAR TODO LIST EVENT HANDLER
  clearList.addEventListener('click', clearTodo);

  // FILTER TODO LIST EVENT HANDLER
  filter.addEventListener('keyup', filterTodo);
}

// GET TODOS FROM LOCAL STORAGE
function getTodos(){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(tod){
    // CREATE ELEMENTS TO ADD and ADD ELEMENT CLASSES
    const todo = document.createElement('li');
    const link = document.createElement('a');
    link.innerHTML = `<i class="material-icons">cancel</i>`;
    link.className = "delete-item secondary-content";
    todo.className = "collection-item";

    // APPEND CREATED ELEMENTS TO DOM
    todo.appendChild(link);
    todo.appendChild(document.createTextNode(tod));
    todoList.appendChild(todo);
  })
  todoCounter();
}

// addTodo FUNCTION DECLARATION 
function addTodo(e){
  if(todoInput.value === ''){
    M.toast({html: 'No to do Item', displayLength: toastTime});
    loadRandomPlaceholder();
  } else {

    // CREATE ELEMENTS TO ADD and ADD ELEMENT CLASSES
    const todo = document.createElement('li');
    const link = document.createElement('a');
    link.innerHTML = `<i class="material-icons">cancel</i>`;
    link.className = "delete-item secondary-content";
    todo.className = "collection-item";

    // APPEND CREATED ELEMENTS TO DOM
    todo.appendChild(link);
    todo.appendChild(document.createTextNode(todoInput.value));
    todoList.appendChild(todo);
    
    // CALL FUNCTION TO STORE TODO IN LOCAL STORAGE
    storeTodoInLocalStorage(todoInput.value);
    loadRandomPlaceholder();   // REPLACE RANDOM PLACEHOLDER
    M.toast({html: 'To Do Item Added', displayLength: toastTime}); // MATERIALIZE ALERT
    todoCounter(); // REFRESH BADGE TODO COUNTER
  }
  e.preventDefault(); // PREVENT FORM DEFAULT BEHAVIOUR
}

// DECLARED FUNCTION TO STORE TODO ITEM IN LOCAL STORAGE
function storeTodoInLocalStorage(todo){
  let todos; // INITIALIZE TODO ARRAY
  if(localStorage.getItem('todos') === null){ // IF LOCAL STORAGE EMPTY
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo); // ADD TO TODO ARRAY
  localStorage.setItem('todos',JSON.stringify(todos)); // STORE IN LOCAL STORAGE
}

// DECLARED FUNCTION TO REMOVE TODO
function removeTodo(e){
  // USE CONDITIONALS TO DELEGATE EVENT HANDLING
  if(e.target.parentElement.classList.contains('delete-item')){
    
    // CONFIRM DELETION USING WINDOW.CONFIRM METHOD
    // if(confirm('Delete this Todo Item?')){  // COMMENTED OUT CONFIRMATION COZ IT WAS ANNOYING

    // CALL REMOVE FROM LOCAL STORAGE FUNCTION
    removeTodoFromLocalStorage(e.target.parentElement.parentElement);

    e.target.parentElement.parentElement.remove(); // MOVE TO LI ELEMENT AND REMOVE FROM DOM  
    let delToast = '<span>Removed ToDo Item</span><button class="btn-flat toast-action" onclick="undoDelete(e.target.parentElement.parentElement)">Undo</button>';
  
    M.toast({html: delToast, displayLength: toastTime});
    loadRandomPlaceholder();
    todoCounter();
    
  // }
}}

// DECLARE REMOVE FROM LOCAL STORAGE FUNCTION
function removeTodoFromLocalStorage(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(tod, index){
    if(todo.childNodes[1].textContent === tod){
      todos.splice(index, 1);
    }
  });

  localStorage.setItem('todos',JSON.stringify(todos));
  console.log(todo.childNodes[1].textContent);
}

function clearTodo(e){
  // if(confirm('Delete ALL ToDo Items?')){ // COMMENTED OUT CONFIRMATION COZ IT WAS ANNOYING
    //  WE COULD SAY
    // todoList.innerHTML = '';
    
    // OR WE USE WHILE LOOD (WHICH IS FASTER)
    while(todoList.firstChild){
      todoList.removeChild(todoList.firstChild);
    };

    // CALL CLEAR TODOS FROM LOCAL STORAGE FUNCTION
    clearTodosFromLocalStorage();

    M.toast({html: 'Cleared ToDo List', displayLength: toastTime});
    loadRandomPlaceholder();
    todoCounter();
  // }
}

// DECLARE CLEAR TODOS FROM LOCAL STORAGE FUNCTION 
function clearTodosFromLocalStorage(){
  localStorage.clear();
}


function filterTodo(e){ 
  // GET LIVE FEED FROM FILTER INPUT AND CONVERT TO LOWER CASE
  const search = e.target.value.toLowerCase();
  
  // GET CURRENT TO DO LIST ITEMS IN A NODE LIST
  const currentList = document.querySelectorAll('.collection-item');
  
  // LOOP THROUGH NODE LIST. ITEM ARG IS SINGLE ARRAY ELEMENT IN NODE LIST
  currentList.forEach(function(item){  // INDEX -1
    if(item.textContent.toLowerCase().indexOf(search) != -1){
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function todoCounter(){
  const counter = document.getElementById('counter');
  const getList = Array.from(document.querySelectorAll('.collection-item'));
  if(getList.length === 0){
    counter.style.display='none';
  } else {
    counter.style.display = 'block';
    counter.innerText = getList.length;
  }
  console.log(getList);
}

function loadRandomPlaceholder(){
  todoInput.value='';
  const placeHolders = ['Form Blazing Sword (Requires; Form Voltron)','Find Aquaman\'s Gym','Call Carly Rae Jepsen (maybe)','Research Flat Earth','Bring World Peace','End Human Suffering','Play Zelda','Check the G-difuser system','Be Awesome','Watch Netflix','Keep Calm and <insert random action here>','Meditate','Catch that Legendary Pokemon','Bargain with Dormamu','Get Rich (Or die trying)','Fall in Love again','Play Final Fantasy','Watch Game of Thrones','Form Voltron (Requires: Activated Interlock)','Save Martha (Kent, Wayne, Stewart?)','Do the laundry','Become the Dragon Warrior','Find \'The One\'','Build the Wall - Lock Her UP! MAGA!','Make Africa Great Again','Stay Chill','Teach John Snow something','Defeat Thanos','Drink some Covfefe','Save Louis Lane','Conquer Westeros','Tell them the Koko','Summer trip to WinterFell','Finish the never-ending Story','Let it gooo - Let it gooo','Preemptively Kidnap Princess Peach','Do a real-life Hadouken','Avengers Meetup: Thanos SWOT analysis','Learn React & Vue & Angular & Node & Express & ...','Go Shoplifting','Give my baby Assurance','Un-f**k Things up','Vote','Try Softer','Stop ISIS','Become President','Start giving a sh*t (multiple, if possible)','Be Best','Schedule Boss Baby Meeting','Weaponize Indomie','Summon the Power Rangers'];
  console.log(placeHolders.length);
  const index = Math.floor((Math.random()*50) +1);
  todoInput.setAttribute('placeholder', placeHolders[index]);
}

