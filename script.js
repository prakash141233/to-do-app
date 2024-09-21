const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const authContainer = document.querySelector('.auth');
const todoAppContainer = document.querySelector('.todo-app');
const loginMessage = document.getElementById('login-message');

function login() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username);
        authContainer.style.display = 'none';
        todoAppContainer.style.display = 'block';
        showTasks();
    } else {
        loginMessage.textContent = "Please enter a username.";
    }
}

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="edit" onclick="editTask(this)">✏️</span>
            ${inputBox.value}
            <span class="delete" onclick="deleteTask(this)">🗑️</span>
        `;
        listContainer.appendChild(li);
        inputBox.value = "";
        saveTasks();
    }
}

function editTask(element) {
    const li = element.parentElement;
    const taskText = li.childNodes[1].nodeValue.trim();
    const newTask = prompt("Edit your task:", taskText);
    if (newTask) {
        li.childNodes[1].nodeValue = newTask;
        saveTasks();
    }
}

function deleteTask(element) {
    element.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks") || '';
}

function logout() {
    localStorage.removeItem('username');
    authContainer.style.display = 'block';
    todoAppContainer.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem('username');
    if (username) {
        authContainer.style.display = 'none';
        todoAppContainer.style.display = 'block';
        showTasks();
    }
});
