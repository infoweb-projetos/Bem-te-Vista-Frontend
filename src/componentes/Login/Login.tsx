import React, { useState } from 'react';
import api from '../../axiosConfig';
import '../../App.css'

import logo from '../../imagens/logo.svg'
import cabide from '../../imagens/cabide.svg'
import bgforms from '../../imagens/bg-forms.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Sending data:', { email, senha });
    api.post('/auth/login', { email, senha })
      .then(response => {
        console.log('Logged in:', response.data);
        // Redirecionar para o feed
        localStorage.setItem('token', response.data.access_token);
      })
      .catch(error => {
        if (error.response) {
          console.error('Error response:', error.response.data);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        alert('Login failed. Please check your email and password.');
      });
  };

  return (
    <div className="flex">
    <div className="bg-white font-[Poppins] flex flex-col items-center justify-center w-4/12 h-[100vh]">
      <div className="flex flex-col mx-[5rem] mb-[6rem]">
        <img src={logo} width="250" alt="Logo" />
        <h2 className="text-2xl mt-[3rem]">
          <b>Voe</b> no seu estilo
        </h2>
        <p className="mt-[1rem] text-lg">
          Conheça os mundos da moda na nossa plataforma prática e acessível!
        </p>
      </div>
    </div>
    <main className="bg-cover w-8/12 h-[100vh] flex flex-col items-center justify-center"
    style={{ backgroundImage: `url(${bgforms})` }}>
        <img src={cabide} alt="Cabide" />
      <div className="bg-[rgba(0,0,0,0.6)] border-2 border-white flex flex-col items-center justify-center text-white w-[28rem] h-[30rem] py-[2rem]">
        <h2 className="font-[Rufina] font-bold text-4xl mb-[2rem]">Bem-vindo!</h2>
    <form onSubmit={handleSubmit} className="font-[Martel Sans] flex flex-col items-center">
    <label>Email</label>    
      <input
        type="text"
        className="bg-[rgba(0,0,0,0.6)] border border-white w-[18rem] py-[0.2rem] px-[0.4rem] mt-[0.3rem]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite aqui.."
      />
      <label className="mt-[2rem]">Senha</label>
      <div className="flex flex-col items-start">
      <input
        type="password"
        className="bg-[rgba(0,0,0,0.6)] border border-white w-[18rem] py-[0.2rem] px-[0.4rem] mt-[0.3rem]"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Digite aqui..."
      />
      <a href="#" className="hover:underline mt-[0.5rem] text-sm">
                  Esqueceu a senha?
                </a>
                </div>
      <button type="submit"  className="bg-[rgba(0, 0, 0, 0.6)] border border-white px-[2rem] py-[0.3rem] mt-[2rem] hover:cursor-pointer hover:bg-[#F9C62E] hover:border-[#F9C62E] hover:text-black">Login</button>
    </form>
    <div className="flex flex-col items-center mt-[1rem]">
              <div className="flex items-center">
                <hr className="w-[4rem] border border-white" />
                <p className="mx-[0.3rem]">ou</p>
                <hr className="w-[4rem] border border-white" />
              </div>
              <p className="mt-[1rem] text-sm">
                Não tem uma conta? <a href="/Cadastro" className="hover:underline">Cadastre-se</a>
              </p>
            </div>

        </div>
    </main>

    </div>
    
  );
};

export default Login;
