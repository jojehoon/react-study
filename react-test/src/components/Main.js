import { useRecoilValue } from 'recoil'
import * as state from '../state/todos'
import Todo from './Todo'

const Main = () => {
  const todos = useRecoilValue(state.filteredTodos)
  const Todos = todos.map(todo => <Todo key={todo.id} todo={todo} />)

  return (
    <section className="main">
      <input type="checkbox" id="toggle-all" className="toggle-all" />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        { Todos }
      </ul>
    </section>
  )
}

export default Main;