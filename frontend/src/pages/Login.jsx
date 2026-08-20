import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      await login(formData);
      navigate("/games");
    } catch (error) {
      setError(error.response?.data?.message || "Email o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page page">
      <section className="auth-card glass-panel">
        <span className="eyebrow">Acceso</span>
        <h1>Iniciar sesión</h1>
        <p>Entra para guardar juegos, escribir reviews y gestionar tu biblioteca.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="form-field" htmlFor="email">
            Email
            <input id="email" type="email" name="email" placeholder="tu@email.com" value={formData.email} onChange={handleChange} required />
          </label>

          <label className="form-field" htmlFor="password">
            Contraseña
            <input id="password" type="password" name="password" placeholder="Tu contraseña" value={formData.password} onChange={handleChange} required />
          </label>

          {error && <p className="message message--error">{error}</p>}

          <button className="btn btn--primary" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="auth-switch">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </section>
    </main>
  );
};

export default Login;
