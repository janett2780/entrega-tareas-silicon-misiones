const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    list.innerHTML = ''; // Limpiamos la lista visual

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'flex items-center justify-between p-2 bg-gray-50 rounded border mb-2';

        li.innerHTML = `
            <span class="${task.completed ? 'line-through text-gray-400' : 'text-gray-800'} cursor-pointer" onclick="toggleTask(${index})">
                ${task.text}
            </span>
            <button onclick="deleteTask(${index})" class="text-red-500 hover:text-red-700 px-2">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        list.appendChild(li);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = input.value.trim();

    if (text === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Por favor, ingresá una descripción para la tarea.',
            confirmButtonColor: '#3b82f6'
        });
        return;
    }

    tasks.push({ text: text, completed: false });
    input.value = '';
    renderTasks();
});

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

renderTasks();
