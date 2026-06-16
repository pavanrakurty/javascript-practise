let todo = [];

renderToDoList();

function UpdateToDoList(){
  const item = document.querySelector('.todo-value').value;
  todo.push(item);
  localStorage.setItem('todo-item', JSON.stringify(todo));
  console.log(todo);
  document.querySelector('.todo-value').value = '';
  renderToDoList();
}

function UpdateToDoListKeyDown(event){
  if (event.key==='Enter'){
    UpdateToDoList();
  }
}

function renderToDoList(){
  let toDOList = '';
  for (let i=0; i<todo.length; i++){
    toDOList += `<p>
                  ${todo[i]}
                <button onClick=
                  "
                  todo.splice(${i},1);
                  renderToDoList();
                  "
                >Delete</button>  
                </p>`;
  }
  document.querySelector('.todo-list').innerHTML = toDOList;
}