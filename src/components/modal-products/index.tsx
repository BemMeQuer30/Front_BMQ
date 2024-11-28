import React, { useState, useEffect } from "react";
import "./styles.css";

interface Product {
  id?: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  categoryId: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setImage(product.image);
      setPrice(product.price);
      setStock(product.stock);
      setCategoryId(product.categoryId);
    } else {
      setName("");
      setDescription("");
      setImage("");
      setPrice(0);
      setStock(0);
      setCategoryId("");
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: product?.id,
      name,
      description,
      image,
      price,
      stock,
      categoryId,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2
          style={{
            margin: 0,
            fontSize: "1.5rem",
          }}
        >
          {product ? "Editar Produto" : "Adicionar Produto"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="image">Imagem</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div className="input-group-row">
            <div className="input-group">
              <label htmlFor="price">Preço</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="stock">Estoque</label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="categoryId">Categoria</label>
            <select
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecione...
              </option>
              <option value="cat-1">Skincare</option>
              <option value="cat-2">Pele</option>
              <option value="cat-3">Olhos</option>
              <option value="cat-4">Boca</option>
              <option value="cat-5">Vegan</option>
            </select>
          </div>
          <div className="button-group-products">
            <button type="submit" className="save-button-products">
              Salvar
            </button>
            <button
              type="button"
              className="cancel-button-products"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
