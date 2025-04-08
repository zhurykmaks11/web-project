const listTasks = document.getElementById("mainList");

let tasks = Array.from(listTasks.children).map(li => {
    return {
        checked: li.querySelector(".checkbox").value,
        task: li.querySelector(".task").innerHTML,
    };
});

renderList();

function renderList() { //оновити list в HTML
    listTasks.innerHTML = "";
    tasks.forEach(item =>  {
        const li = document.createElement("li");

        const label_checkbox = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.value = item.checked;

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

        li.appendChild(label_checkbox);
        li.appendChild(label_task);
        li.appendChild(btnDelete);
        listTasks.appendChild(li);

    })
}
