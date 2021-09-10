import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';

const TodoList = () => {
    const dispatch = useDispatch();

    const todos = useSelector((state) => state.todos);

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);

    //Settimeout to simulate .pending
    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatch(getTodosAsync());
    //     }, 3000);
    // }, [dispatch]);

    return (
        <ul className="list-group">
            {todos.map((todo) => (
                <TodoItem
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                />
            ))}
        </ul>
    );
};

export default TodoList;
