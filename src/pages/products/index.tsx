import React, { useState, useEffect } from "react";
import ProductTable from "../../components/product-table";
import "./styles.css";
import ProductModal from "../../components/modal-products";
import ProductService from "../../services/ProductSerivce";

const productService = new ProductService();

const Products: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    document.title = "Admin Produtos - BMQ";
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

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (product: any) => {
    if (product.id) {
      productService
        .updateProduct(product.id, product, user.id)
        .then(() => {
          getProductsData();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      productService
        .createProduct(product, user.id)
        .then(() => {
          getProductsData();
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="products-page">
      <div className="table-container">
        <div className="table-header">
          <h2>Produtos</h2>
          <button className="add-button" onClick={handleEditProduct}>
            Adicionar Produto
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th className="fit">Ação</th>
            </tr>
          </thead>
          <ProductTable
            data={data}
            isLoading={isLoading}
            handleEditProduct={handleEditProduct}
          />
        </table>
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
