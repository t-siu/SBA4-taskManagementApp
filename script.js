let tasks = [];

const taskNameInput = document.getElementById("taskName");
const taskCategoryInput = document.getElementById("taskCategory");
const taskDeadLineInput = document.getElementById("taskDeadline");
const taskStatusInput = document.getElementById("taskStatus");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Adding Function
function addTask() {
    if (taskNameInput.value === "") {
        alert("Please enter a task name");
        return;
    }
    const newTask = {
        name: taskNameInput.value,
        category: taskCategoryInput.value,
        deadline: taskDeadLineInput.value,
        status: taskStatusInput.value
    };

    tasks.push(newTask);

    console.log("New task added: ", newTask);
    console.log("All tasks in array: ", tasks);

    taskNameInput.value = "";
    taskCategoryInput.value = "";
    taskDeadLineInput.value = "";
    taskStatusInput.value = "In Progress";

    // Display tasks
    displayTasks();
};

// Create a function to show all tasks
function displayTasks() {
    taskList.innerHTML = "";

    let today = new Date().toISOString().split("T")[0];

    for (let i = 0; i < tasks.length; i++) {
        let currentTask = tasks[i];
        // console.log("Looping task to index " + i + ":", currentTask);

        // Overdue
        if (currentTask.deadline !== "" && currentTask.deadline < today && currentTask.status !== "Completed") {
            currentTask.status = "Overdue";
        }

        const li = document.createElement("li");
        li.textContent = currentTask.name + " | " + currentTask.category + " | " + currentTask.deadline + " | " + currentTask.status;

        // Add button to update status
        const statusBtn = document.createElement("button");
        statusBtn.textContent = "Update Status";
        statusBtn.addEventListener("click", function () {
            if (tasks[i].status === "Not Started") {
                tasks[i].status = "In Progress";
                
            }else if (tasks[i].status === "In Progress" || tasks[i].status === "Overdue") {
                tasks[i].status = "Completed"
            } else {
                tasks[i].status = "Not Started";
            }
            displayTasks();
        });
        li.appendChild(statusBtn);
        taskList.appendChild(li);
    }
}

// Add Task Button
addTaskBtn.addEventListener("click", addTask);