import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
