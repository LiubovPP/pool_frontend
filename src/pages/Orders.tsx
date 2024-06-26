import type React from "react"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@app/hooks/hooks"
import { fetchOrders, deleteOrder, updateOrder } from "@app/slices/orderSlice"
import "@styles/Order.css"

const OrdersPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { orders, loading, error } = useAppSelector((state) => state.orders)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const handleDeleteOrder = (id: number) => {
    dispatch(deleteOrder(id))
  }

  const handleUpdateOrder = (id: number) => {
    // обработка обновления заказа
    dispatch(updateOrder({ id, userId: 1, summa: 100, itemsCount: 1, date: new Date().toISOString(), products: [] }))
  }

  if (loading) return <p>Загрузка...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="orders-page">
      <h1>Заказы</h1>
      {orders.map((order) => (
        <div key={order.id} className="order">
          <div className="order-details">
            <span>ID: {order.id}</span>
            <span>Сумма: {order.summa}</span>
            <span>Количество товаров: {order.itemsCount}</span>
            <span>Дата: {order.date}</span>
          </div>
          <div className="order-actions">
            <button onClick={() => handleUpdateOrder(order.id)}>Обновить</button>
            <button onClick={() => handleDeleteOrder(order.id)}>Удалить</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrdersPage