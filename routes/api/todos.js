const express = require('express');
const router = express.Router();
const Todo = require('../../models/Todos');

//@route GET /todos
//@desc Get all Todos

router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();

        if (!todos) {
            return res.status(404).json({ msg: 'No Todos found' });
        }

        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error in Get all Todos route');
    }
});

//@route POST /todos
//@desc Add a new Todo item

router.post('/todos', async (req, res) => {
    try {
        const newTodo = new Todo({
            title: req.body.title,
        });

        await newTodo.save((err, doc) => {
            console.log(`${doc} saved`);
        });

        res.json(newTodo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error in POST to new Todo route');
    }
});

//@route PATCH /todos
//@desc Update completed to todo item

router.patch('/todos/:id', async (req, res) => {
    try {
        Todo.findOneAndUpdate(
            { _id: req.params.id },
            { completed: req.body.completed },
            { new: true },
            (err, doc) => {
                if (err) {
                    return res
                        .status(404)
                        .json({ msg: 'no doc with this id found' });
                }
                res.json(doc);
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send(
            'Server Error in PATCH route to update completed items'
        );
    }
});

//@route DELETE /todos
//@desc Delete a todo item

router.delete('/todos/:id', async (req, res) => {
    try {
        await Todo.findOneAndDelete({ _id: req.params.id });

        const allTodos = await Todo.find();

        res.json(allTodos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error in DELETE route to delete item');
    }
});

module.exports = router;
