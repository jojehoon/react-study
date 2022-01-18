import { useSetRecoilState } from 'recoil'
import { todos } from '../state/todos'


// TODO: todo state 변경 로직 
const Todo = (props) => {
  // state 변경을 위한 setter
  const setTodos = useSetRecoilState(todos)

  // props...
  const { id, done, text } = props.todo

  // 변경 로직
  const toggleTodo = checked => {

    // useSetRecoilState의 인자로 값이 아닌 callback을 넘겨주면 callback의 parameter로 state를 받아올 수 있다
    setTodos(todos => todos.map(todo => {
      return todo.id === id
        ? { ...todo, done: checked }
        : todo
    }))
  }

  const handleToggle = e => {
    const { checked } = e.target
    toggleTodo(checked)
  }

  const handleDestroy = () => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }

  return (
    <li className={ done ? 'completed' : '' } key={ id }>
      <div className="view">
        <input type="checkbox" className="toggle" checked={ done } onChange={ handleToggle } />
        <label>{ text }</label>
        <button className="destroy" onClick={ handleDestroy } />
      </div>
      <input className="edit" value="Create a TodoMVC template" />
    </li>
  )
}

export default Todo;