'use client';

import React, { useState, useEffect } from 'react';

const Gasto = () => {
  const [budget, setBudget] = useState<number | null>(null); 
  const [inputGasto, setInputGasto] = useState<number | null>(null); 
  const [categoria, setCategoria] = useState<string>('comida'); 
  const [fecha, setFecha] = useState<string>(''); 
  const [gastos, setGastos] = useState<any[]>([]);

  // Obtener el presupuesto inicial
  useEffect(() => {
    const storedBudget = localStorage.getItem('budget');
    if (storedBudget) {
      setBudget(Number(storedBudget));
    }
  }, []);

  // Obtener los gastos desde el backend
  useEffect(() => {
    fetch('http://localhost:5000/gasto')
      .then((response) => response.json())
      .then((data) => setGastos(data));
  }, []);

  const handleAddGasto = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputGasto !== null && fecha) {
      const nuevoGasto = {
        categoria,
        monto: inputGasto,
        fecha,
      };

      fetch('http://localhost:5000/gasto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoGasto),
      })
        .then((response) => response.json())
        .then((data) => {
          setGastos([...gastos, data]); //Para un nuevo gasto a la lista
          setInputGasto(null); // Limpiar
          setFecha(''); // Limpiar
          // Resta el monto del gasto al presupuesto
          if (budget !== null) {
            const newBudget = budget - inputGasto;
            setBudget(newBudget);
            localStorage.setItem('budget', newBudget.toString()); // Guardar el presupuesto actualizado en localStorage
          }
        });
    }
  };

  const handleUpdateGasto = (idgasto: number) => {
    const updatedGasto = {
      idgasto,
      categoria,
      monto: inputGasto,
      fecha,
    };

    fetch(`http://localhost:5000/gasto/${idgasto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGasto),
    })
      .then((response) => response.json())
      .then(() => {
        const updatedGastos = gastos.map((gasto) =>
          gasto.idgasto === idgasto ? updatedGasto : gasto
        );
        setGastos(updatedGastos); // Actualizar el gasto en la lista
        // Actualizar el presupuesto al editar el gasto
        if (budget !== null) {
          const newBudget = budget - (inputGasto || 0); // Restar el nuevo gasto
          setBudget(newBudget);
          localStorage.setItem('budget', newBudget.toString()); // Guardar el presupuesto actualizado en localStorage
        }
      });
  };

  const handleDeleteGasto = (idgasto: number, monto: number) => {
    fetch(`http://localhost:5000/gasto/${idgasto}`, {
      method: 'DELETE',
    }).then(() => {
      setGastos(gastos.filter((gasto) => gasto.idgasto !== idgasto)); // Eliminar
      // suma al presupuesto al eliminar un gasto ingresado antes
      if (budget !== null) {
        const newBudget = budget + monto; // Aumentar el presupuesto
        setBudget(newBudget);
        localStorage.setItem('budget', newBudget.toString()); // Guardar el presupuesto actualizado en localS
      }
    });
  };

  return (
    <div className="container mt-5">
     
      <h2 className="text-center mb-4">Gastos Mensuales</h2>
      {budget !== null && (
        <div className="alert alert-info mb-4" role="alert">
          Presupuesto disponible: ${budget.toFixed(2)}
        </div>
      )}

    
      <form onSubmit={handleAddGasto} className="mb-4">
        <div className="mb-3">
          <label htmlFor="inputGasto" className="form-label">
            Monto del Gasto
          </label>
          <input
            type="number"
            id="inputGasto"
            className="form-control"
            value={inputGasto !== null ? inputGasto : ''}
            onChange={(e) => setInputGasto(e.target.value ? Number(e.target.value) : null)}
            placeholder="Introduce el monto del gasto"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">
            Categoría del Gasto
          </label>
          <select
            id="categoria"
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="comida">Comida</option>
            <option value="ropa">Ropa</option>
            <option value="entretenimiento">Entretenimiento</option>
            <option value="Gym">Gym</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">
            Fecha del Gasto
          </label>
          <input
            type="date"
            id="fecha"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Agregar Gasto
        </button>
      </form>

 

      <h3>Lista de Gastos</h3>
      <ul className="list-group mb-4">
        {gastos.map((gasto, index) => (
          <li key={gasto.idgasto || index} className="list-group-item">
            <strong>{gasto.categoria}</strong>: ${gasto.monto ? gasto.monto : '0.00'} - {gasto.fecha || 'Fecha no disponible'}
            <div className="d-flex justify-content-end mt-2">
              <button
                className="btn btn-warning btn-sm mx-2"
                onClick={() => handleUpdateGasto(gasto.idgasto)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteGasto(gasto.idgasto, gasto.monto)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gasto;
