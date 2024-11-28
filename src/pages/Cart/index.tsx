import React, { useState, useEffect } from "react";
import "./styles.css";

import CartService from "../../services/CartService";
import CartItems from "../../components/cart-items";
import OrderHistory from "../../components/order-items";
import Spinner from "../../components/Spinner";

const cartService = new CartService();

type CartProduct = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
};

type Order = {
  id: string;
  userId: string;
  address: string;
  total: number;
  status: string;
  createdAt: string;
  products: {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      description: string;
      image: string;
      price: number;
      stock: number;
      categoryId: string;
    };
  }[];
};

const CartPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"cart" | "orders">("cart");
  const [cart, setCart] = useState<{ id: string; products: CartProduct[] }>({
    id: "",
    products: [],
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = async () => {
    setIsLoading(true);
    try {
      const response = await cartService.getCart(user.id);
      console.log("response:", response);
      setCart(response.cart);
      setOrders(response.orders);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container-cart">
      <div className="tabs">
        <button
          className={activeTab === "cart" ? "active" : ""}
          onClick={() => setActiveTab("cart")}
        >
          Carrinho
        </button>
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Histórico de Compras
        </button>
      </div>
      <div className="tab-content">
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Spinner />
          </div>
        ) : activeTab === "cart" ? (
          <CartItems cart={cart} products={cart.products} />
        ) : (
          <OrderHistory orders={orders} />
        )}
      </div>
    </div>
  );
};

export default CartPage;
