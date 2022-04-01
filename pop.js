//intialize
if(localStorage.getItem("TodoList")==null)
{
    (function intializeLocal() {
    let TodoList=[];
    let TodoListInJSON=JSON.stringify(TodoList);
    localStorage.setItem("TodoList",TodoListInJSON);
    })();
}
else
{
    console.log("intilaize refresh");
    refresh();
}

//pressing Enter 
document.querySelector(".newTask").addEventListener("keyup",function (event) {
    if(event.keyCode===13){
        document.querySelector(".addButton").click();
    }
})
//creating new Task
document.querySelector(".addButton").addEventListener("click",createTask);

function createTask() {
    console.log("create task");
    const newTaskObject={
    task:document.querySelector(".newTask").value.toUpperCase(),
    checkStatus:0
    }
    let TodoList=fetchItems();
    TodoList.push(newTaskObject);
    saveItems(TodoList);
    console.log("called refresh");
    document.querySelector(".newTask").value='';
    refresh();
}

function fetchItems() {
    let TodoListInJSON=localStorage.getItem("TodoList");
    return JSON.parse(TodoListInJSON);
}

function saveItems(TodoList) {
    let TodoListInJSON=JSON.stringify(TodoList);
    localStorage.setItem("TodoList",TodoListInJSON);
}

//refresh list every time you add new element
function refresh() {
    console.log("refreshed");
    let TodoList=fetchItems();  /* Todolist = [{},{},{},....] */
    if(TodoList.length!==0){
        let TodoListHtml="";
        for(let i=0;i<TodoList.length;i++){
            if(TodoList[i].checkStatus===1){
                //! why list{i} overwrites strikeout when we use js to do it..?
                TodoListHtml+=`<li><input class="checkbox${i} checkbox"  type="checkbox" checked="checked">
                                <span class="strikeOut list${i}">${TodoList[i].task}</span>
                                </input><i class="fa-solid fa-trash" id="trash${i}" aria-hidden="true"></i></li>`;
            }else{
                TodoListHtml+=`<li><input class="checkbox${i} checkbox" type="checkbox" >
                                <span class="list${i}">${TodoList[i].task}</span>
                                </input><i class="fa-solid fa-trash" id="trash${i}" aria-hidden="true" ></i></li>`;
            }
        }
        document.querySelector(".tasks").innerHTML=TodoListHtml;
        attachListener();
    }
}
//attaching checkbox listener to each item
function attachListener() {
    //! as inline event handler like onclick are not allowed 
    let item=document.querySelectorAll('.checkbox');
    for(let i=0;i<item.length ;i++){
        item[i].addEventListener("click",(e)=>updateStatus(e));
    }

    let trash=document.querySelectorAll(".fa-trash");
    for(let i=0;i<trash.length;i++){
        trash[i].addEventListener("click",(e)=>deleteItem(e));
    }
}
//Checking checkbox to strikeout 
function updateStatus(event) {
    // console.log(event);
    let index = parseInt((event.path[0].classList[0]).slice(-1));
    console.log(index);
    let TodoList = fetchItems();
    if(TodoList[index].checkStatus===1){
        //document.querySelector(`.list${index}`).style.textDecoration="none";
        TodoList[index].checkStatus=0;
        console.log("checkStatus set to 0");
        saveItems(TodoList);
    }else{
        //document.querySelector(`.list${index}`).style.textDecoration="line-through";
        TodoList[index].checkStatus=1;
        console.log("checkStatus set to 1");
        saveItems(TodoList);
    }
    location.reload();
}

function deleteItem(event) {
    console.log(event.path[0].id);
    let index = parseInt((event.path[0].id).slice(-1));
    console.log(index);
    //document.querySelector(`.list${index}`).remove();
    let TodoList= fetchItems();
    TodoList.splice(index,1);
    saveItems(TodoList);
    location.reload();
}
