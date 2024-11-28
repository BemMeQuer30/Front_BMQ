import HttpService from "./HttpService";
import { Orders } from "../interface/Order";

class OrderService extends HttpService {
  constructor() {
    super();
  }

  getOrders(userId: string) {
    return this.get(`/order/${userId}`);
  }

  createOrder(
    userId: string,
    orderData: { items: Array<{ productId: string; quantity: number }> }
  ) {
    return this.post(`/order/${userId}`, orderData);
  }

  getOrderById(userId: string, orderId: string) {
    return this.get(`/order/${userId}/${orderId}`);
  }

  cancelOrder(userId: string, orderId: string) {
    return this.delete(`/order/${userId}/${orderId}`);
  }

  getOrdersAdmin(adminId: string): Promise<Orders> {
    return this.get(`/order/admin/${adminId}`);
  }

  updateOrderStatus(userId: string, orderId: string, status: string) {
    return this.put(`/order/admin/${userId}/${orderId}/status`, { status });
  }
}

export default OrderService;
