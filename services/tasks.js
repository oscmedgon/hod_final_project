const uuid = require('uuid/v1')
let tasks
const moment = require('moment')

function setTasks (sessionTasks) {
  tasks = sessionTasks
}

function getPendingTasks () {
  return tasks.filter(task => !task.completed)
}

function getCompletedTasks () {
  return tasks.filter(task => task.completed)
}

function addTask (title) {
  const newTask = {
    title,
    id: uuid(),
    createdAt: moment().format('MMMM Do YYYY, HH:mm:ss'),
    completed: false,
    completedAt: null
  }
  tasks.push(newTask)
}
function completeTask (id) {
  tasks.map(function (task, i) {
    if (task.id === id) {
      task.completedAt = moment().format('MMMM Do YYYY, HH:mm:ss')
      task.completed = true
      return task
    } else {
      return task
    }
  })
}
function deleteTask (id, req) {
  req.session.tasks = tasks.filter((task) => {
    return task.id !== id
  })
}
function completeAllTask () {
  tasks.map(function (task, i) {
    task.completedAt = moment().format('MMMM Do YYYY, HH:mm:ss')
    task.completed = true
    return task
  })
}

function editTask (id, title) {
  tasks.map(function (task, i) {
    if (task.id === id) {
      task.title = title
    }
    return task
  })
}

module.exports = { setTasks, getPendingTasks, getCompletedTasks, addTask, completeTask, completeAllTask, deleteTask, editTask }
