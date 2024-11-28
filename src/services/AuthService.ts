import HttpService from "./HttpService";

interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    role: string;
    name: string;
    telefone: string;
  };
}

interface RegisterData {
  email: string;
  password: string;
  [key: string]: unknown;
}

class AuthService extends HttpService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    if (response.access_token) {
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("access_token", response.access_token);
    }
    return response;
  }

  getUser(): unknown {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  async register(userData: RegisterData): Promise<unknown> {
    const response = await this.post("/auth/register", userData);

    if (response.access_token) {
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("access_token", response.access_token);
    }
    return response;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  async forgotPassword(email: string): Promise<unknown> {
    return this.post("/auth/forgot-password", { email });
  }

  async resetPassword(token: string, password: string): Promise<unknown> {
    const response = await this.post("/auth/reset-password", {
      token,
      password,
    });
    return response;
  }
}

export default AuthService;
