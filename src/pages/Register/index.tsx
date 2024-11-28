import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./styles.css";

const authService = new AuthService();

const Register: React.FC = () => {
  const [isMounted, setIsMounted] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [telefone, setTelefone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    document.title = "Registrar - BMQ";
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await authService.register({
        email,
        name,
        password,
        role,
        telefone,
      });
      if (response.access_token) {
        if (isMounted) {
          setIsSubmitting(false);
        }
        if (response.user.role === "ADMIN") {
          navigation("/admin/dashboard");
        } else navigation("/");
      }
    } catch (error) {
      console.error(error);
      if (isMounted) {
        setError("Erro ao registrar. Tente novamente.");
      }
    }

    if (isMounted) {
      setIsSubmitting(false);
    }
  };

  const formatTelefone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");

    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return value;
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-image">
          <img
            src="https://front-bmq.vercel.app/midia/logo2.png"
            alt="logo"
            className="image"
          />
        </div>
        <main className="register-form-container">
          <div className="register-form">
            <h2>Registrar</h2>
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
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Maria"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              {/* <div className="input-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="USER">Usuário</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div> */}
              <div className="input-group">
                <label htmlFor="telefone">Telefone</label>
                <input
                  type="tel"
                  id="telefone"
                  placeholder="(99) 99999-9999"
                  maxLength={15}
                  value={telefone}
                  onChange={(e) => setTelefone(formatTelefone(e.target.value))}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button
                type="submit"
                className="register-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registrando..." : "Registrar"}
              </button>
            </form>
            <p>
              Já tem uma conta?{" "}
              <Link to="/login" className="login-link">
                Entrar
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
