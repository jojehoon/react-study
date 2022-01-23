import React, { useState, useEffect } from 'react';
import axios from 'axios'

function Users() {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    try {
      // 요청 시작할 때는 error, users 초기화
      setError(null)
      setUsers(null)

      // loading 시작
      setLoading(true)
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      setUsers(response.data)
    }catch(e) {
      setError(e)
    }

    // loading 종료
    setLoading(false)
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
          users.map(user => <li key={user.id}>{ user.username } ({ user.name })</li>)
        }
      </ul>
      <button onClick={ fetchUsers }>다시 불러오기</button>
    </div>
  );
}

export default Users;