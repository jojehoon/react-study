import { createContext, useReducer, useContext, useRef } from 'react'

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false
  }
]

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(
        todo => todo.id === action.id 
        ? {...todo, done: !todo.done }
        : todo
        );
      case 'REMOVE':
        return state.filter(
          todo => todo.id !== action.id
        )
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// NOTE: state와 dispatch를 분리해 성능 최적화
const TodoStateContext = createContext()
const TodoDispatchContext = createContext()
const TodoNextIdContext = createContext()

function TodoProvier({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos)
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          { children }
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// NOTE: 사용하기 편하게 커스텀 훅 작성
function useTodoState() {
  // NOTE: Provider 래핑 에러 방지
  const context = useContext(TodoStateContext)
  if(!context) {
    throw new Error('Cannot find TodoProvier')
  }
  return context;
}

function useTodoDispatch() {
  const context = useContext(TodoDispatchContext)
  if(!context) {
    throw new Error('Cannot find TodoProvier')
  }
  return context
}

function useTodoNextId() {
  const context = useContext(TodoNextIdContext)
  if(!context) {
    throw new Error('Cannot find TodoProvier')
  }
  return context
}

/*
import { useContext } from 'react'
import { TodoStateContext, TodoDispatchContext } from '../TodoContext'

function Sample() {
  const state = useContext(TodoStateContext)
  const dispatch = useContext(TodoDispatchContext)
  return <div>Sample</div>
}

//

import { useTodoState, useTodoDispatch } from '../TodoContext'

function Sample() {
  const state = useTodoState()
  const dispatch = useTodoDispatch()
  return <div>Sample</div>
}
*/

export {
  TodoProvier,
  useTodoState,
  useTodoDispatch,
  useTodoNextId,
}