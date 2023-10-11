document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.querySelector(".task-input");
    const addButton = document.querySelector(".add-button");
    const todoList = document.querySelector(".todo-items");

    
    loadTasksFromLocalStorage();

    
    addButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const listItem = createTaskElement(taskText);
            todoList.appendChild(listItem);
            taskInput.value = "";
            saveTaskToLocalStorage();
        }
    });

  
    function createTaskElement(taskText) {
        const listItem = document.createElement("li");
        listItem.classList.add("item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        listItem.appendChild(checkbox);

        const taskDescription = document.createElement("span");
        taskDescription.textContent = taskText;
        listItem.appendChild(taskDescription);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger", "btn-close", "delete-button");
        deleteButton.innerHTML = '<i class="fas fa-times"></i>';
        deleteButton.addEventListener("click", function () {
            listItem.remove();
            saveTaskToLocalStorage();
        });
        listItem.appendChild(deleteButton);

        return listItem;
    }

   
    todoList.addEventListener("change", function (event) {
        const checkbox = event.target;
        if (checkbox.classList.contains("checkbox")) {
            const listItem = checkbox.closest(".item");
            if (checkbox.checked) {
                listItem.classList.add("completed");
            } else {
                listItem.classList.remove("completed");
            }
            saveTaskToLocalStorage();
        }
    });

    const filters = document.querySelectorAll(".filters span");
    filters.forEach((filter) => {
        filter.addEventListener("click", function () {
            filters.forEach((f) => f.classList.remove("active"));
            filter.classList.add("active");

            const filterId = filter.id.toLowerCase();
            todoList.querySelectorAll(".item").forEach((task) => {
                task.style.display = "block";
                if (filterId === "complete" && !task.querySelector(".checkbox").checked) {
                    task.style.display = "none";
                } else if (filterId === "pending" && task.querySelector(".checkbox").checked) {
                    task.style.display = "none";
                }
            });
        });
    });

    
    function saveTaskToLocalStorage() {
        const tasks = [];
        todoList.querySelectorAll(".item").forEach((task) => {
            const taskText = task.querySelector("span").textContent;
            const isCompleted = task.querySelector(".checkbox").checked;
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    
    function loadTasksFromLocalStorage() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach((task) => {
            const listItem = createTaskElement(task.text);
            if (task.completed) {
                listItem.querySelector(".checkbox").checked = true;
                listItem.classList.add("completed");
            }
            todoList.appendChild(listItem);
        });
    }
});
