//task list code

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

let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

//supplies list code

let tags = [];
let supplies = [];

function createTag() {
    const tagInput = document.getElementById('newTagInput');
    const tagName = tagInput.value.trim();
    if (tagName && !tags.includes(tagName)) {
        tags.push(tagName);
        tagInput.value = '';
        showTags();
    }
}

function showTags() {
    const tagsDiv = document.getElementById('tags');
    tagsDiv.innerHTML = '';
    tagsDiv.innerHTML += tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

function addSupply() {
    const supplyInput = document.getElementById('newSupplyInput');
    const supplyName = supplyInput.value.trim();
    if (supplyName) {
        supplies.push({ name: supplyName, tags: [] });
        supplyInput.value = '';
        showSupplies();
    }
}

function showSupplies() {
    const suppliesDiv = document.getElementById('supplies');
    suppliesDiv.innerHTML = '';
    suppliesDiv.innerHTML += supplies.map((supply, index) => {
        let supplyHTML = `<div class="supply-item">${supply.name}`;
        if (supply.tags.length) {
            supplyHTML += `<div>Tags: ${supply.tags.join(', ')}</div>`;
        }
        supplyHTML += `<select class="options" onchange="attachEvent(${index}, this.value)">
            <option value="">Attach Event</option>
            ${tags.map(tag => `<option value="${tag}">${tag}</option>`).join('')}
        </select></div>`;
        return supplyHTML;
    }).join('');
}

function attachTag(supplyIndex, tag) {
    if (tag && !supplies[supplyIndex].tags.includes(tag)) {
        supplies[supplyIndex].tags.push(tag);
        showSupplies();
    }
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

if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime;
    },500);
}

progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

