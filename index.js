import { savetask, getTasks, onGetTask, deleteTask, getTask, updateTask } from './firebase.js'

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('task-container');
let editStatus = false
let id = ''

window.addEventListener('DOMContentLoaded', async () => {
    onGetTask((querySnapshot) => {
        let template = ''
        querySnapshot.forEach(doc => {
            let task = doc.data()
            template += `
            <div class="card m-2" style="width: 18rem;">
                <div class="card-body">
                    <h3 class="card-title">${task.title}</h3>
                    <p>${task.description}</p>
                    <button class="btn btn-outline-danger btn-delete" data-id="${doc.id}">Delete</button>
                    <button class="btn btn-outline-success btn-edit" data-id="${doc.id}">Edit</button>
                </div>
                
            </div>
            `
        });
        taskContainer.innerHTML = template

        const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                deleteTask(dataset.id)
            })
        })

        const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
        btnsEdit.forEach(btn => {
            btn.addEventListener('click', async ({ target: { dataset } }) => {
                const doc = await getTask(dataset.id)
                const task = doc.data()

                taskForm['task-title'].value = task.title
                taskForm['task-description'].value = task.description

                editStatus = true
                id = doc.id
                console.log(taskForm["btn-task-save"])
                taskForm[2].innerText = 'Update'
            })
        })
    });
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = taskForm['task-title']
    const description = taskForm['task-description']

    //console.log(title.value)
    if (!editStatus) {
        savetask(title.value, description.value)
    } else {
        updateTask(id,{ title: title.value, description: description.value })
        editStatus = false
        taskForm[2].innerText = 'Save'
    }
    taskForm.reset()
})