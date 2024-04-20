import React from 'react'
import TodoCard from './todoCard'

export default function TodoContainer({ title, todos, emptyMessage="No tasks found"}) {
    return (
        <div className="todos-container-section">
            <h2>{title}</h2>
            {todos.length === 0 && <p className="empty-message"> {emptyMessage}</p>}
            <div className="todos-container">
                {todos.map((todo) => (
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
