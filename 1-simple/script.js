document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    // Function to add a new ToDo item
    const addTodo = () => {
        const todoText = todoInput.value.trim();
        if (todoText === '') {
            return;
        }

        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const span = document.createElement('span');
        span.textContent = todoText;
        li.appendChild(span);

        const buttonGroup = document.createElement('div');

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'btn btn-success btn-sm me-2';
        completeButton.addEventListener('click', () => {
            span.classList.toggle('completed');
        });
        buttonGroup.appendChild(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
        });
        buttonGroup.appendChild(deleteButton);

        li.appendChild(buttonGroup);
        todoList.appendChild(li);

        todoInput.value = '';
        todoInput.focus();
    };

    addButton.addEventListener('click', addTodo);

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});