//Switch between SIGNUP & SIGNIN
document.getElementById("show-signin").addEventListener("click", function(event) {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("signin-form").style.display = "block";
});

document.getElementById("show-signup").addEventListener("click", function(event) {
    document.getElementById("signin-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
});

// Signup form Hitting Backend server
document.getElementById("signup-btn").addEventListener("click", async function(){
    try{
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const name = document.getElementById("signup-name").value;
    
        const response = await axios.post("http://localhost:3001/signup",{
            email:email,
            password:password,
            name:name
        });

        console.log(response);
        console.log("Signed Up")

        alert("signed up")

        document.getElementById("signup-form").style.display = "none";
        document.getElementById("signin-form").style.display = "block";
    }
    catch(err){
        console.error(err);
    }
});

//Signin form Hitting Backend server
document.getElementById("signin-btn").addEventListener("click", async function(){
    const email=document.getElementById("signin-email").value;
    const password=document.getElementById("signin-password").value;

    try{   
        const response=await axios.post("http://localhost:3001/signin", {
            email:email,
            password:password
        })

        console.log(response);
        console.log("Signed In");

        alert("Signed In")

        document.getElementById("todo-page").style.display="block";
        document.getElementById("signin-form").style.display="none";

        localStorage.setItem("token",response.data.token);

        await fetchTodos();
    }
    catch(err){
        console.error(err)
    }
});



async function fetchTodos(){
    const token = localStorage.getItem("token");
    try{
        const response = await axios.get("http://localhost:3001/todos", {
            headers:{
                token:token
            }
        });

        const todos = response.data.todos;
        renderTodo(todos);

    }catch(err){
        console.error(err);
    }
}

function renderTodo(todos){
    const todoList =document.getElementById("todo-list");
    todoList.innerHTML="";

    for (let todo of todos){
        const li=document.createElement("li");
        const checkBox=document.createElement("input");
        checkBox.type="checkbox";
        checkBox.checked = todo.status;

        checkBox.addEventListener("change", async function(){
            const token = localStorage.getItem("token");
            const updatedStatus=checkBox.checked;

            try{
                await axios.put("http://localhost:3001/update",{
                    todoId:todo._id,
                    task:todo.task,
                    status:updatedStatus
                },{
                    headers:{
                        token:token
                    }
                    
                });
            }catch(err){
                console.error(err)
            }
        })


        const span = document.createElement("span");
        span.innerText= todo.task;

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.setAttribute("class", "editBtn");

        let isEditing = false;
        let input = null;

        editBtn.addEventListener("click", async function () {
            const token = localStorage.getItem("token");

            if (!isEditing) {
                // Switch to edit mode
                input = document.createElement("input");
                input.type = "text";
                input.value = span.innerText;
                li.replaceChild(input, span);
                editBtn.innerText = "Save";
                isEditing = true;
            } else {
                // Save changes
                const updatedTask = input.value;
                try {
                    await axios.put("http://localhost:3001/update", {
                        todoId: todo._id,
                        task: updatedTask
                    }, {
                        headers: {
                            token: token
                        }
                    });

                    await fetchTodos();
                } catch (err) {
                    console.error(err);
                }
            }
        });


           

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText="Delete";
        deleteBtn.setAttribute("class", "deleteBtn")
        deleteBtn.addEventListener("click", async function(){
            const token = localStorage.getItem("token");
        
            try{
                await axios.delete("http://localhost:3001/delete", {
                    headers:{
                        token:token
                    },
                    data: {
                        todoId: todo._id
                    }
                });
        
                await fetchTodos();
            }catch(err){
                console.error(err);
            }
        });

        li.appendChild(checkBox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }
}


document.getElementById("add-todo-btn").addEventListener("click", async function(){
    const task = document.getElementById("new-todo").value;
    const token=localStorage.getItem("token");

    try{
        const response = await axios.post("http://localhost:3001/create", {
            task:task
        },{
            headers:{
                token:token
            }
        });
    document.getElementById('new-todo').value="";
    await fetchTodos();
    }
    catch(err){
        console.error(err);
    }
});



