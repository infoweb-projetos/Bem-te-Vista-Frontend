import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import UserForm from './componentes/Cadastro/Cadastro';
import Login from './componentes/Login/Login';
import StyleSelection from './componentes/EscolherEstilo/EscolherEstilo';
import AuthRoute from './AuthRoute';
import MeuPerfil from './componentes/MeuPerfil/MeuPerfil';
import Feed from './componentes/Feed/Feed';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<UserForm />} />
        <Route 
          path="/:username/EscolherEstilo"
          element={<AuthRoute element={<StyleSelection />} />} 
        />
        <Route 
          path="/:username/MeuPerfil"
          element={<AuthRoute element={<MeuPerfil />} />} 
        />
        <Route
           path="/:username/Feed" element={<Feed />}
        />
      </Routes>
    </Router>
  );
}

export default App;
