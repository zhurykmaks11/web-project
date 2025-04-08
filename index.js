const listTasks = document.getElementById("mainList");

let tasks = Array.from(listTasks.children).map(li => {
    return {
        id: li.querySelector(".invisible").textContent,
        checked: li.querySelector(".checkbox").checked,
        task: li.querySelector(".task").value,
    };
});

renderList();

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
        checkbox.checked = item.checked;

        label_checkbox.appendChild(checkbox);

        const label_task = document.createElement("label");
        const task = document.createElement("input");
        task.type = "text";
        task.classList.add("task");
        task.value = item.task;
        console.log(item.checked);

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
    let div = document.querySelector(".wrapper");
    const input = document.querySelector(".add-task");
    // console.log(input.value);
    let newTask = {
        id: generateId(),
        checked: false,
        name:input.value.trim()
    };

    if (newTask.task !== "") {
        tasks.push(newTask);
        input.value = ""; // очищення інпуту після додавання
        renderList();
    }
}