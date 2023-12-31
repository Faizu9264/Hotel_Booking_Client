import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routers/router';

const App: React.FC = () => {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
};

export default App;
