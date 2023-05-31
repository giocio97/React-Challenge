import React, { useState } from 'react';
 import './Calculator.css';

// Definizione del componente Calculator:
const Calculator = () => {
  const [rows, setRows] = useState([{ sign: '+', value: '', enabled: true }]);

  // Gestione delle modifiche delle righe:
  const rowChange = (index, key, value) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index][key] = value;
      return updatedRows;
    });
  };

  // aggiungi riga 
  const rowAdd = () => {
    setRows((prevRows) => [...prevRows, { sign: '+', value: '', enabled: true }]);
  };

  // rimuovi riga 
  const rowRemove = (index) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows.splice(index, 1);
      return updatedRows;
    });
  };
// abilita o disabilita riga 
  const rowEnabled = (index) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], enabled: !updatedRows[index].enabled };
      return updatedRows;
    });
  };

  // calcolo risultato 
  const calculateResult = () => {
    const enabledRows = rows.filter((row) => row.enabled);
    const sum = enabledRows.reduce((total, row) => {
      const value = parseFloat(row.value) || 0;
      return row.sign === '+' ? total + value : total - value;
    }, 0);
    return sum;
  };

  const handleRowToggle = (index) => {
    rowEnabled(index);
  };

  return (

    
    <div className="container mt-4 calc">
      <div class="card text-bg-dark mb-3 text-center border border-success">
        <div class="card-header">
            <h4>Calculator</h4>
        </div>
        <div class="card-body">
          {rows.map((row, index) => (
                <div key={index} className={`row mb-3 ${row.enabled ? '' : 'text-muted'}`}>
                  <div className="col">
                    <select
                      className="form-select"
                      value={row.sign}
                      onChange={(e) => rowChange(index, 'sign', e.target.value)}
                    >
                      <option value="+">+</option>
                      <option value="-">-</option>
                    </select>
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      value={row.value}
                      onChange={(e) => rowChange(index, 'value', e.target.value)}
                      disabled={!row.enabled}
                    />
                  </div>
                  <div className="col">
                    <button className="btn btn-danger" onClick={() => rowRemove(index)}>
                      Rimuovi
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className={`btn ${row.enabled ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => handleRowToggle(index)}
                      disabled={rows.length === 1}
                    >
                      {row.enabled ? 'Abilitato' : 'Disabilitato'}
                    </button>
                  </div>
                </div>
              ))}

<div className="row">
        <div className="col">
          <button className="btn btn-success" onClick={rowAdd}>
            Aggiungi Riga
          </button>
        </div>
      </div>
        </div>
        <div class="card-footer text-body-secondary">
          <div className="alert alert-info " role="alert">
              Risultato: 
              <h5>{calculateResult()}</h5>
          </div>
        </div>
    </div>
     
     
      
   </div>
  );
};

export default Calculator;
