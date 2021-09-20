import React from 'react';
import { useSelector } from 'react-redux';

const TotalCompleteItems = () => {
    const completed = useSelector((state) =>
        state.todos.todoListItems.filter((todo) => todo.completed === true)
    );

    return <h4 className="mt-3">Total Complete Items: {completed.length}</h4>;
};

export default TotalCompleteItems;
