import React, { useState } from "react";
import "./styles.css";

interface OrderProduct {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
  };
}

interface Order {
  id: string;
  total: number;
  createdAt: string;
  status: string;
  products: OrderProduct[];
}

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders = [] }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusClass = (status: string): string => {
    switch (status) {
      case "PENDING":
        return "status-pending";
      case "COMPLETED":
        return "status-completed";
      case "CANCELED":
        return "status-canceled";
      default:
        return "status-default";
    }
  };

  return (
    <div className="order-history">
      {orders?.length === 0 ? (
        <p className="empty">Você ainda não fez nenhum pedido.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} className="order">
              <div>
                <h3>Pedido #{order.id}</h3>
                <p>Total: R${order.total}</p>
                <p>Data: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className={getStatusClass(order.status)}>
                  Status: {order.status}
                </p>
              </div>
              <button onClick={() => setSelectedOrder(order)}>
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedOrder && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setSelectedOrder(null)}
          ></div>
          <div className="modal">
            <h3>Detalhes do Pedido </h3>
            <h5>#{selectedOrder.id}</h5>
            <p className={getStatusClass(selectedOrder.status)}>
              Status: {selectedOrder.status}
            </p>
            <p>Total: R${selectedOrder.total}</p>
            <ul>
              {selectedOrder.products.map((item) => (
                <li key={item.id} className="order-product-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="order-product-details">
                    <h4>{item.product.name}</h4>
                    <p>Quantidade: {item.quantity}</p>
                    <p>Preço unitário: R${item.product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={() => setSelectedOrder(null)}>Fechar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderHistory;
