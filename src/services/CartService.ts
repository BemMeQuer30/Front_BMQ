import HttpService from "./HttpService";

type CartResponse = {
  cart: {
    id: string;
    userId: string;
    createdAt: string;
    products: {
      id: string;
      cartId: string;
      productId: string;
      quantity: number;
    }[];
  };
  orders: {
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
  }[];
};

class CartService extends HttpService {
  constructor() {
    super(); // Usa a URL base configurada no HttpService
  }

  getCart(userId: string) {
    return this.get<CartResponse>(`/cart/user/${userId}`);
  }

  addItemToCart(userId: string, item: { productId: string; quantity: number }) {
    return this.post(`/cart/${userId}/items`, item);
  }

  updateCartItem(userId: string, itemId: string, data: { quantity: number }) {
    return this.put(`/cart/${userId}/items/${itemId}`, data);
  }

  removeItemFromCart(userId: string, itemId: string) {
    return this.delete(`/cart/${userId}/items/${itemId}`);
  }

  clearCart(userId: string) {
    return this.delete(`/cart/${userId}`);
  }

  checkout(cartId: string, data: { address: string }) {
    return this.post(`/cart/${cartId}/checkout`, data);
  }
}

export default CartService;
