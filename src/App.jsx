import { createMemo, createSignal } from "solid-js";
import Card from './components/common/Card';
import Container from './components/common/Container';
import TodoFilter from './components/TodoFilter';
import TodoFooter from './components/TodoFooter';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import createTodo from './hooks/createTodo';

function App() {

  const [data, dispatch] = createTodo()
  const [status, setStatus] = createSignal(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    dispatch(() => [...data(), { id: new Date().getTime(), name: formData.get('name'), completed: false }])
    e.target.reset();
  }

  const todoFilter = createMemo(() => {
    return data().filter((todo) => status() === null || todo.completed === status())
  })

  const handleCheck = (id, { target: { checked } }) => {
    dispatch(() => data().map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: checked }
      }
      return todo;
    }))
  }

  const handleDelete = (id) => {
    dispatch((data) => data.filter((todo) => todo.id !== id))
  }

  const handleToggleCheck = () => {
    const checked = data().some(t => !t.completed);
    dispatch((data) => data.map((todo) => ({ ...todo, completed: checked })))
  }

  const handleClearComplete = () => {
    dispatch(data => data.filter(todo => !todo.completed))
  }

  return (
    <Container sc={['flex', 'justify-center', 'itens-center', 'mt-10']}>
      <Card>
        <TodoForm handleSubmit={handleSubmit} />
        <TodoFilter status={status} setStatus={setStatus} />
        <TodoList todoFilter={todoFilter} handleCheck={handleCheck} handleDelete={handleDelete} />
        <TodoFooter data={data} handleToggleCheck={handleToggleCheck} handleClearComplete={handleClearComplete} />
      </Card>
    </Container>
  );
}

export default App;
