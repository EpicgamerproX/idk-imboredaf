// todo.js
import { AppState, persist } from '../config/state.js';
import { attachSwipeToDelete } from '../utils/gestures.js';

export function initTodo() {
    const todoList = document.getElementById('todo-list');
    const newTodoInput = document.getElementById('new-todo');

    if (!todoList || !newTodoInput) return;

    function render() {
        todoList.innerHTML = '';
        
        if (AppState.todos.length === 0) {
            todoList.innerHTML = `
                <div class="empty-state">
                    <span style="font-size: 24px;">✨</span>
                    <p>All caught up!</p>
                </div>
            `;
            return;
        }

        AppState.todos.forEach(todo => {
            const li = document.createElement('li');
            if (todo.completed) li.classList.add('completed');
            
            li.textContent = todo.text;
            
            // Delete button (desktop)
            const delBtn = document.createElement('button');
            delBtn.classList.add('delete-todo');
            delBtn.innerHTML = '&times;';
            delBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent complete toggle
                deleteTodo(todo.id, li);
            });

            // Toggle logic with micro-interaction delay
            li.addEventListener('click', () => {
                if (!li.classList.contains('completed')) {
                    li.classList.add('completed');
                    setTimeout(() => {
                        todo.completed = true;
                        persist();
                        render(); // Force re-render to put at bottom if sorted
                    }, 400); // Wait for line-through animation
                } else {
                    li.classList.remove('completed');
                    todo.completed = false;
                    persist();
                }
            });

            li.appendChild(delBtn);
            todoList.appendChild(li);

            // Bind mobile gesture
            attachSwipeToDelete(li, () => deleteTodo(todo.id, li));
        });
    }

    function deleteTodo(id, element) {
        element.classList.add('deleting');
        setTimeout(() => {
            AppState.todos = AppState.todos.filter(t => t.id !== id);
            persist();
            render();
        }, 300); // wait for slide-out
    }

    // Add logic
    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && newTodoInput.value.trim() !== '') {
            AppState.todos.push({
                id: Date.now(),
                text: newTodoInput.value.trim(),
                completed: false
            });
            newTodoInput.value = '';
            persist();
            render();
        }
    });

    render();
}
