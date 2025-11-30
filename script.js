document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        addTaskToDOM(taskText);

        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskInput.value = '';
    }

    function addTaskToDOM(taskText) {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add(‘remove-btn’)
        removeBtn.onclick = () => {
            li.remove();
            tasks = tasks.filter(task => task !== taskText || tasks.indexOf(task) !== tasks.lastIndexOf(task));
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        li.appendChild(span);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') addTask();
    });
});