let inputTask = document.getElementById("input-task");
let btnAdd = document.getElementById("btn-add");
let listArea = document.getElementById("list-area");

function addTask() {
    // Get input text
    let inputText = inputTask.value;

    // If is not empty, null or undefined
    if (inputText !== "" && inputText !== null && inputText !== undefined) {
        let newItem = 
        `<div class="item">
            <div class="item-icon">
                <span class="material-symbols-outlined" onclick="toggleTask(this)">
                    radio_button_unchecked
                </span>
            </div>
            <div class="item-name">`+ inputText +`</div>
            <div class="item-button">
                <button class="delete">
                    <span class="material-symbols-outlined"> delete </span>
                    Deletar
                </button>
            </div>
        </div>`;

        listArea.innerHTML += newItem;
        inputTask.value = "";
    }
}

// Add task with Enter
inputTask.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

// Delete task
listArea.addEventListener("click", function (event) {
    if (event.target.closest(".delete")) {
        const item = event.target.closest(".item");
        item.remove();
    }
});

// Complete task
function toggleTask(icon) {
    const item = icon.closest(".item");

     const isCompleted = item.classList.toggle("clicked");

    if (isCompleted) {
        // Moves the task to the end
        listArea.appendChild(item);

        icon.textContent = "check_circle";
        icon.classList.add("check_circle");
    } else {
        icon.textContent = "radio_button_unchecked";
        icon.classList.remove("check_circle");
    }
}