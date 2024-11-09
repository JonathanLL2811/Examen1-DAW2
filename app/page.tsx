import React from 'react';

const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333' }}>Jonathan Jesús Lorenzana Lemus</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Número de cuenta: T32351113</p>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Clase: Desarrollo de Aplicaciones Web 2</p>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Examen 1</p>
      </div>
    </div>
  );
};

export default Home;
