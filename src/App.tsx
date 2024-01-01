import React,{useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routers/AppRouter';

const App: React.FC = () => {

  return (
    <Router>
      <AppRouter />
    </Router>
  );
};

export default App;
