import { useState } from "react";
import TodoCard from "./todoCard";
import { useTodos } from "../context/todoContext";

export default function TodoContainer({ title, sectionTodos, sectionType = "pending", emptyMessage = "No tasks found" }) {
    const { updateTodo, todos } = useTodos();

    const [isDraggedOver, setIsDraggedOver] = useState(false);

    /**
     * Prevents the default behavior and sets the dragged over state to true.
     *
     * @param {Event} e
     */
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDraggedOver(true);
    };

    /**
     * Prevents the default behavior and sets the dragged over state to false.
     *
     * @param {Event} e
     */
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDraggedOver(false);
    };

    /**
     * Updates the dragged Todo status to the current section type.
     *
     * @param {Event} e
     */
    const handleDrop = (e) => {
        e.preventDefault();

        // Set the Dragged over state to false and get the todoId from the dataTransfer object.
        setIsDraggedOver(false);
        const todoId = e.dataTransfer.getData("todoId");
        const draggedTodo = todos.find((todo) => todo.id == todoId);

        // Update the todo status only if it is not the same as the current section.
        if (draggedTodo.status === sectionType) return;

        // Update the todo status
        updateTodo({ ...draggedTodo, status: sectionType });
    };

    return (
        <div
            className={`todos-container-section ${isDraggedOver ? "todo-container-dragged-over" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onTouchMove={handleDragOver}
        >
            <h2>{title}</h2>
            {sectionTodos.length === 0 && <p className="empty-message"> {emptyMessage}</p>}
            <div className="todos-container">
                {sectionTodos.map((todo) => (
                    <TodoCard
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                        status={todo.status}
                        dueDate={todo.dueDate}
                    />
                ))}
            </div>
        </div>
    );
}
