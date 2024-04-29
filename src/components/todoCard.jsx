import { useTodos } from "../context/todoContext";

export default function TodoCard({
    id,
    title = "Todo Title",
    description = "Todo Description",
    status = "pending",
    dueDate = new Date().toLocaleDateString(),
}) {
    const { deleteTodo, setShowTodoModal, setEditingTodoId } = useTodos();

    /**
     * Sets the current `editingTodoId` and displays the `todoModal`.
     */
    const handleEdit = () => {
        setEditingTodoId(id);
        setShowTodoModal(true);
    };

    /**
     * Deletes the todo.
     */
    const handleDelete = () => {
        deleteTodo(id);
    };

    /**
     * Sets the current Dragged `todoId` in the dataTransfer.
     *
     * @param {Event} e
     */
    const handleDragStart = (e) => {
        // Set the todoId to the dataTransfer object.
        e.dataTransfer.setData("todoId", id);
    };

    return (
        <div className="todo-card" draggable onDragStart={handleDragStart} onTouchStart={handleDragStart}>
            <p className="todo-title">{title}</p>
            <p className="todo-description">{description}</p>
            <div className="status-and-date">
                <p className={`todo-status todo-status-${status}`}>
                    {" "}
                    {status === "completed" ? "✅ Done" : status === "in-progress" ? "🕒 In Progress" : "⏳ Pending"}
                </p>
                <p className="todo-date"> 🗓️ {dueDate}</p>
            </div>

            <div className="buttons-container">
                <button className="button-primary" onClick={handleEdit}>
                    {" "}
                    📝 edit
                </button>
                <button className="button-danger" onClick={handleDelete}>
                    🗑 trash
                </button>
            </div>
        </div>
    );
}
