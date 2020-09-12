import React from 'react';

function App() {
  return (
    <div className="app">
      <h1>Hello, {process.env.REACT_APP_SECRET_CODE}</h1>
    </div>
  );
}

export default App;
