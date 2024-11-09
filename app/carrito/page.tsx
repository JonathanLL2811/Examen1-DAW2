'use client';

import React, { useState, useEffect } from 'react';

const Budget = () => {
  const [budget, setBudget] = useState<number | null>(null); 
  const [inputBudget, setInputBudget] = useState<number | null>(null); 
  const [budgetHistory, setBudgetHistory] = useState<number[]>([]); 
  const [alertColor, setAlertColor] = useState<string>('info'); 

  // Cargar el presupuesto y el historial desde el localStorage al cargar la página
  useEffect(() => {
    const storedBudget = localStorage.getItem('budget');
    const storedHistory = localStorage.getItem('budgetHistory');

    if (storedBudget) {
      setBudget(Number(storedBudget));
    }

    if (storedHistory) {
      setBudgetHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Función para establecer el presupuesto
  const handleSetBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputBudget !== null) {
      // Actualizar el presupuesto y agregarlo al historial
      setBudget(inputBudget);
      setBudgetHistory((prevHistory) => {
        const newHistory = [...prevHistory, inputBudget]; // Agregar presupuesto al historial
        localStorage.setItem('budgetHistory', JSON.stringify(newHistory)); // Guardar historial en localStorage para despues llamarlo
        return newHistory;
      });
      localStorage.setItem('budget', inputBudget.toString()); // Guardar presupuesto en localStorage para llamarlo desd otra paina
      setInputBudget(null); // Limpiar
    }
  };

  // Función para actualizar el presupuesto después de un gasto
  const updateBudgetAfterExpense = (expenseAmount: number) => {
    if (budget !== null) {
      const newBudget = budget - expenseAmount;
      setBudget(newBudget);

      // Alertas
      const percentageLeft = (newBudget / inputBudget!) * 100;
      if (percentageLeft <= 20) {
        setAlertColor('danger'); // Rojo cuando el presupuesto esté por debajo del 20%
      } else if (percentageLeft <= 80) {
        setAlertColor('warning'); // Amarillo cuando el presupuesto esté por debajo del 80%
      } else {
        setAlertColor('info'); // Normal cuando el presupuesto esté por encima del 80%
      }

      // Guardar el presupuesto actualizado en localStorage
      localStorage.setItem('budget', newBudget.toString());
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Presupuesto Mensual</h2>


      <form onSubmit={handleSetBudget} className="mb-4">
        <div className="mb-3">
          <label htmlFor="budget" className="form-label">Su presupuesto Mensual</label>
          <input
            type="number"
            id="budget"
            className="form-control"
            value={inputBudget !== null ? inputBudget : ""}
            onChange={(e) => setInputBudget(e.target.value ? Number(e.target.value) : null)}
            placeholder="Introduce el presupuesto"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Guardar</button>
      </form>

   
      {budget !== null && (
        <div className={`alert alert-${alertColor} mt-4`} role="alert">
          Presupuesto guardado: ${budget.toFixed(2)}
        </div>
      )}

      
    </div>
  );
};

export default Budget;
