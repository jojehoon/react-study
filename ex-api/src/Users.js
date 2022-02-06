import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios'

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      }
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null
      }
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      }
    default:
      throw new Error(`unhandled action type ${action.type} `)
  }
}

async function getUsers() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users/')
  return response.data
}

async function getUser(id) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/{id}`)
  return response.data
}

function User() {
  const [state, dispatch] = useReducer(reducer, {
    
  })
}

function Users() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  })

  const { loading, data: users, error } = state;

  const fetchUsers = async () => {
    dispatch({ type: 'LOADING', loadgin: true })
    try {
      const data = await getUsers()
      dispatch({ type: 'SUCCESS', data })
    }catch(error) {
      dispatch({ type: 'ERROR', error })
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) return <div>로딩중...</div>;
  if (error)   return <div>에러가 발생했습니다</div>;
  if (!users)  return null;

  return (
    <div>
      <ul>
        {
          users.map(user => (
            <li key={ user.id }>{ user.username } ({ user.name })</li>
          ))
        }
      </ul>
      <button onClick={ fetchUsers }>다시 불러오기</button>
    </div>
  );
}

export default Users;