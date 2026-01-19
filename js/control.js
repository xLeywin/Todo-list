const inputTask = document.querySelector(".input-task");
const btnAddTask = document.querySelector(".btn-add-task");
const listArea = document.querySelector(".list-area");

/* LISTENERS */
btnAddTask.addEventListener("click", function () {
    if (!inputTask.value) return;
    createTask(inputTask.value);
    clearInput();
});

inputTask.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if (!inputTask.value) return;
        createTask(inputTask.value);
        clearInput();
    } 
});


/* UTIL */
function clearInput(){
    inputTask.value = "";
    inputTask.focus();
}


/* CREATE TASK */
function createTask(textInput) {
    const li = createLi(textInput, false);
    listArea.prepend(li);
    saveTasks();
}

// Create li (Default is unchecked)
function createLi(text, completed = false) {
    const task = document.createElement("li");
    task.classList.add("item");

    if (completed) task.classList.add("clicked");

    task.innerHTML = `
        <div class="item-icon">
            <span class="material-symbols-outlined ${completed ? 'check_circle' : ''}"
                  onclick="toggleTask(this)">
                ${completed ? 'check_circle' : 'radio_button_unchecked'}
            </span>
        </div>  
        <div class="item-name">${text}</div>
        <div class="item-button">
            <button class="delete" onclick="deleteTask(this)">
                <span class="material-symbols-outlined">delete</span>
                Remover
            </button>
        </div>
    `;
    return task;
}


/* COMPLETE TASK */
function toggleTask(icon) {
    const item = icon.closest(".item");
    const isCompleted = item.classList.toggle("clicked");

    if (isCompleted) {
        // Moves the task to the end
        listArea.appendChild(item);

        icon.textContent = "check_circle";
        icon.classList.add("check_circle");
    } else {
        // If the item is deselected
        const firstCompleted = listArea.querySelector(".item.clicked");

        if (firstCompleted) {
            listArea.insertBefore(item, firstCompleted);
        } else {
            listArea.prepend(item);
        }

        icon.textContent = "radio_button_unchecked";
        icon.classList.remove("check_circle");
    }

    saveTasks();
}


/* DELETE TASK */
listArea.addEventListener("click", function (event) {
    if (event.target.closest(".delete")) {
        const item = event.target.closest(".item");
        item.remove();
        saveTasks();
    }
});


/* SAVE IN MEMORY */
function saveTasks() {
    const tasks = listArea.querySelectorAll(".item");
    const tasksList = [];

    // For each item it will save its value and the status (checked or not checked)
    tasks.forEach(item => {
        tasksList.push({
            text: item.querySelector(".item-name").innerText,
            completed: item.classList.contains("clicked")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasksList));
}


/* READ IN MEMORY */
function addSavedTasks() {
    const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];

    for (let task of tasksList) {
        const li = createLi(task.text, task.completed);

        if (task.completed) {
            listArea.appendChild(li);
        } else {
            listArea.prepend(li);
        }
    }
}

addSavedTasks();