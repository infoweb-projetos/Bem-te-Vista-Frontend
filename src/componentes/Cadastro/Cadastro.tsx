import '../../App.css';
import React, { useState } from 'react';
import api from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

import bgforms from '../../imagens/bg-signup.png';
import cabide from '../../imagens/cabide.svg';
import logo from '../../imagens/logo.svg';
import olhoAbertoIcon from '../../imagens/Icons/olho-aberto-icon.svg';
import olhoFechadoIcon from '../../imagens/Icons/olho-fechado-icon.svg';
import cadeadoIcon from '../../imagens/Icons/cadeado-icon.svg';
import { AxiosError } from 'axios'; // Importe AxiosError para tratamento de erro

const UserForm: React.FC = () => {
  const [nome, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nome_de_usuario, setNome_de_usuario] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [senhaErro, setSenhaErro] = useState('');

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };
  const navigate = useNavigate(); 


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSenhaErro('');
    const username = nome_de_usuario;
    
    // Validação da senha
    if (!validatePassword(senha)) {
      setSenhaErro('Senha deve ter letras e números.');
      return;
    }
  
    console.log('Valores antes do cadastro:', { nome, email, nome_de_usuario, senha });
  
    try {
      // Cadastro do usuário
      const response = await api.post('/users', { nome, email, nome_de_usuario, senha });
      console.log('Usuário criado:', response.data);
      
      // Após o cadastro, tente fazer o login
      const loginResponse = await api.post('/auth/login', { email, senha });
      console.log('Logged in:', loginResponse.data);
  
      // Supondo que o login seja bem-sucedido
      localStorage.setItem('token', loginResponse.data.access_token);
      localStorage.setItem('userId', loginResponse.data.userId); // Armazene o ID do usuário
      localStorage.setItem('username', loginResponse.data.username);
      localStorage.setItem('nome', loginResponse.data.nome);
  
      // Redirecionamento para a página de escolha de estilo
      navigate(`/${loginResponse.data.username}/EscolherEstilo`);
    } catch (error) {
      console.error('Erro ao criar usuário ou logar:', error);
      setSenhaErro('Erro ao criar conta ou fazer login. Tente novamente.');
    }
  };
  
  

  const togglePassword = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  return (
    <div className="flex">
      <div className="bg-[#EDECE7] font-[Martel Sans] flex flex-col items-center justify-center w-4/12 h-[100vh]">
        <div className="flex flex-col justify-center w-2/4">
          <img src={logo} width="250" alt="Logo" />
          <h2 className="text-4xl mt-[3rem]"><b>Voe</b> no seu estilo</h2>
          <p className="mt-[1rem] text-2xl">Conheça os mundos da moda na nossa plataforma prática e acessível!</p>
        </div>
      </div>
      <main
        className="bg-cover w-8/12 h-[100vh] flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${bgforms})` }}
      >
        <img src={cabide} alt="Cabide" />
        <div
          className="bg-[rgba(0,0,0,0.6)] border-2 border-white flex flex-col items-center justify-center text-white w-[28rem] py-[2rem]"
        >
          <h2 className="font-[Rufina] font-bold text-4xl mb-[1rem]">Cadastre-se!</h2>
          <form onSubmit={handleSubmit} className="font-[Martel Sans] flex flex-col items-center">
            <label className="self-start">Nome</label>
            <input
              placeholder="Digite aqui..."
              type="text"
              className="bg-[rgba(0,0,0,0)] border border-[#EDECE7] w-[18rem] py-[0.4rem] px-[0.4rem] mt-[0.3rem]"
              value={nome}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={4}
            />
            <label className="mt-[0.8rem] self-start">Username</label>
            <input
              placeholder="Digite aqui..."
              type="text"
              className="bg-[rgba(0,0,0,0)] border border-[#EDECE7] w-[18rem] py-[0.4rem] px-[0.4rem] mt-[0.3rem]"
              value={nome_de_usuario}
              onChange={(e) => setNome_de_usuario(e.target.value)}
              required
              minLength={4}
            />
            <div className="flex items-center self-start mt-[0.8rem] max-xl:mt-[0.5rem]">
                <img src={cadeadoIcon} className="pr-2" />
                <label>E-mail</label>
            </div>
            <input
              placeholder="seuemail@gmail.com..."
              type="email"
              className="bg-[rgba(0,0,0,0)] border border-[#EDECE7] w-[18rem] py-[0.4rem] px-[0.4rem] mt-[0.3rem]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex items-center self-start mt-[0.8rem] max-xl:mt-[0.5rem]">
                <img src={cadeadoIcon} className="pr-2" />
                <label>Senha</label>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex justify-between border border-[#EDECE7] w-[18rem] py-[0.4rem] px-[0.4rem] mt-[0.3rem]">
                <input
                  placeholder="@Senha123!..."
                  type={senhaVisivel ? "text" : "password"}
                  className="bg-[rgba(0,0,0,0)] w-[90%]"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  minLength={8}
                />
                <img
                  src={senhaVisivel ? olhoFechadoIcon : olhoAbertoIcon}
                  id="olhoicon"
                  onClick={togglePassword}
                  alt="Toggle Password Visibility"
                />
              </div>
              <div className="w-[18rem] mt-2 "> {/* Contêiner com altura fixa para a mensagem de erro */}
                {senhaErro && <p className="text-red-500">{senhaErro}</p>}
              </div>
            </div>
            <button type="submit" className="bg-[#F9C62E] self-center cut-corner text-black w-[8rem] py-[0.3rem] mt-[1.5rem] hover:cursor-pointer hover:bg-[#EDECE7] transition duration-300 ease-in-out hover:border-[#EDECE7] hover:text-black">
              Criar
            </button>
          </form>
          <div className="flex flex-col items-center mt-[1rem]">
            <div className="flex items-center">
              <hr className="w-[3rem] border border-[#EDECE7]" />
              <p className="mx-[0.4rem] mt-[-0.2rem] text-xs">ou</p>
              <hr className="w-[3rem] border border-[#EDECE7]" />
            </div>
            <p className="mt-[0.5rem] text-xs">Já tem uma conta? <a href="/Login" className="font-medium hover:underline">Conecte-se</a></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserForm;
