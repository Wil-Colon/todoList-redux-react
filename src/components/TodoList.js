import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';
import CircularIndeterminate from '../loadComponents/spinner';

const TodoList = () => {
    const dispatch = useDispatch();

    const loadStatus = useSelector((state) => state.todos.status);

    const todos = useSelector((state) => state.todos.todoListItems);

    //////Normal code/////

    // useEffect(() => {
    //     if (loadStatus === 'pending') {
    //         dispatch(getTodosAsync(), [dispatch]);
    //     }
    // });

    //Settimeout to simulate fake loading
    useEffect(() => {
        setTimeout(() => {
            if (loadStatus === 'pending') {
                dispatch(getTodosAsync());
            }
        }, 3000);
    }, [dispatch]);

    let content;

    if (loadStatus === 'pending') {
        content = <CircularIndeterminate />;
    } else if (todos.length === 0) {
        content = <h4>Your todo list is empty</h4>;
    } else if (loadStatus === 'complete') {
        content = todos.map((todo, index) => (
            <TodoItem
                key={index}
                id={todo._id}
                title={todo.title}
                completed={todo.completed}
            />
        ));
    }

    return <ul className="list-group">{content}</ul>;
};

export default TodoList;
