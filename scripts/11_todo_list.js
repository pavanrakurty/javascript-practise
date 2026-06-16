let todo = JSON.parse(localStorage.getItem('todo-item')) || [];

function UpdateToDoList(){
  const item = document.querySelector('.todo-value').value;
  todo.push(item);
  localStorage.setItem('todo-item', JSON.stringify(todo));
  console.log(todo);
  document.querySelector('.todo-value').value = '';
}

function UpdateToDoListKeyDown(event){
  if (event.key==='Enter'){
    UpdateToDoList();
  }
}