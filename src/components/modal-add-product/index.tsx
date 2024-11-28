import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
}

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  product: Product;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  product,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);

  const navigation = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?.id) {
      setNotification(
        "Você precisa estar logado para adicionar produtos ao carrinho."
      );

      setTimeout(() => {
        navigation("/login");
      }, 2000);
      return;
    }

    if (user.role == "ADMIN") {
      setNotification(
        "Administradores não podem adicionar produtos ao carrinho."
      );
      return;
    }
    onAddToCart(product, quantity);
    onClose();
  };

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Adicionar ao Carrinho</h2>
        <div className="modal-content">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">Preço: R$ {product.price.toFixed(2)}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="quantity">Quantidade</label>
            <div className="quantity-controls">
              <button
                type="button"
                onClick={handleDecrement}
                className="quantity-button"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                max={product.stock}
                required
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="quantity-button"
              >
                +
              </button>
            </div>
          </div>
          <div className="modal-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="add-button">
              Adicionar ao Carrinho
            </button>
          </div>
        </form>
        {notification && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            {notification}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddToCartModal;
