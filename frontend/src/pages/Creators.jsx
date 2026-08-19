import marioPhoto from "../assets/mario.png";
import ayoubPhoto from "../assets/ayoub.png";
import githubIcon from "../assets/icons8-github-24.png";
import linkedinIcon from "../assets/icons8-linkedin-50.png";
import emailIcon from "../assets/icons8-nuevo-post-50.png";
import "./Creators.css";

const creators = [
  {
    name: "Mario Hernández Moreno",
    role: "Frontend Developer",
    photo: marioPhoto,
    description:
      "Responsable de la experiencia visual, la interfaz de usuario, la navegación en React y la integración del frontend con las rutas principales de ByteStore.",
    email: "mario.hm.laboral@gmail.com",
    github: "https://github.com/raytugah",
    linkedin: "https://www.linkedin.com/in/rayhdev/",
  },
  {
    name: "Ayoub Arramdani",
    role: "Backend Developer",
    photo: ayoubPhoto,
    description:
      "Responsable de la arquitectura backend, la conexión con MongoDB, los modelos de Mongoose, las rutas de la API y la lógica principal de datos.",
    email: "ayoubarramdani091@gmail.com",
    github: "https://github.com/ayoubito04",
    linkedin: "https://www.linkedin.com/in/ayoub-arramdani-b49b64311/",
  },
];

const Creators = () => {
  return (
    <main className="creators-page">
      <section className="page creators-hero">
        <div className="page-header creators-header">
          <span className="eyebrow">Equipo ByteStore</span>
          <h1 className="page-title">Creadores del proyecto</h1>
          <p className="page-subtitle">
            ByteStore ha sido desarrollado como una aplicación fullstack moderna,
            combinando frontend en React, backend en Node.js, autenticación JWT y
            persistencia de datos con MongoDB.
          </p>
        </div>
      </section>

      <section className="page creators-section" aria-label="Creadores de ByteStore">
        <div className="creators-grid">
          {creators.map((creator) => (
            <article className="creator-card glass-panel" key={creator.email}>
              <div className="creator-photo-wrap">
                <img src={creator.photo} alt={creator.name} className="creator-photo" />
              </div>

              <div className="creator-content">
                <span className="creator-role">{creator.role}</span>
                <h2>{creator.name}</h2>
                <p>{creator.description}</p>

                <div className="creator-links" aria-label={`Contacto de ${creator.name}`}>
                  <a href={`mailto:${creator.email}`} aria-label={`Enviar email a ${creator.name}`}>
                    <img src={emailIcon} alt="" />
                    Email
                  </a>
                  <a href={creator.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${creator.name}`}>
                    <img src={githubIcon} alt="" />
                    GitHub
                  </a>
                  <a href={creator.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn de ${creator.name}`}>
                    <img src={linkedinIcon} alt="" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page contact-section" id="contacto">
        <article className="contact-panel glass-panel">
          <div>
            <span className="eyebrow">Contacto</span>
            <h2>¿Quieres hablar con el equipo?</h2>
            <p>
              Puedes contactar con cualquiera de los creadores para resolver dudas sobre el proyecto,
              revisar el repositorio o consultar detalles técnicos de la aplicación.
            </p>
          </div>

          <div className="contact-actions">
            <a className="btn btn--primary" href="mailto:mario.hm.laboral@gmail.com">
              Contactar con Mario
            </a>
            <a className="btn" href="mailto:ayoubarramdani091@gmail.com">
              Contactar con Ayoub
            </a>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Creators;
