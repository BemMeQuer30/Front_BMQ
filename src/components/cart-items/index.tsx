import React, { useState, useEffect } from "react";
import "./styles.css";
import CartService from "../../services/CartService";
import Spinner from "../Spinner";

const cartService = new CartService();

interface CartProduct {
  id: string;
  productId: string;
  quantity: number;
  product: CartProductItem;
}

interface CartProductItem {
  categoryId: string;
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  stock: number;
}

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

interface CartProps {
  cart: {
    id: string;
    products: CartProduct[];
  };
  products?: ProductDetails[];
}

const CartItems: React.FC<CartProps> = ({ cart, products }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(
    null
  );
  const [priceTotal, setPriceTotal] = useState(0);
  const [qtdItens, setQtdItens] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Função para obter os detalhes do produto
  const getProductDetails = (productId: string) =>
    products?.find((product) => product.id === productId);

  // Atualiza os totais de preço e quantidade sempre que o carrinho muda
  useEffect(() => {
    const totalPrice = cart.products.reduce((total, item) => {
      const product = getProductDetails(item.productId);
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
    const totalItems = cart.products.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setPriceTotal(totalPrice);
    setQtdItens(totalItems);
  }, [cart.products]);

  // Função para remover um item do carrinho
  const removeItem = (productId: string) => {
    console.log("Remove item", productId);
  };

  // Função para atualizar a quantidade de um item
  const updateItem = (productId: string, quantity: number) => {
    console.log("Update item", productId, quantity);
  };

  const handleSubmmit = async () => {
    setIsLoading(true);

    try {
      const response = await cartService.checkout(cart.id, { address: " " });
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (response) {
        setIsRedirecting(true);
        setTimeout(() => {
          const whatsappMessage = `Pedido realizado com sucesso! Total de Itens: ${qtdItens} Valor Total: R$${priceTotal.toFixed(
            2
          )}.\n\nInformações do Pedido:\nID do Pedido: ${
            cart.id
          }\n\nInformações do Usuário:\nNome: ${user.name}\n`;
          const whatsappNumber = import.meta.env.VITE_WPP_NUMBER;
          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
          )}`;
          window.open(whatsappUrl, "_blank");
        }, 3000);
        setIsRedirecting(false);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="cart-items">
      {cart?.products?.length === 0 ? (
        <p className="empty">
          Seu carrinho está vazio. Adicione produtos para começar!
        </p>
      ) : (
        <div className="box">
          <div className="cart-summary">
            <p>Total de Itens: {qtdItens}</p>
            <p>Valor Total: R${priceTotal.toFixed(2)}</p>
          </div>
          <div className="finalizar-venda">
            <button onClick={() => handleSubmmit()}>Finalizar Compra</button>
          </div>
          <div className="cart-items">
            {cart.products?.map((item) => {
              const product = getProductDetails(item.productId);
              return (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h4>{item.product?.name}</h4>
                    <p>Preço unitário: R${item.product?.price.toFixed(2)}</p>
                    <p>Quantidade: {item.quantity}</p>
                    <p>Total: R${(item.product?.price || 0) * item.quantity}</p>
                  </div>
                  <div className="item-actions">
                    <button
                      disabled={true}
                      style={{ cursor: "not-allowed" }}
                      onClick={() =>
                        updateItem(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      disabled={true}
                      style={{ cursor: "not-allowed" }}
                      onClick={() =>
                        updateItem(item.productId, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <button
                      disabled={true}
                      style={{ cursor: "not-allowed" }}
                      onClick={() => removeItem(item.productId)}
                    >
                      Remover
                    </button>
                    <button onClick={() => setSelectedProduct(item.product)}>
                      Detalhes
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {selectedProduct && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setSelectedProduct(null)}
          ></div>
          <div className="modal-cart">
            <h3>{selectedProduct.name}</h3>
            <div className="img-box">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>
            <p>{selectedProduct.description}</p>
            <p>Preço unitário: R${selectedProduct.price}</p>
            <button onClick={() => setSelectedProduct(null)}>Fechar</button>
          </div>
        </>
      )}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <p>Finalizando compra...</p>
            <h5>Por favor, aguarde, a venda será finalizada via Whatsapp</h5>
            <Spinner />
            <p>{isRedirecting ?? "Redirecionando para o WhatsApp..."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
