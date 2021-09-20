const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { json } = require('body-parser');
const { nanoid } = require('nanoid');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());

let todos = {
    todoListItems: [
        {
            id: nanoid(),
            title: 'todo 1',
            completed: true,
        },
        {
            id: nanoid(),
            title: 'todo 2',
            completed: false,
        },
        {
            id: nanoid(),
            title: 'todo 3',
            completed: false,
        },
        {
            id: nanoid(),
            title: 'todo 4',
            completed: false,
        },
        {
            id: nanoid(),
            title: 'todo 5',
            completed: false,
        },
    ],
    status: 'pending',
    error: null,
};

app.get('/todos', (req, res) => {
    todos.status = 'complete';
    res.send(todos);
});

app.post('/todos', (req, res) => {
    const todo = { title: req.body.title, id: nanoid(), completed: false };
    todos.todoListItems.push(todo);
    return res.send(todo);
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.todoListItems.findIndex((todo) => todo.id == id);
    const completed = Boolean(req.body.completed);
    if (index > -1) {
        todos.todoListItems[index].completed = completed;
    }
    return res.send(todos.todoListItems[index]);
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.todoListItems.findIndex((todo) => todo.id == id);
    if (index > -1) {
        todos.todoListItems.splice(index, 1);
    }
    res.send(todos.todoListItems);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
