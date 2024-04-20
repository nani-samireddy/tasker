export default function TodoCard({
    id,
    title = 'Todo Title',
    description = 'Todo Description',
    status = 'pending',
    dueDate = new Date().toLocaleDateString(),
}) {
    const { deleteTodo, setShowTodoModal, setEditingTodoId } = useTodos();

    const handleEdit = () => {
        setEditingTodoId(id);
        setShowTodoModal(true);
    };

    const handleDelete = () => {
        deleteTodo(id);
    };

    const handleTouchStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.style.opacity = '0.5'; // Optional: Visual feedback for touch start
        e.dataTransfer.setData('text/plain', id);
    };

    return (
        <div
            className="todo-card"
            draggable="true"
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => {
                e.currentTarget.style.opacity = ''; // Reset opacity on touch end
            }}
        >
            <h4 className='todo-title'>{title}</h4>
            <p className='todo-description'>{description}</p>
            <div className="status-and-date">
                <p className={`todo-status todo-status-${status}`}> {status === 'completed' ? '✅ Done' : status === 'in-progress' ? '🕒 In Progress' : '⏳ Pending'}</p>
                <p className='todo-date'> 🗓️ {dueDate}</p>
            </div>

            <div className="buttons-container">
                <button className="button-primary" onClick={handleEdit}> 📝 edit</button>
                <button className="button-danger" onClick={handleDelete}>🗑 trash</button>
            </div>
        </div>
    );
}