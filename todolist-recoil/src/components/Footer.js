import { useRecoilState, useSetRecoilState } from 'recoil'
import * as state from '../state/todos'

const Footer = () => {
  const [ filterType, setFilterType ] = useRecoilState(state.filterType)
  const setTodos = useSetRecoilState(state.todos)
  const filteredClass = state.filteredClass

  const handleClearCompleted = () => {
    setTodos(todos => todos.filter(todo => !todo.done))
  }

  return (
    <footer className="footer">
      <span className="todo-count"><strong>0</strong> item left</span>
      <ul className="filters">
        <li><a className={ filteredClass } onClick={ () => setFilterType('all')  } href="#/"         >All</a></li>
        <li><a className={ filteredClass } onClick={ () => setFilterType('do')   } href="#/active"   >Active</a></li>
        <li><a className={ filteredClass } onClick={ () => setFilterType('done' )} href="#/completed">Completed</a></li>
      </ul>
      <button className="clear-completed" onClick={ handleClearCompleted }>Clear completed</button>
    </footer>
  )
}

export default Footer;