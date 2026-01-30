document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');

    // Load tasks from localStorage
    // (Optional enhancement to persist data, keeping it simple for now as per plan, 
    // but good structure to have)

    function updateEmptyState() {
        if (todoList.children.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }
    }

    function addTask() {
        const taskText = input.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.setAttribute('aria-label', 'Delete task');

        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);

        input.value = '';
        updateEmptyState();
    }

    addBtn.addEventListener('click', addTask);

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const itemToDelete = e.target.parentElement;
            todoList.removeChild(itemToDelete);
            updateEmptyState();
        }
    });
});

