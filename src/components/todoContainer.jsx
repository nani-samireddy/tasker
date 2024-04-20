import React from 'react'
import TodoCard from './todoCard'
import { useTodos } from '../context/todoContext';

export default function TodoContainer({ title, sectionTodos, sectionType = "pending", emptyMessage = "No tasks found" }) {
    const { updateTodo, todos } = useTodos();
    const handleDragOver = (e) => {
        e.preventDefault();
        console.log('drag over');
    }
    const handleDrop = (e) => {
        console.log('dropped');
        const todoId = e.dataTransfer.getData("todoId");
        console.log(todoId);
        console.log(todos);
        const draggedTodo = todos.find(todo => todo.id == todoId);
        console.log(draggedTodo);
        updateTodo({ ...draggedTodo, status: sectionType });
    }
    return (
        <div className="todos-container-section" onDrop={handleDrop} onDragOver={handleDragOver}>
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
    )
}
