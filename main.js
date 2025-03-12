document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
    const notCompletedTasks = document.getElementById('not-completed-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    const taskForm = document.getElementById('task-form');
    const newTaskTitle = document.getElementById('new-task-title');
    const notification = document.getElementById('notification');
    const clearTasksButton = document.getElementById('clear-tasks');

    fetch(apiUrl)
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => addTask(task));
        })
        .catch(error => showNotification('Error Cargando Tareas'));

    function addTask(task) {
        const taskItem = document.createElement('li');
        
        const taskTitle = document.createElement('span');
        taskTitle.textContent = task.title.length > 50 ? task.title.substring(0, 50) + '...' : task.title;
        taskTitle.classList.add('task-title');
        taskItem.appendChild(taskTitle);

        taskItem.classList.toggle('completed', task.completed);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.addEventListener('click', () => {
            taskItem.remove();
            showNotification('Tarea Borrada');
        });

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
        });

        taskItem.appendChild(deleteButton);
        taskItem.appendChild(toggleButton);

        if (task.completed) {
            completedTasks.appendChild(taskItem);
        } else {
            notCompletedTasks.appendChild(taskItem);
        }
    }

    taskForm.addEventListener('submit', event => {
        event.preventDefault();
        const newTask = {
            title: newTaskTitle.value,
            completed: false
        };
        addTask(newTask);
        newTaskTitle.value = '';
        showNotification('Tarea Agregada');
    });

    clearTasksButton.addEventListener('click', () => {
        notCompletedTasks.innerHTML = '';
        completedTasks.innerHTML = '';
        showNotification('Todas las Tareas Borradas');
    });

    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
});
