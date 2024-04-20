import "./App.css";
import TodoContainer from "./components/todoContainer";
import TodoEditingModal from "./components/todoEditingModal";
import { useTodos } from "./context/todoContext";

function App() {
  const { todos, addTodo, updateTodo, showTodoModal, setShowTodoModal, editingTodoId, setEditingTodoId, clearTodos } = useTodos();

  const closeModal = () => {
    setShowTodoModal(false);
    setEditingTodoId(null);
  }

  const saveTodo = (todo) => {
    if (editingTodoId) {
      updateTodo(
        todo
      );
    }
    else {
      addTodo(todo);
    }
    closeModal();
  }

  return (
    <>
      <main id="app-body">
        <h1>Tasker</h1>
        <hr />
        <div className="buttons-container">
          <button className="button-primary" onClick={() => { setShowTodoModal(!showTodoModal) }}>+ New Task</button>
          <button className="button-danger" onClick={clearTodos}> 🗑  Clear All</button>
        </div>
        <TodoContainer sectionType="pending" title="⏳Pending" sectionTodos={todos.filter(todo => todo.status === 'pending')} emptyMessage="Waiting for tasks like waiting for Wi-Fi in the middle of nowhere" />
        <TodoContainer sectionType="in-progress" title="🕒 In Progress" sectionTodos={todos.filter(todo => todo.status === 'in-progress')} emptyMessage="Looks like tasks are on a coffee break, just like us!" />
        <TodoContainer sectionType="completed" title="✅ Done" sectionTodos={todos.filter(todo => todo.status === 'completed')} emptyMessage="This section is so empty, even crickets aren't chirping!" />
      </main>
      {
        showTodoModal && (<TodoEditingModal saveAction={saveTodo} closeAction={closeModal} />)
      }
    </>
  );
}

export default App;
