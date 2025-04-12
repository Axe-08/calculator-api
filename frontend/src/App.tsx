import React from 'react';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Calculator</h1>
      </header>
      <main>
        <Calculator />
      </main>
      <footer>
        <p>Using the Calculator API</p>
      </footer>
    </div>
  );
}

export default App;