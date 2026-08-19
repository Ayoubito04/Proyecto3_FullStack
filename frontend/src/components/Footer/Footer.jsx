import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <strong>ByteStore</strong>
          <p>Galería fullstack de videojuegos con biblioteca personal y reviews.</p>
        </div>
        <nav aria-label="Enlaces del pie">
          <Link to="/games">Catálogo</Link>
          <Link to="/library">Biblioteca</Link>
          <Link to="/profile">Perfil</Link>
          <Link to="/creators">Contactar</Link>
          <Link to="/creators#contacto">Contacto</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
