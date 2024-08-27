import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import UserForm from './componentes/Cadastro/Cadastro';
import Login from './componentes/Login/Login'
import StyleSelection from './componentes/EscolherEstilo/EscolherEstilo'


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Cadastro" element={<UserForm/>} />
        <Route path="/EscolherEstilo" element={<StyleSelection/>} />
      </Routes>
    </Router>
  );
}

export default App;
