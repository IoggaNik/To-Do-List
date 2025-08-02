const inputAdd = document.querySelector('.container-add input');
const btnAdd = document.querySelector('.container-add button');
const inputDelete = document.querySelector('.container-delete input');
const btnDelete = document.querySelector('.container-delete button');
const inputSearch = document.querySelector('.input-search');
const tasksUl = document.querySelector('ul');

const btnFilterAZ = document.getElementById('az');
const btnFilterZA = document.getElementById('za');
const btnClear = document.querySelector('.clear-tasks');

let getSortValue = localStorage.getItem('sort');

let tasksArr = [];
let filteredSearchArr = [];

const renderList = arr => {
    tasksUl.replaceChildren();
    arr.forEach((task, index) => {
        const newLi = document.createElement("li");
        const newBtn = document.createElement('button');
        const newP = document.createElement('p');
        const inputTask = document.createElement('input');

        newBtn.textContent = 'Change task';
        newBtn.style.order = '2';

        inputTask.setAttribute('name', 'input-change-task');

        newBtn.addEventListener('click', () => {
            newP.classList.toggle('hide-p');
            inputTask.classList.toggle('show-input');
            newLi.classList.toggle('active-li');

            if (inputTask.classList.contains('show-input')) {
                newLi.appendChild(inputTask);
                newBtn.textContent = 'Save task';

                inputTask.addEventListener('input', () => {
                    task = inputTask.value;
                    newP.textContent = inputTask.value;
                })
            } else {
                if (tasksArr.includes(inputTask.value) || !inputTask.value.length) {
                    alert('This task is already exists or task is empty string!');
                    newP.textContent = tasksArr[index];
                    newLi.removeChild(inputTask);
                    return;
                }

                tasksArr[index] = inputTask.value;
                localStorage.setItem('tasks', JSON.stringify(tasksArr));

                newLi.removeChild(inputTask);
                newBtn.textContent = 'Change task';
            }
        })

        inputTask.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                newBtn.click();
            }
        })

        newP.addEventListener('click', () => {
            newP.classList.toggle('line-p');
        })

        newP.textContent = task;
        inputTask.value = newP.textContent;

        newLi.appendChild(newP);
        newLi.appendChild(newBtn);

        tasksUl.appendChild(newLi);
    })

    localStorage.setItem('tasks', JSON.stringify(arr));
}

const sortAZ = () => {
    tasksArr.sort();
    renderList(tasksArr);
}

const sortZA = () => {
    tasksArr.sort((a, b) => b.localeCompare(a));
    renderList(tasksArr);
}

document.addEventListener('DOMContentLoaded', () => {
    tasksArr = JSON.parse(localStorage.getItem('tasks')) || [];

    if (getSortValue === 'z-a') btnFilterZA.click();

    renderList(tasksArr);
})

const displayChange_h4 = (value) => {
    const h4 = document.querySelector('.container-tasks h4');
    h4.style.display = value;
}

btnAdd.addEventListener('click', () => {
    if (
        !inputAdd.value || 
        tasksArr.includes(inputAdd.value)
    ) return;

    if (tasksArr.length === 5) {
        displayChange_h4('block');
        return
    }

    tasksArr.push(inputAdd.value.trim());
    
    getSortValue !== 'z-a' ? sortAZ() : sortZA();

    inputAdd.value = '';
})

inputAdd.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        btnAdd.click();
    }
})

btnDelete.addEventListener('click', () => {
    if (tasksArr.includes(inputDelete.value)) {
        const isDelete = confirm('Are you really want to delete this task?');

        if (isDelete) {
            tasksArr = tasksArr.filter((task) => task !== inputDelete.value);
            renderList(tasksArr);

            inputDelete.value = "";

            if (tasksArr.length < 5) displayChange_h4("none");
        }
    }
})

inputDelete.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        btnDelete.click();
    }
})

inputSearch.addEventListener('input', () => {
    const searchText = inputSearch.value.replaceAll(' ', '');

    filteredSearchArr = tasksArr.filter(task => task.toLowerCase().includes(searchText));
    renderList(filteredSearchArr);
})

btnFilterAZ.addEventListener('click', () => {
    sortAZ();

    localStorage.setItem('sort', 'a-z');
    getSortValue = localStorage.getItem('sort');
})

btnFilterZA.addEventListener('click', () => {
    sortZA();

    localStorage.setItem('sort', 'z-a');
    getSortValue = localStorage.getItem('sort');
})

btnClear.addEventListener('click', () => {
    if (tasksArr.length === 0) return;
    displayChange_h4('none');

    const isRemoveTasks = confirm('Are you sure to delete tasks?');

    if (isRemoveTasks) {
        tasksArr = [];
        renderList(tasksArr);
    }
})

const form = document.querySelector('form');
const btnForm = document.querySelector('form button');

btnForm.addEventListener('click', e => {
    e.preventDefault();

    const formData = new FormData(form);
    console.log(Object.fromEntries(formData));

    for (let [name] of formData.entries()) {
        const field = form.elements[name];
        if (field) field.value = ''
    }
})

const themeBtn = document.querySelector('.theme-btn');
const containerTasks = document.querySelector('.container-tasks');
const containerReg = document.querySelector('.container-reg');

let theme = 'theme-1';

themeBtn.addEventListener('click', () => {
    containerTasks.classList.toggle('theme-tasks');
    containerReg.classList.toggle('theme-reg');

    theme = theme === 'theme-1' ? 'theme-2' : 'theme-1'

    localStorage.setItem('theme', theme);
});

document.addEventListener('DOMContentLoaded', () => {
    const getTheme = localStorage.getItem('theme');

    if (getTheme === 'theme-2') {
        containerTasks.classList.add('theme-tasks');
        containerReg.classList.add('theme-reg');
        theme = 'theme-2';
    } else {
        theme = 'theme-1';
    }
});