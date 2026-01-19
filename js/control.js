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
    const li = createDiv(textInput);
    listArea.prepend(li);
    saveTask();
}

function createDiv(textInput) {
    const task = document.createElement("li");
    task.classList.add("item");

    task.innerHTML = `
        <div class="item-icon">
            <span class="material-symbols-outlined" onclick="toggleTask(this)">
                radio_button_unchecked
            </span>
        </div>  
        <div class="item-name">${textInput}</div>
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

    saveTask();
}


/* DELETE TASK */
listArea.addEventListener("click", function (event) {
    if (event.target.closest(".delete")) {
        const item = event.target.closest(".item");
        item.remove();
        saveTask();
    }
});

/* SAVE IN MEMORY */
function saveTask() {
    const items = listArea.querySelectorAll(".item");
    const tasks = [];

    // For each item it will save its value and the status (checked or not checked)
    items.forEach(item => {
        tasks.push({
            text: item.querySelector(".item-name").innerText,
            completed: item.classList.contains("clicked")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}