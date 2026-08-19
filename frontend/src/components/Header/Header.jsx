import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import bytestoreLogo from "../../assets/bytestore-logo.png";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand" aria-label="Ir al inicio">
          <img src={bytestoreLogo} alt="ByteStore" className="brand__logo" />
        </Link>

        <nav className="main-nav" aria-label="Navegación principal">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/games">Juegos</NavLink>
          {isAuthenticated && <NavLink to="/library">Biblioteca</NavLink>}
          <NavLink to="/creators">Contactar</NavLink>
          {isAuthenticated && <NavLink to="/profile">Perfil</NavLink>}
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <span className="user-chip">
                <img src={user?.avatar} alt={user?.nombre || "Usuario"} />
                {user?.nombre || "Usuario"}
              </span>
              <button className="btn btn--ghost header-logout" type="button" onClick={handleLogout}>
                Salir
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn--ghost" to="/login">Entrar</Link>
              <Link className="btn btn--primary" to="/register">Crear cuenta</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
