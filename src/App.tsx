import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import UserForm from './componentes/Cadastro/Cadastro';
import Login from './componentes/Login/Login';
import StyleSelection from './componentes/EscolherEstilo/EscolherEstilo';
import AuthRoute from './AuthRoute';
import Perfil from './componentes/Perfil/Perfil';
import Feed from './componentes/Feed/Feed';
import EditarPerfil from './componentes/EditarPerfil/EditarPerfil';
import Landing from './componentes/Landing/Landing';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<UserForm />} />
        <Route 
          path="/:username/EditarPerfil"
          element={<AuthRoute element={<EditarPerfil />} />} 
        />
        <Route 
          path="/:username/EscolherEstilo"
          element={<AuthRoute element={<StyleSelection />} />} 
        />
        <Route 
          path="/:username/EscolherEstilo"
          element={<AuthRoute element={<StyleSelection />} />} 
        />
        <Route 
          path="/:username/Perfil"
          element={<AuthRoute element={<Perfil/>} />} 
        />
        <Route
           path="/:username/Feed" element={<Feed />}
        />
      </Routes>
    </Router>
  );
}

export default App;
