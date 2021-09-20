import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const response = await fetch('http://localhost:7000/todos');
        if (response.ok) {
            const todos = await response.json();
            return { todos };
        }
    }
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async (payload) => {
        const response = await fetch('http://localhost:7000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: payload.title }),
        });

        if (response.ok) {
            const todo = await response.json();
            return { todo };
        }
    }
);

export const toggleCompleteAsync = createAsyncThunk(
    'todos/completeTodoAsync',
    async (payload) => {
        const response = await fetch(
            `http://localhost:7000/todos/${payload.id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: payload.completed,
                }),
            }
        );

        if (response.ok) {
            const todo = await response.json();
            return { id: todo.id, completed: todo.completed };
        }
    }
);

export const toggleDeleteAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async (payload) => {
        const response = await fetch(
            `http://localhost:7000/todos/${payload.id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: payload.id,
                }),
            }
        );

        if (response.ok) {
            const todos = await response.json();
            return { todos };
        }
    }
);

const initialState = {
    todoListItems: [
        { id: 1, title: 'todo1', completed: false },
        { id: 2, title: 'todo2', completed: false },
        { id: 3, title: 'todo3', completed: true },
    ],
    status: 'pending',
    error: null,
};

const todoSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        //local db
        // addTodo: (state, action) => {
        //     const newTodo = {
        //         id: Date.now(),
        //         title: action.payload.title,
        //         completed: false,
        //     };
        //     state.push(newTodo);
        // },
        // toggleComplete: (state, action) => {
        //     const index = state.findIndex(
        //         (todo) => todo.id === action.payload.id
        //     );
        //     state[index].completed = action.payload.completed;
        // },
        // deleteTodo: (state, action) => {
        //     return state.filter((todo) => todo.id !== action.payload.id);
        // },
    },
    extraReducers: {
        [getTodosAsync.pending]: (state, action) => {
            state.status = 'pending';
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            console.log('fetched data successfuly!');
            const { todoListItems } = action.payload.todos;
            return {
                todoListItems,
                status: 'complete',
                error: null,
            };
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.todoListItems.push(action.payload.todo);
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.todoListItems.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state.todoListItems[index].completed = action.payload.completed;
        },
        [toggleDeleteAsync.fulfilled]: (state, action) => {
            state.todoListItems = action.payload.todos;
        },
    },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
