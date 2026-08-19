import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState/EmptyState";

const NotFound = () => {
  return (
    <main className="page">
      <EmptyState
        title="Página no encontrada"
        text="La ruta que intentas abrir no existe."
        action={<Link className="btn btn--primary" to="/">Volver al inicio</Link>}
      />
    </main>
  );
};

export default NotFound;
