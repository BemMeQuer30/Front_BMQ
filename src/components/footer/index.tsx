import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-sections">
        {/* Sobre nós */}
        <div className="footer-section">
          <h4>Sobre Nós</h4>
          <p>
            Bem me Quer é sua loja de confiança para produtos de cuidado com a
            pele, beleza e bem-estar.
          </p>
        </div>

        {/* Links Úteis */}
        <div className="footer-section">
          <h4>Links Úteis</h4>
          <ul className="footer-links">
            <li>
              <Link to="https://www.melumaquiagem.com.br/pagina/sobre-a-melu">Quem Somos</Link>
            </li>
            <li>
              <Link to="https://www.melumaquiagem.com.br/pagina/faq">FAQ</Link>
            </li>
            <li>
              <Link to="https://www.melumaquiagem.com.br/pagina/suporte-ao-cliente">Contato</Link>
            </li>
            <li>
              <Link to="https://www.melumaquiagem.com.br/pagina/sobre-a-melu">Termos de Uso</Link>
            </li>
            <li>
              <Link to="https://www.melumaquiagem.com.br/pagina/sobre-a-melu">Política de Privacidade</Link>
            </li>
          </ul>
        </div>

        {/* Redes Sociais */}
        <div className="footer-section">
          <h4>Siga-nos</h4>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img
                src="https://cdn.icon-icons.com/icons2/99/PNG/512/facebook_socialnetwork_17441.png"
                alt="Facebook"
              />
            </a>
            <a
              href="https://www.instagram.com/bmqbeauty.b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img
                src="https://cdn.icon-icons.com/icons2/642/PNG/512/instagram_icon-icons.com_59205.png"
                alt="Instagram"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <img
                src="https://cdn.icon-icons.com/icons2/642/PNG/512/twitter_icon-icons.com_59206.png"
                alt="Twitter"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Direitos Reservados */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Bem me Quer. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
