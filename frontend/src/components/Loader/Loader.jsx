import "./Loader.css";

const Loader = ({ text = "Cargando..." }) => {
  return (
    <div className="loader-box" role="status" aria-live="polite">
      <span className="loader-spinner" />
      <p>{text}</p>
    </div>
  );
};

export default Loader;
