import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import api from '../../axiosConfig';

import logo from '../../imagens/logo.svg';
import cabide from '../../imagens/cabide.svg';
import bgforms from '../../imagens/bg-login.png';
import olhoAbertoIcon from '../../imagens/Icons/olho-aberto-icon.svg';
import olhoFechadoIcon from '../../imagens/Icons/olho-fechado-icon.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(''); // Resetar mensagem de erro antes de tentar o login

    api.post('/auth/login', { email, senha })
  .then(response => {
    console.log('Logged in:', response.data);
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('userId', response.data.userId); // Armazene o ID do usuário
    navigate('/EscolherEstilo');
  })
  .catch(error => {
    console.error('Erro no login:', error.response ? error.response.data : error.message);
    setErrorMessage('E-mail ou senha incorretos. Tente novamente.');
  });
  };

  const togglePassword = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <div className="flex justify-between">
      <div className="static h-screen bg-[#EDECE7] font-[Martel Sans] flex flex-col items-center justify-center w-4/12">
        <div className="flex flex-col justify-center w-2/4">
          <img src={logo} width="250" alt="Logo" />
          <h2 className="text-4xl mt-[3rem]">
            <b>Voe</b> no seu estilo
          </h2>
          <p className="mt-[1rem] text-2xl">
            Conheça os mundos da moda na nossa plataforma prática e acessível!
          </p>
        </div>
      </div>
      <main
        className="bg-cover w-8/12 max-md:h-full flex flex-col items-center justify-center h-[100vh] max-lg:h-[125vh]"
        style={{ backgroundImage: `url(${bgforms})` }}
      >
        <img src={cabide} className="mb-[-0.1rem]" alt="Cabide" />
        <div className="bg-[rgba(0,0,0,0.6)] border-2 border-[#EDECE7] flex flex-col items-center justify-center text-[#EDECE7] w-[28rem] py-[2rem] max-xl:h-[25rem] max-md:h-[15rem]">
          <h2 className="font-[Rufina] font-bold text-4xl mb-[2rem] max-xl:text-3xl max-lg:text-2xl max-xl:mb-[0.5rem]">
            Bem-vindo!
          </h2>
          <form onSubmit={handleSubmit} className="font-[Martel Sans] flex flex-col items-start">
            <label>E-mail</label>
            <input
              type="text"
              className="bg-[rgba(0,0,0,0)] border border-[#EDECE7] w-[18rem] py-[0.4rem] px-[0.4rem] mt-[0.3rem] max-lg:h-[1.5rem] max-lg:text-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@gmail.com..."
              required
            />
            <label className="mt-[0.8rem] max-xl:mt-[0.5rem]">Senha</label>
            <div className="flex flex-col items-start">
              <div className="flex justify-between border border-[#EDECE7] w-[18rem] py-[0.4rem] px-[0.4rem] mt-[0.3rem] max-lg:h-[1.5rem] max-lg:text-xs">
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  id="senha"
                  className="bg-[rgba(0,0,0,0)] w-[90%]"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="@Senha123!..."
                  required
                />
                <img
                  src={mostrarSenha ? olhoFechadoIcon : olhoAbertoIcon}
                  alt="Mostrar senha"
                  onClick={togglePassword}
                  className="cursor-pointer"
                  id="olhoicon"
                />
              </div>
              <a href="#" className="font-medium hover:underline mt-[0.5rem] text-xs">
                Esqueceu a senha?
              </a>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-xs mt-[0.5rem]">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="bg-[#F9C62E] self-center text-black w-[8rem] py-[0.3rem] mt-[1.5rem] hover:cursor-pointer hover:bg-[#EDECE7] transition duration-300 ease-in-out hover:border-[#EDECE7] hover:text-black"
            >
              Entrar
            </button>
          </form>
          <div className="flex flex-col items-center mt-[1rem]">
            <div className="flex items-center">
              <hr className="w-[3rem] border border-[#EDECE7]" />
              <p className="mx-[0.4rem] mt-[-0.2rem] text-xs">ou</p>
              <hr className="w-[3rem] border border-[#EDECE7]" />
            </div>
            <p className="mt-[0.5rem] text-xs">
              Não tem uma conta?{' '}
              <a href="/Cadastro" className="font-medium hover:underline">
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
