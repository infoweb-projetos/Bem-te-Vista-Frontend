import '../../App.css';
import React, { useState } from 'react';
import api from '../../axiosConfig';

import bgforms from '../../imagens/bg-forms.png';
import cabide from '../../imagens/cabide.svg';
import logo from '../../imagens/logo.svg';

const UserForm: React.FC = () => {
  const [nome, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nome_de_usuario, setNome_de_usuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.post('/users', { nome, email, nome_de_usuario, senha })
      .then(response => {
        console.log('Usuário criado:', response.data);
      })
      .catch(error => {
        console.error('Erro ao criar usuário:', error);
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
        <main
          className="bg-cover w-8/12 h-[100vh] flex flex-col items-center justify-center"
          style={{ backgroundImage: `url(${bgforms})` }}
        >
          <img src={cabide} alt="Cabide" />
          <div className="bg-[rgba(0,0,0,0.6)] border-2 border-white flex flex-col items-center justify-center text-white w-[30rem] h-[36rem] py-[2rem]">
            <h2 className="font-[Rufina] font-bold text-4xl mb-[2rem]">Cadastre-se</h2>
    <form onSubmit={handleSubmit} className="font-[Martel Sans] flex flex-col items-center">

      <label>Nome</label>
      <input
        type="text"
        className="bg-[rgba(0,0,0,0.6)] border border-white w-[18rem] py-[0.2rem] px-[0.4rem] mt-[0.3rem]"
        value={nome}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite aqui..."
      />

      <label className="mt-[1rem]">E-mail</label>
      <input
        type="email"
        className="bg-[rgba(0,0,0,0.6)] border border-white w-[18rem] py-[0.2rem] px-[0.4rem] mt-[0.3rem]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite aqui..."
      />

      <label className="mt-[1rem]">Nome de Usuário</label>
      <input
        type="nome_de_usuario"
        className="bg-[rgba(0,0,0,0.6)] border border-white w-[18rem] py-[0.2rem] px-[0.4rem] mt-[0.3rem]"
        value={nome_de_usuario}
        onChange={(e) => setNome_de_usuario(e.target.value)}
        placeholder="Digite aqui..."
      />

      <label className="mt-[1rem]">Senha</label>
      <input
        type="senha"
        className="bg-[rgba(0,0,0,0.6)] border border-white w-[18rem] py-[0.2rem] px-[0.4rem] mt-[0.3rem]"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Digite aqui..."
      />
      <button type="submit" className="bg-[rgba(0, 0, 0, 0.6)] border border-white px-[2rem] py-[0.3rem] mt-[2rem] hover:cursor-pointer hover:bg-[#F9C62E] hover:border-[#F9C62E] hover:text-black">Criar Usuário</button>
    </form>

    <div className="flex flex-col items-center mt-[0.5rem]">
              <div className="flex items-center">
                <hr className="w-[4rem] border border-white" />
                <p className="mx-[0.3rem]">ou</p>
                <hr className="w-[4rem] border border-white" />
              </div>
              <p className="mt-[0.5rem] text-sm">
                Já possui uma conta?{" "}
                <a href="/Login" className="hover:underline">
                  Conecte-se
                </a>
              </p>
            </div>

      </div>
    </main>
  </div>
  );
};

export default UserForm;
