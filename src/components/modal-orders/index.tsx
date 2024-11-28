// src/components/OrderModal.tsx
import React, { useState, useEffect } from "react";
import "./styles.css";

import { Order } from "../../interface/Order";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: Order) => void;
  order?: Order;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  onSave,
  order,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [status, setStatus] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [wasEdited, setWasEdited] = useState(false);

  useEffect(() => {
    if (order) {
      setCustomerName(order.user.name);
      setOrderDate(new Date(order.createdAt).toISOString().split("T")[0]);
      setStatus(order.status);
      setTotalAmount(order.total);
    } else {
      setCustomerName("");
      setOrderDate("");
      setStatus("");
      setTotalAmount(0);
    }
  }, [order]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: order?.id || "",
      userId: order?.userId || "",
      address: order?.address || "",
      total: totalAmount,
      status,
      createdAt: orderDate,
      products: order?.products || [],
      user: {
        id: order?.user.id || "",
        email: order?.user.email || "",
        name: customerName,
        telefone: order?.user.telefone || "",
      },
    });
    onClose();
  };

  useEffect(() => {
    if (
      customerName !== order?.user.name ||
      orderDate !== new Date(order?.createdAt).toISOString().split("T")[0] ||
      status !== order?.status ||
      totalAmount !== order?.total
    ) {
      setWasEdited(true);
    } else {
      setWasEdited(false);
    }
  }, [customerName, orderDate, status, totalAmount, order]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{order ? "Editar Pedido" : "Adicionar Pedido"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="customerName">Nome do Cliente</label>
            <input
              style={{ cursor: order ? "not-allowed" : "auto" }}
              disabled={order ? true : false}
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="orderDate">Data do Pedido</label>
            <input
              style={{ cursor: order ? "not-allowed" : "auto" }}
              disabled={order ? true : false}
              type="date"
              id="orderDate"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="status">Status</label>
            <select
              style={{
                cursor:
                  order && status === "COMPLETED" ? "not-allowed" : "auto",
              }}
              disabled={order && status === "COMPLETED"}
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Selecione o status</option>
              <option value="PENDING">Pendente</option>
              <option value="COMPLETED">Concluído</option>
              <option value="CANCELED">Cancelado</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="totalAmount">Valor Total</label>
            <input
              style={{ cursor: order ? "not-allowed" : "auto" }}
              disabled={order ? true : false}
              type="number"
              id="totalAmount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(Number(e.target.value))}
              required
            />
          </div>
          <div className="button-group">
            <button
              type="button"
              className="cancel-button-orders"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="save-button-orders"
              disabled={!wasEdited}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
