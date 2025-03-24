document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
    const notCompletedTasks = document.getElementById('not-completed-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    const taskForm = document.getElementById('task-form');
    const newTaskTitle = document.getElementById('new-task-title');
    const notification = document.getElementById('notification');
    const clearTasksButton = document.getElementById('clear-tasks');
    const clearNotCompletedTasksButton = document.getElementById('clear-not-completed-tasks');
    const clearCompletedTasksButton = document.getElementById('clear-completed-tasks');

    fetch(apiUrl)
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => addTask(task, notCompletedTasks, completedTasks, showNotification));
            toggleClearButtons();
        })
        .catch(error => showNotification('Error Cargando Tareas'));

    taskForm.addEventListener('submit', event => {
        event.preventDefault();
        const newTask = {
            title: newTaskTitle.value,
            completed: false
        };
        addTask(newTask, notCompletedTasks, completedTasks, showNotification);
        newTaskTitle.value = '';
        showNotification('Tarea Agregada');
        toggleClearButtons();
    });

    clearTasksButton.addEventListener('click', () => {
        if (confirm('¿Estas seguro de que deseas borrar todas las tareas? \nEsta accion borrara todas las tareas en ambas listas')) {
            notCompletedTasks.innerHTML = '';
            completedTasks.innerHTML = '';
            showNotification('Todas las Tareas Borradas');
            toggleClearButtons();
        }
    });

    clearNotCompletedTasksButton.addEventListener('click', () => {
        if (confirm('¿Estas seguro de que deseas borrar todas las tareas no completadas?')) {
            notCompletedTasks.innerHTML = '';
            showNotification('Todas las Tareas No Completadas Borradas');
            toggleClearButtons();
        }
    });

    clearCompletedTasksButton.addEventListener('click', () => {
        if (confirm('¿Estas seguro de que deseas borrar todas las tareas completadas?')) {
            completedTasks.innerHTML = '';
            showNotification('Todas las Tareas Completadas Borradas');
            toggleClearButtons();
        }
    });
});

function addTask(task, notCompletedTasks, completedTasks, showNotification) {
    const taskItem = document.createElement('li');
    
    const taskTitle = document.createElement('span');
    taskTitle.textContent = task.title.length > 50 ? task.title.substring(0, 50) + '...' : task.title;
    taskTitle.classList.add('task-title');
    taskItem.appendChild(taskTitle);

    taskItem.classList.toggle('completed', task.completed);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = task.completed ? 'Marcar Como No Completada' : 'Marcar Como Completada';
    toggleButton.addEventListener('click', () => {
        task.completed = !task.completed;
        taskItem.classList.toggle('completed', task.completed);
        toggleButton.textContent = task.completed ? 'Marcar Como No Completada' : 'Marcar Como Completada';
        if (task.completed) {
            completedTasks.appendChild(taskItem);
            showNotification('Tarea Completada');
        } else {
            notCompletedTasks.appendChild(taskItem);
            showNotification('Tarea No Completada');
        }
        toggleClearButtons();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas borrar esta tarea?')) {
            taskItem.remove();
            showNotification('Tarea Borrada');
            toggleClearButtons();
        }
    });

    taskItem.appendChild(toggleButton);
    taskItem.appendChild(deleteButton);

    if (task.completed) {
        completedTasks.appendChild(taskItem);
    } else {
        notCompletedTasks.appendChild(taskItem);
    }
    toggleClearButtons();
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function toggleClearButtons() {
    const notCompletedTasks = document.getElementById('not-completed-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    const clearNotCompletedTasksButton = document.getElementById('clear-not-completed-tasks');
    const clearCompletedTasksButton = document.getElementById('clear-completed-tasks');

    clearNotCompletedTasksButton.style.display = notCompletedTasks.children.length > 0 ? 'block' : 'none';
    clearCompletedTasksButton.style.display = completedTasks.children.length > 0 ? 'block' : 'none';
}
