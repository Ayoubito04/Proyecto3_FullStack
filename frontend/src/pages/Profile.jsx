import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { editUser } from "../services/users.services";
import "./Profile.css";

const Profile = () => {
  const { user, token, userId, logout, updateStoredUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    city: user?.city || "",
    country: user?.country || "",
    bio: user?.bio || "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (event) => {
    setAvatarFile(event.target.files?.[0] || null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
      if (avatarFile) payload.append("avatar", avatarFile);

      const response = await editUser(userId, payload, token);
      const updatedUser = response.data.updatedUser;
      updateStoredUser({ ...user, ...updatedUser });
      setMessage("Perfil actualizado correctamente.");
    } catch (error) {
      setMessage(error.response?.data?.message || "No se ha podido actualizar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="page profile-page">
      <section className="page-header">
        <span className="eyebrow">Cuenta</span>
        <h1 className="page-title">Mi perfil</h1>
        <p className="page-subtitle">Gestiona tu información pública y accede rápidamente a tu biblioteca.</p>
      </section>

      <section className="profile-grid">
        <aside className="profile-card glass-panel">
          <img src={user?.avatar} alt={user?.nombre || "Usuario"} />
          <h2>{user?.nombre}</h2>
          <p>{user?.email}</p>
          <div className="profile-actions">
            <Link className="btn btn--primary" to="/library">Ver biblioteca</Link>
            <button className="btn btn--danger" type="button" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </aside>

        <form className="profile-form glass-panel" onSubmit={handleSubmit}>
          <h2>Editar datos</h2>
          {message && <p className="message">{message}</p>}

          <label className="form-field">
            Nombre
            <input name="nombre" value={formData.nombre} onChange={handleChange} />
          </label>

          <div className="profile-form__row">
            <label className="form-field">
              Ciudad
              <input name="city" value={formData.city} onChange={handleChange} placeholder="Murcia" />
            </label>
            <label className="form-field">
              País
              <input name="country" value={formData.country} onChange={handleChange} placeholder="España" />
            </label>
          </div>

          <label className="form-field">
            Bio
            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Cuéntanos qué tipo de juegos te gustan..." />
          </label>

          <label className="form-field">
            Avatar
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </label>

          <button className="btn btn--primary" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Profile;
