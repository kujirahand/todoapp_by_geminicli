document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    const clearCompletedButton = document.getElementById('clear-completed-button');

    // Function to save todos to localStorage
    const saveTodos = () => {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            const span = li.querySelector('span');
            todos.push({
                text: span.textContent,
                completed: span.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Function to create a todo item element
    const createTodoItem = (todo) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const span = document.createElement('span');
        span.textContent = todo.text;
        if (todo.completed) {
            span.classList.add('completed');
        }
        li.appendChild(span);

        const buttonGroup = document.createElement('div');

        const completeButton = document.createElement('button');
        completeButton.textContent = '完了';
        completeButton.className = 'btn btn-success btn-sm';
        completeButton.addEventListener('click', () => {
            span.classList.toggle('completed');
            saveTodos();
        });
        buttonGroup.appendChild(completeButton);

        li.appendChild(buttonGroup);
        return li;
    };
    
    // Function to load todos from localStorage
    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const li = createTodoItem(todo);
            todoList.appendChild(li);
        });
    };

    // Function to add a new ToDo item
    const addTodo = () => {
        const todoText = todoInput.value.trim();
        if (todoText === '') {
            return;
        }

        const newTodo = { text: todoText, completed: false };
        const li = createTodoItem(newTodo);
        todoList.appendChild(li);
        
        saveTodos();

        todoInput.value = '';
        todoInput.focus();
    };

    addButton.addEventListener('click', addTodo);

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // Load todos when the page loads
    loadTodos();

    clearCompletedButton.addEventListener('click', () => {
        const completedItems = todoList.querySelectorAll('li');
        completedItems.forEach(item => {
            if (item.querySelector('span').classList.contains('completed')) {
                todoList.removeChild(item);
            }
        });
        saveTodos();
    });
});