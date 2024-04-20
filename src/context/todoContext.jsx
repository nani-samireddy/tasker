import { createContext, useEffect, useContext, useState } from "react";

const TodoContext = createContext();

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodos must be used within a TodoProvider');
    }
    return context;
}

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState(() => {
        const existingTodos = localStorage.getItem('todos');
        return existingTodos ? JSON.parse(existingTodos) : [];
    });

    const [showTodoModal, setShowTodoModal] = useState(false);

    const [editingTodoId, setEditingTodoId] = useState(null);

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const updateTodo = (updatedTodo) => {
        setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
    }

    const getCurrentTodo = () => {
        return todos.find(todo => todo.id === editingTodoId);
    }

    const clearTodos = () => {
        setTodos([]);
    }

    // Save todos to local storage whenever todos change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoContext.Provider value={{ todos, addTodo, deleteTodo, updateTodo, showTodoModal, setShowTodoModal, setEditingTodoId, editingTodoId, getCurrentTodo, clearTodos }}>
            {children}
        </TodoContext.Provider>
    )
}
