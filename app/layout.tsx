import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es">
      <head />
      <body>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Examen 1</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/producto">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/carrito">Presupuesto</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/gasto">Gastos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/resumen">Resumen</a> 
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;

