import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import someBs from './someBs';

export default configureStore({
    reducer: {
        todos: todoReducer,
        someBs: someBs,
    },
});
