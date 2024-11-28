import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

class HttpService {
  private api: AxiosInstance;

  private url: string = import.meta.env.VITE_API_URL || "http://localhost:3001";

  constructor(baseURL?: string) {
    this.api = axios.create({
      baseURL: baseURL ? baseURL : this.url,
    });

    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.api.get<T>(url, config).then((response) => response.data);
  }

  post<T>(
    url: string,
    data: unknown,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.api
      .post<T>(url, data, config)
      .then((response) => response.data);
  }

  put<T>(
    url: string,
    data: unknown,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.api.put<T>(url, data, config).then((response) => response.data);
  }

  delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.api.delete<T>(url, config).then((response) => response.data);
  }
}

export default HttpService;
