import type React from "react"
import { useState, useEffect } from "react"
import type { RootState, AppDispatch } from "@app/store"
import { fetchUsers, deleteUser, updateUser } from "@app/slices/usersSlice"
import type { User } from "@app/types"
import "@styles/Profile.css"
import { useAppDispatch, useAppSelector } from "@app/hooks/hooks"

const Profile: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state.auth)
  const { users, loading, error } = useAppSelector((state: RootState) => state.users)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    if (user?.role === "ADMIN") {
      dispatch(fetchUsers())
    }
  }, [dispatch, user])

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id))
  }

  const handleUpdateUser = () => {
    if (editingUser) {
      dispatch(updateUser(editingUser))
      setEditingUser(null)
    }
  }
  if (!user) {
    return <p>Вы не авторизованы</p>
  }

  return (
    <div>
      <h1>Профиль</h1>
      <p>Имя: {user.firstName}</p>
      <p>Фамилия: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Телефон: {user.phoneNumber}</p>
      <p>Роль: {user.role}</p>
      {user.role === "ADMIN" && (
        <div>
          <h2>Пользователи</h2>
          {loading && <p>Загрузка...</p>}
          {error && <p>{error}</p>}
          <ul>
            {users.map((u) => (
              <li key={u.id}>
                {editingUser && editingUser.id === u.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingUser.firstName}
                      onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                    />
                    <input
                      type="text"
                      value={editingUser.lastName}
                      onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                    />
                    <input
                      type="text"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    />
                    <input
                      type="text"
                      value={editingUser.phoneNumber}
                      onChange={(e) => setEditingUser({ ...editingUser, phoneNumber: e.target.value })}
                    />
                    <button onClick={handleUpdateUser}>Сохранить</button>
                  </div>
                ) : (
                  <div>
                    {u.firstName} {u.lastName} - {u.email}
                    <button onClick={() => setEditingUser(u)}>Редактировать</button>
                    <button onClick={() => handleDeleteUser(u.id)}>Удалить</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Profile
