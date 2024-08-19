import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './componentes/Cadastro';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
