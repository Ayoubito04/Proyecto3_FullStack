import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/users.services";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nombre: "", email: "", password: "" });
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
      await registerUser(formData);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "No se ha podido crear la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page page">
      <section className="auth-card glass-panel">
        <span className="eyebrow">Nuevo perfil</span>
        <h1>Crear cuenta</h1>
        <p>Regístrate para crear tu biblioteca gamer y participar con reviews.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="form-field" htmlFor="nombre">
            Nombre
            <input id="nombre" type="text" name="nombre" placeholder="Tu nombre" value={formData.nombre} onChange={handleChange} required />
          </label>

          <label className="form-field" htmlFor="email">
            Email
            <input id="email" type="email" name="email" placeholder="tu@email.com" value={formData.email} onChange={handleChange} required />
          </label>

          <label className="form-field" htmlFor="password">
            Contraseña
            <input id="password" type="password" name="password" placeholder="Mínimo 6 caracteres" value={formData.password} onChange={handleChange} required minLength={6} />
          </label>

          {error && <p className="message message--error">{error}</p>}

          <button className="btn btn--primary" type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear cuenta"}
          </button>
        </form>

        <p className="auth-switch">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </section>
    </main>
  );
};

export default Register;
