import { createContext, useEffect, useContext, useState } from "react";

// Create the todo context.
const TodoContext = createContext();

// Custom hook to use the todo context.
export const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodos must be used within a TodoProvider");
    }
    return context;
};

export const TodoProvider = ({ children }) => {
    // Initialize the todos state with the todos from localStorage.
    const [todos, setTodos] = useState(() => {
        // Get the todos from localStorage.
        const existingTodos = localStorage.getItem("todos");
        return existingTodos ? JSON.parse(existingTodos) : [];
    });

    // State to show/hide the todo modal.
    const [showTodoModal, setShowTodoModal] = useState(false);

    // State to store the current editing todo id.
    const [editingTodoId, setEditingTodoId] = useState(null);

    /**
     * Adds a new todo to the todos state.
     *
     * @param {Object} todo
     */
    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };

    /**
     * Deletes a todo from the todos state.
     *
     * @param {Number} id
     */
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    /**
     * Updates a todo in the todos state.
     *
     * @param {Object} updatedTodo
     */
    const updateTodo = (updatedTodo) => {
        setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    };

    /**
     * Gets the current editing todo.
     *
     * @returns {Object} The current editing todo.
     */
    const getCurrentTodo = () => {
        return todos.find((todo) => todo.id === editingTodoId);
    };

    /**
     * Clears all the todos.
     */
    const clearTodos = () => {
        setTodos([]);
    };

    useEffect(() => {
        // Save the todos to localStorage
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoContext.Provider
            value={{
                todos,
                addTodo,
                deleteTodo,
                updateTodo,
                showTodoModal,
                setShowTodoModal,
                setEditingTodoId,
                editingTodoId,
                getCurrentTodo,
                clearTodos,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
