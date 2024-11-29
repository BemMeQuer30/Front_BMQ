import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import ReCAPTCHA from "react-google-recaptcha";
import "./styles.css";

const authService = new AuthService();

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    document.title = "Login - BMQ";
  }, []);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Verifica se o reCAPTCHA foi resolvido
    if (!recaptchaToken) {
      setError("Por favor, complete o reCAPTCHA.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await authService.login(email, password);
      if (response.access_token) {
        if (response.user.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Email ou senha inválidos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-image">
          <img
            src="https://front-bmq.vercel.app/midia/logo2.png"
            alt="logo"
            className="image"
          />
        </div>
        <main className="login-form-container">
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="maria@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  placeholder="***************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Ld7zo0qAAAAANw2VatZhTs-AaNnRKqgxpcaP9Cj"
                onChange={handleRecaptchaChange}
              />
              <button
                type="submit"
                className="login-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </form>
            <p className="register">Ainda não tem uma conta?</p>
            <Link to="/register" className="forgot-password-link">
              Cadastre-se
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
