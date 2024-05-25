//task list code
var tasks = [];

function addTask() {
    var input = document.getElementById("taskInput");
    var dueDateInput = document.getElementById("dueDateInput");
    var task = input.value.trim();
    var dueDate = dueDateInput.value;

    if (task === "") {
        alert("Please enter a task!");
        return;
    }
    if (dueDate === "") {
        alert("Please enter a due date!");
        return;
    }
    if (new Date(dueDate) < new Date()) {
        alert("The due date must be in the future!");
        return;
    }

    tasks.push({ task: task, dueDate: dueDate });
    showTaskList();
    input.value = "";
    dueDateInput.value = "";
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
        taskItem += '<button onclick="deleteTask(' + index + ')" class="deleteButton">Delete</button>';
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

let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

//supplies list code
let tags = [];
let supplies = [];

function createTag() {
    const tagInput = document.getElementById('newTagInput');
    const tagName = tagInput.value.trim();

    if (tagName === "") {
        alert("Please enter an event name!");
        return;
    }
    if (tags.includes(tagName)) {
        alert("This event name already exists!");
        return;
    }

    tags.push(tagName);
    tagInput.value = '';
    showTags();
}

function showTags() {
    const tagsDiv = document.getElementById('tags');
    tagsDiv.innerHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

function addSupply() {
    const supplyInput = document.getElementById('newSupplyInput');
    const supplyName = supplyInput.value.trim();

    if (supplyName === "") {
        alert("Please enter a supply name!");
        return;
    }
    if (supplies.some(supply => supply.name === supplyName)) {
        alert("This supply already exists!");
        return;
    }

    supplies.push({ name: supplyName, tags: [] });
    supplyInput.value = '';
    showSupplies();
}

function showSupplies() {
    const suppliesDiv = document.getElementById('suppliesList');
    suppliesDiv.innerHTML = supplies.map((supply, index) => {
        let supplyHTML = `<div class="supply-item">${supply.name}`;
        if (supply.tags.length) {
            supplyHTML += `<div>Tags: ${supply.tags.join(', ')}</div>`;
        }
        supplyHTML += `<select class="options" onchange="attachTag(${index}, this.value)">
            <option value="">Attach Event</option>
            ${tags.map(tag => `<option value="${tag}">${tag}</option>`).join('')}
        </select></div>`;
        return supplyHTML;
    }).join('');
}

function attachTag(supplyIndex, tag) {
    if (tag === "") {
        alert("Please select a valid event to attach!");
        return;
    }
    if (!supplies[supplyIndex].tags.includes(tag)) {
        supplies[supplyIndex].tags.push(tag);
        showSupplies();
    }
}

// budgeter code
let budget = 0;
let totalExpenses = 0;
let expenses = [];

function setBudget() {
    const budgetInput = document.getElementById('budgetInput');
    budget = parseFloat(budgetInput.value);
    budgetInput.value = '';
    updateBudgetSummary();
}

function addExpense() {
    const expenseNameInput = document.getElementById('expenseNameInput');
    const expenseAmountInput = document.getElementById('expenseAmountInput');
    const expenseName = expenseNameInput.value.trim();
    const expenseAmount = parseFloat(expenseAmountInput.value);

    if (expenseName === "" || isNaN(expenseAmount)) {
        alert("Please enter a valid expense name and amount!");
        return;
    }

    expenses.push({ name: expenseName, amount: expenseAmount });
    totalExpenses += expenseAmount;
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
    updateBudgetSummary();
}

function updateBudgetSummary() {
    const remainingBudget = budget - totalExpenses;
    document.getElementById('budgetAmount').textContent = budget.toFixed(2);
    document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('remainingBudget').textContent = remainingBudget.toFixed(2);

    const expensesListDiv = document.getElementById('expensesList');
    expensesListDiv.innerHTML = expenses.map(expense => `<div>${expense.name}: $${expense.amount.toFixed(2)}</div>`).join('');
}

//song player code

song.onloadmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else{
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

setInterval(() => {
    if(!song.paused) {
        progress.value = song.currentTime;
    }
}, 500);

progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}