import { createRef, useEffect } from "react";
import { useTodos } from "../context/todoContext";

export default function TodoEditingModal({ saveAction, closeAction }) {
    const { getCurrentTodo, editingTodoId } = useTodos();
    const titleRef = createRef();
    const descriptionRef = createRef();
    const statusRef = createRef();
    const dueDateRef = createRef();

    /**
     * Set the form defaults for the current editing Todo.
     */
    const setFormDefaults = () => {
        // Get the current editing Todo Data if any.
        const currentTodo = getCurrentTodo();
        if (currentTodo) {
            titleRef.current.value = currentTodo.title;
            descriptionRef.current.value = currentTodo.description;
            statusRef.current.value = currentTodo.status;
            dueDateRef.current.value = currentTodo.dueDate;
        } else {
            const today = new Date().toISOString().slice(0, 10);
            dueDateRef.current.value = today;
        }
    };

    useEffect(() => {
        // Set the form defaults for the current editing Todo.
        setFormDefaults();

        // Focus after setting defaults
        titleRef.current.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClose = () => {
        closeAction();
    };

    const handleSave = (e) => {
        e.preventDefault();

        // Get the current editing todo id or create a new one.
        const todoId = editingTodoId ?? Date.now() + Math.floor(Math.random() * 1000);
        const newTodo = {
            id: todoId,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            status: statusRef.current.value,
            dueDate: dueDateRef.current.value,
        };
        saveAction(newTodo);
    };

    return (
        <div className="card modal">
            <div className="modal-content">
                <h2>New Task</h2>
                <form onSubmit={handleSave}>
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input
                            ref={titleRef}
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Debug the Universe"
                            maxLength={40}
                            minLength={1}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <textarea
                            ref={descriptionRef}
                            id="description"
                            name="description"
                            placeholder="Patch up black holes with quantum algorithms"
                            required
                        ></textarea>
                    </div>
                    <div className="form-control">
                        <label htmlFor="status">Status</label>
                        <select ref={statusRef} id="status" name="status" required>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label htmlFor="due-date">Due Date</label>
                        <input
                            ref={dueDateRef}
                            type="date"
                            id="due-date"
                            name="due-date"
                            required // Ensure required is still here
                        />
                    </div>
                    <div className="buttons-container">
                        <button type="submit" className="button-primary">
                            Save
                        </button>
                        <button className="button-danger" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
