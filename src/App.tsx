import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import UserForm from './componentes/Cadastro/Cadastro';
import Login from './componentes/Login/Login'


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Cadastro" element={<UserForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
