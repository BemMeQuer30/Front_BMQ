// src/components/ProductTable.tsx
import React from "react";
import "./styles.css";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  categoryId: string;
}

interface ProductTableProps {
  data: Product[];
  isLoading: boolean;
  handleEditProduct: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  data,
  isLoading,
  handleEditProduct,
}) => {
  return (
    <tbody>
      {isLoading ? (
        <>
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              <td>
                <div className="skeleton short"></div>
              </td>
              <td>
                <div className="skeleton medium"></div>
              </td>
              <td>
                <div className="skeleton short"></div>
              </td>
              <td>
                <div className="skeleton medium"></div>
              </td>
              <td>
                <div className="skeleton long"></div>
              </td>
            </tr>
          ))}
        </>
      ) : (
        data?.map((product, i) => (
          <tr key={i}>
            <td>
              <div className="product-info">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <p>{product.name}</p>
              </div>
            </td>
            <td>{product.description}</td>
            <td>R${product.price.toFixed(2)}</td>
            <td>{product.stock}</td>
            <td>
              <button
                className="action-button-edit"
                onClick={() => handleEditProduct(product)}
              >
                Editar
              </button>
              <button className="action-button-delete">Excluir</button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
};

export default ProductTable;
