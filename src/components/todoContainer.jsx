import React from 'react'
import TodoCard from './todoCard'
import { useTodos } from '../context/todoContext';

export default function TodoContainer({
    title,
    sectionTodos,
    sectionType = 'pending',
    emptyMessage = 'No tasks found',
}) {
    const { updateTodo, todos } = useTodos();

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const todoId = e.dataTransfer.getData('text/plain');
        const draggedTodo = todos.find((todo) => todo.id === todoId);
        if (draggedTodo) {
            updateTodo({ ...draggedTodo, status: sectionType });
        }
    };

    return (
        <div
            className="todos-container-section"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onTouchMove={(e) => {
                // Prevent scrolling while dragging on mobile
                e.preventDefault();
            }}
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
