import "./EmptyState.css";

const EmptyState = ({ title, text, action }) => {
  return (
    <section className="empty-state glass-panel">
      <div className="empty-state__icon">◇</div>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      {action}
    </section>
  );
};

export default EmptyState;
