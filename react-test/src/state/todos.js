import { atom, selector } from 'recoil'

let uniqId = 0

const createTodo = text => ({
  id: ++uniqId,
  done: false,
  text,
})

const todos = atom({
  key: 'todos',
  default: [
    createTodo('recoil - 1'),
    createTodo('recoil - 2'),
  ]
})

const filterType = atom({
  key: 'filterType',
  default: 'all',
})

// todos, filterType을 구독 혹은 의존
const filteredTodos = selector({
  key: 'filteredTodos',
  get: ({ get }) => {
    const items = get(todos)
    const type = get(filterType)

    switch (type) {
      case 'do':
        return items.filter(item => !item.done)
      case 'done':
        return items.filter(item => item.done)
      default:
        return items
    }
  }
})

const filteredClass = selector({
  key: 'filteredClass',
  get: ({get}) => {
    const type = get(filterType)

    switch (type) {
      case 'all':
      case 'do':
      case 'done':
        return 'selected'
      default:
        return ''
    }
  }
})

export {
  createTodo,
  todos,
  filterType,
  filteredTodos,
  filteredClass,
}
