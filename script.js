const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputIsValid = validateInput();

    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }

    /* criando div para tarefas adcionada */
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    /* criando tag para receber tarefa*/
    const taskContent = document.createElement("p");
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener("click", () => handleClick(taskContent));

    /* criando elemento icone para customizar */
    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskContent));

    /* adcionando tag criandas acima na tag taskItemConatiner no HTML*/
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocalStorage();

};

/* função para adcionar text decoration na tarefa finalizada */
const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
        if (currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage();
}
/* função para deletar tarefa ao clicar no icone */
const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
        if (currentTaskIsBeingClicked) {
            taskItemContainer.remove();
        }
    }

    updateLocalStorage();
}

/* função para remover error */
const handleInputChange = () => {
    const inputIsValid = validateInput();

    if (inputIsValid) {
        return inputElement.classList.remove("error");
    }
}
/* criando função para guarda as informações em um local storage */

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;
    const localStorageTasks = [...tasks].map((task) => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains("completed");

        return { description: content.innerText, isCompleted }
    });

    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {

    const taskFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

    for (const task of taskFromLocalStorage) {
        /* criando div para tarefas adcionada */
        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("task-item");

        /* criando tag para receber tarefa*/
        const taskContent = document.createElement("p");
        taskContent.innerText = task.description;

        if (task.isCompleted) {
            taskContent.classList.add("completed");
        }

        taskContent.addEventListener("click", () => handleClick(taskContent));

        /* criando elemento icone para customizar */
        const deleteItem = document.createElement("i");
        deleteItem.classList.add("far");
        deleteItem.classList.add("fa-trash-alt");

        deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskContent));

        /* adcionando tag criandas acima na tag taskItemConatiner no HTML*/
        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);

        tasksContainer.appendChild(taskItemContainer);
    }

}
refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("change", () => handleInputChange());


