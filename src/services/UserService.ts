import HttpService from "./HttpService";

class UserService extends HttpService {
  async dashboard(userId: string): Promise<{
    dashboard: {
      totalUsers: number;
      totalOrdersCompleted: number;
      totalOrdersPending: number;
      totalSales: number;
    };
  }> {
    return this.get(`/user/dashboard/${userId}`);
  }
}

export default UserService;
