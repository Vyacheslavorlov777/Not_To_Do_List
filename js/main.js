const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

// Выводим ранее сохраненные данные на страницу 
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(((task) => renderTask(task)));
};

checkEmptyList();


// Добавление задачи

form.addEventListener('submit', addTask);


// Удаление задачи

taskList.addEventListener('click', deleteTask);

// Отметка о завершении задачи

taskList.addEventListener('click', doneTask);


// Функции

function addTask (event) {
    // Отмена  отправки формы 
    event.preventDefault()

    // Достаем текст из воода формы
    const taskText = taskInput.value;

    //  Описываем задачу в объекте
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    // Добавляем задачу в массив задач
    tasks.push(newTask);

    // функция записывает данные в local storage
    saveToLocalStorage();


    // Формируем CSS Class
    renderTask(newTask);

    // Очищаем поле ввода и фокус возвращаем на него

    taskInput.value = '';
    taskInput.focus();

    checkEmptyList ();
};

function deleteTask (event) {
    // Проверяем что клик был НЕ по кнопке "удалить задачу"
    if (event.target.dataset.action !== 'delete') return;
        
    const perenNode = event.target.closest('.list-group-item');

    // Определяем ID елемента li
    const id = Number(perenNode.id);

    // Находим индекс задачи в массиве
    const index = tasks.findIndex((task) => task.id === id);

    // Удаляем задачу из массива задач
    tasks.splice(index, 1);

    // функция записывает данные в local storage
    saveToLocalStorage();

    perenNode.remove();

    checkEmptyList ()
};

function doneTask (event) {
    if (event.target.dataset.action !== 'done') return;

    const perenNode = event.target.closest('.list-group-item');

    // Определяем ID елемента li
    const id = Number(perenNode.id);
    // Находим задачу
    const task = tasks.find((task) => task.id === id);
    // Возвращаем обратное значение 
    task.done = !task.done;

    // функция записывает данные в local storage
    saveToLocalStorage();

    const taskTitle = perenNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
};


// Функция на проверку пустоты задач и отображения этого на странице
function checkEmptyList() {
    if(tasks.length === 0) {
        const emptyList = `<li id="emptyList" class="list-group-item empty-list">
                                <img src="" alt="">
                                <div class="empty-list_title">Список дел пуст</div>
                            </li>`;
        taskList.insertAdjacentHTML('afterbegin', emptyList);
    };

    if(tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
};

// функция записывает данные в local storage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function renderTask(task) {
    // Формируем CSS Class
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';


    const taskHTML = `
                    <li id="${task.id}" class="list-group-item d-flex justify-content">
                        <span class="${cssClass}">${task.text}</span>
                        <div class="task-item_buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img class="img-btn" src="/src/img/done.png" alt="Done"></button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img class="img-btn" src="/src/img/delete.png" alt="Done"></button>
                        </div>
                    </li>`;

    // Добовляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
};




console.log(taskInput);