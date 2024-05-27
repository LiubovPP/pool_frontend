import type React from 'react';
import { useEffect } from 'react';
import type { RootState, AppDispatch } from '../app/store';
import { fetchUsers, deleteUser } from '../app/slices/usersSlice';
import { useAppDispatch, useAppSelector } from "@app/hooks/hooks"

const AdminUsers: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Пользователи</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.email}
            <button onClick={() => handleDelete(user.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
