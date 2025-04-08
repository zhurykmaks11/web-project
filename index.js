const listTasks = document.getElementById("mainList");

let tasks = Array.from(listTasks.children).map(li => {
    return {
        id: li.querySelector(".invisible").textContent,
        checked: li.querySelector(".checkbox").checked,
        task: li.querySelector(".task").value,
    };
});

function renderList() { //оновити list в HTML
    listTasks.innerHTML = "";
    tasks.forEach(item =>  {
        const li = document.createElement("li");

        const p = document.createElement("p");
        p.textContent = item.id;
        p.classList.add("invisible")

        const label_checkbox = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");

        console.log("cheked: " + tasks.checked);
        checkbox.checked = tasks.checked;

        checkbox.addEventListener("change", () => {
            item.checked = !item.checked;
            toggleCrossedById(item.id);
        });

        label_checkbox.appendChild(checkbox);

        const label_task = document.createElement("label");
        const task = document.createElement("input");
        task.type = "text";
        task.classList.add("task");
        task.value = item.task;

        label_task.appendChild(task);

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("btn-delete");
        btnDelete.innerHTML = "Delete"
        btnDelete.onclick = () => deleteTask(item.id);

        li.appendChild(p);
        li.appendChild(label_checkbox);
        li.appendChild(label_task);
        li.appendChild(btnDelete);
        listTasks.appendChild(li);

    })
}

function generateId(){
    let step = 0;
    let isAvailable = true;

    while (isAvailable) {
        isAvailable = false;
        tasks.forEach(task => {
            if (task.id === step.toString()) {
                isAvailable = true;
            }
        })
        ++step;
    }
    --step;

    return step.toString();
}

function addPTask() {
    const input = document.querySelector(".add-task");
    let newTask = {
        id: generateId(),
        checked: false,
        task: input.value.trim()
    };

    if (newTask.task !== "") {
        tasks.push(newTask);
        input.value = ""; // очищення інпуту після додавання
        renderList();
    }
}

function deleteTask(id){
    console.log(id);
    const taskToDelete = tasks.find(task => task.id === id);

    if (!taskToDelete) return null;

    tasks = tasks.filter(task => task.id !== id.toString());

    renderList();
}

function toggleCrossedById(id) {
    const listItems = document.querySelectorAll("#mainList li");

    listItems.forEach(li => {
        const p = li.querySelector(".invisible");
        if (p && p.textContent === id) {
            const taskInput = li.querySelector(".task");
            const checkbox = li.querySelector(".checkbox");

            if (checkbox.checked) {
                taskInput.classList.add("crossed");
            } else {
                taskInput.classList.remove("crossed");
            }
        }
    });
}