let todo = [];

renderToDoList();

function UpdateToDoList(){
  const name = document.querySelector('.todo-value').value;
  const dueDate = document.querySelector('.due-date').value;
  
  // todo.push({name: name, dueDate:dueDate});
  todo.push({name,dueDate});
  document.querySelector('.todo-value').value = '';
  document.querySelector('.due-date').value = '';
  renderToDoList();
}

function UpdateToDoListKeyDown(event){
  if (event.key==='Enter'){
    UpdateToDoList();
  }
}

function renderToDoList(){
  let toDOList = '';
  todo.forEach((toDoObject, i) => {
    const {name, dueDate} = toDoObject;
    toDOList += `
                <div>${name}</div>
                <div>${dueDate}</div>
                <button onClick=
                  "
                  todo.splice(${i},1);
                  renderToDoList();
                  "
                  class = "delete-button"
                >Delete</button>`;

  });

  // for (let i=0; i<todo.length; i++){
  //   toDOList += `
  //               <div>${todo[i]['name']}</div>
  //               <div>${todo[i]['dueDate']}</div>
  //               <button onClick=
  //                 "
  //                 todo.splice(${i},1);
  //                 renderToDoList();
  //                 "
  //                 class = "delete-button"
  //               >Delete</button>`;
  // }
  document.querySelector('.todo-list').innerHTML = toDOList;
}