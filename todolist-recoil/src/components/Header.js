import { useState } from 'react'
import { createTodo, todos } from '../state/todos'
import { useSetRecoilState } from 'recoil'

const Header = () => {
  const [ value, setValue ] = useState('')
  const setTodos = useSetRecoilState(todos);

  const handleInput = e => {
    setValue(e.target.value.trim())
  }

  const handleAddTodo = e => {
    // 엔터키가 아니면 리턴
    if(!(e.key === 'Enter' || e.keyCode === 13)) return;
    
    // 입력 값이 비어 있다면 리턴
    if(value === '') return setValue('');

    setTodos(todos => [
      ...todos,
      createTodo(value),
    ])
    setValue('')
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input 
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={ value }
        onChange={ handleInput }
        onKeyDown={ handleAddTodo }
      />
    </header>
  )
}

export default Header;