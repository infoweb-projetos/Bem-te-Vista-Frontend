import React, { useState } from 'react';
import api from '../axiosConfig';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nome}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="nome_de_usuario"
        value={nome_de_usuario}
        onChange={(e) => setNome_de_usuario(e.target.value)}
        placeholder="Nome de Usuário"
      />
      <input
        type="senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
      />
      <button type="submit">Criar Usuário</button>
    </form>
  );
};

export default UserForm;
