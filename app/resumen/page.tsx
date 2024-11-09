'use client';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type Gasto = {
  idgasto: number;
  categoria: string;
  monto: number;
  fecha: string;
};

const Resumen = () => {
  const [gastos, setGastos] = useState<Gasto[]>([]); // Estado para almacenar los gastos
  const [presupuesto, setPresupuesto] = useState<number | null>(null); // Estado para el presupuesto

  // conectar con el backen
  useEffect(() => {
    fetch('http://localhost:5000/gasto')
      .then((response) => response.json())
      .then((data) => {
        setGastos(data); // guardamos los gastos
      })
      .catch((error) => console.error('Error fetching gastos:', error));

    // Jalar el presupuesto desde localStorage
    const storedBudget = localStorage.getItem('budget');
    if (storedBudget) {
      setPresupuesto(Number(storedBudget));
    }
  }, []);

  // sacar el total de los gastos
  const calcularTotalGasto = () => {
    return gastos.reduce((total, gasto) => total + gasto.monto, 0); // simple suma 
  };

  const totalGasto = calcularTotalGasto();

  return (
    <div className="container mt-4">
      <h3>Resumen de Gastos</h3>

    
      {presupuesto !== null && (
        <div className="alert alert-info">
          <h4 className="text-center">Presupuesto Disponible: <span className="text-primary">${presupuesto.toFixed(2)}</span></h4>
        </div>
      )}




      
      <div className="mb-4">
        {gastos.length > 0 ? (
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {gastos.map((gasto) => (
                  <tr key={gasto.idgasto}>
                    <td>{gasto.categoria}</td>
                    <td>${gasto.monto.toFixed(2)}</td>
                    <td>{new Date(gasto.fecha).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

    

            <div className="alert alert-success">
              <h4 className="text-center">
                TOTAL GASTO: <span className="text-primary">${totalGasto.toFixed(2)}</span>
              </h4>
            </div>
          </div>
        ) : (
          <p>Hey QUE BUENO. Todavia no tienes gastos.</p>
        )}
      </div>
    </div>
  );
};

export default Resumen;
