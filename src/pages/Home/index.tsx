import { useEffect, useState } from "react";
import "./styles.css";
import { Card } from "../../components/card/card";
import ProductService from "../../services/ProductSerivce";
import AddToCartModal from "../../components/modal-add-product";
import CartService from "../../services/CartService";

const productService = new ProductService();
const cartService = new CartService();

const Home: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [cart, setCart] = useState<any[]>([]);

  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    document.title = "Home - BMQ";
  }, []);

  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = async () => {
    setIsLoading(true);
    try {
      const response = await productService.getAllProducts();
      setData(response);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleAddToCart = async (product: any, quantity: number) => {
    try {
      await cartService.addItemToCart(user.id, {
        productId: product.id,
        quantity,
      });
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === product.id);

        if (existingProduct) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [...prevCart, { ...product, quantity }];
      });
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho:", error);
    }
  };

  return (
    <div className="container">
      <section className="promo-section background-image">
        <div className="promo-content">
          <h1 className="promo-title">Melu</h1>
          <div className="promo-copy">
            <div className="t-h4">
              <p>
                <b>Cuide da Sua pele</b>
              </p>
            </div>
            <div className="promo-link-group">
              <a
                aria-label="Get Started Link"
                href="htmls/"
                className="promo-link"
              >
                Ver mais
              </a>
              <a
                aria-label="Get Started Link"
                href="https://www.melumaquiagem.com.br/"
                className="promo-link"
              >
                Melu
              </a>
            </div>
          </div>
        </div>
      </section>
      {isLoading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <div className="card-grid-items">
          {data.map((product) => (
            <Card
              key={product.id}
              title={product.name}
              price={product.price}
              image={product.image}
              onAddToCart={() => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      )}
      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
        product={selectedProduct}
      />
    </div>
  );
};

export default Home;
