var tasks = [];
function addTask() {
    var input = document.getElementById("taskInput");
    var dueDateInput = document.getElementById("dueDateInput");
    var task = input.value;
    var dueDate = dueDateInput.value;
    
    if (task !== "") {
        tasks.push({ task: task, dueDate: dueDate });
        showTaskList();
        input.value = "";
        dueDateInput.value = "";
    } else {
        alert("Please enter a task!");
    }
}

function showTaskList() {
    var taskListDiv = document.getElementById("taskList");
    taskListDiv.innerHTML = "";

    tasks.sort(function(a, b) {
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    var taskListItem = "";

    tasks.forEach(function(task, index) {
        var taskItem = '<div class="task">';
        taskItem += task.task + '<span class="due-date">' + (task.dueDate ? " Due: " + task.dueDate : "") + '</span>';
        taskItem += '<button onclick="deleteTask(' + index + ')" class="deleteButton" >Delete</button>';
        taskItem += '</div>';
        taskListItem += taskItem;
    });

    taskListDiv.innerHTML = taskListItem;

}

function deleteTask(index) {
    tasks.splice(index, 1);
    showTaskList();
}

function completion(taskDiv) {
if (taskDiv.classList.contains("completed")) {
    taskDiv.classList.remove("completed");
} else {
    taskDiv.classList.add("completed");
}
}

document.getElementById("taskList").addEventListener("click", function(event) {
    if (event.target.classList.contains("task")) {
        completion(event.target);
    }
});

showTaskList();