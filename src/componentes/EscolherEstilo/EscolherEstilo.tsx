import '../../App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';

import bgforms from '../../imagens/bg-signup.png';
import cabide from '../../imagens/cabide.svg';
import logo from '../../imagens/logo.svg';
import hearticon from '../../imagens/Icons/heart-icon.svg';

import classicobg from '../../imagens/estilos/classicobg.png';
import minimalistabg from '../../imagens/estilos/minimalistabg.png';
import bohobg from '../../imagens/estilos/bohobg.png';
import vintagebg from '../../imagens/estilos/vintagebg.png';
import retrobg from '../../imagens/estilos/retrobg.png';
import punkbg from '../../imagens/estilos/punkbg.png';
import goticobg from '../../imagens/estilos/goticobg.png';
import grungebg from '../../imagens/estilos/grungebg.png';
import streetwearbg from '../../imagens/estilos/streetwearbg.png';
import esportivobg from '../../imagens/estilos/esportivobg.png';
import preppybg from '../../imagens/estilos/preppybg.png';
import chicbg from '../../imagens/estilos/chicbg.png';
import rokerbg from '../../imagens/estilos/rockerbg.png';
import romanticobg from '../../imagens/estilos/romanticobg.png';
import futuristabg from '../../imagens/estilos/futuristabg.png';
import cowboybg from '../../imagens/estilos/cowboybg.png';
import militarbg from '../../imagens/estilos/militarbg.png';
import glambg from '../../imagens/estilos/glambg.png';
import grungerevivalbg from '../../imagens/estilos/grungerevivalbg.png';
import cyberpunkbg from '../../imagens/estilos/cyberpunkbg.png';
import safaribg from '../../imagens/estilos/safaribg.png';
import hipsterbg from '../../imagens/estilos/hipsterbg.png';
import modernobg from '../../imagens/estilos/modernobg.png';
import casualbg from '../../imagens/estilos/casualbg.png';
import formalbg from '../../imagens/estilos/formalbg.png';
import artsybg from '../../imagens/estilos/artsybg.png';
import kawaiibg from '../../imagens/estilos/kawaiibg.png';
import coquettebg from '../../imagens/estilos/coquettebg.png';
import pinupbg from '../../imagens/estilos/pinupbg.png';
import y2kbg from '../../imagens/estilos/y2kbg.png';


// Lista de estilos com a imagem de fundo associada
const styles = [
  { id: 'artsy', name: 'Artsy', bgImage: artsybg },
  { id: 'boho', name: 'Boho', bgImage: bohobg },
  { id: 'casual', name: 'Casual', bgImage: casualbg },
  { id: 'chic', name: 'Chic', bgImage: chicbg },
  { id: 'classico', name: 'Clássico', bgImage: classicobg },
  { id: 'androgino', name: 'Coquette', bgImage: coquettebg },
  { id: 'cowboy', name: 'Cowboy', bgImage: cowboybg },
  { id: 'cyberpunk', name: 'Cyberpunk', bgImage: cyberpunkbg },
  { id: 'esportivo', name: 'Esportivo', bgImage: esportivobg },
  { id: 'formal', name: 'Formal', bgImage: formalbg },
  { id: 'futurista', name: 'Futurista', bgImage: futuristabg },
  { id: 'glam', name: 'Glam', bgImage: glambg },
  { id: 'gotico', name: 'Gótico', bgImage: goticobg },
  { id: 'grunge', name: 'Grunge', bgImage: grungebg },
  { id: 'grunge-revival', name: 'Grunge Revival', bgImage: grungerevivalbg },
  { id: 'hipster', name: 'Hipster', bgImage: hipsterbg },
  { id: 'kawaii', name: 'Kawaii', bgImage: kawaiibg },
  { id: 'militar', name: 'Militar', bgImage: militarbg },
  { id: 'minimalista', name: 'Minimalista', bgImage: minimalistabg },
  { id: 'moderno', name: 'Moderno', bgImage: modernobg },
  { id: 'pinup', name: 'Pin-up', bgImage: pinupbg },
  { id: 'preppy', name: 'Preppy', bgImage: preppybg },
  { id: 'punk', name: 'Punk', bgImage: punkbg },
  { id: 'retro', name: 'Retro', bgImage: retrobg },
  { id: 'roker', name: 'Roker', bgImage: rokerbg },
  { id: 'romantico', name: 'Romântico', bgImage: romanticobg },
  { id: 'safari', name: 'Safari', bgImage: safaribg },
  { id: 'streetwear', name: 'Streetwear', bgImage: streetwearbg },
  { id: 'vintage', name: 'Vintage', bgImage: vintagebg },
  { id: 'y2k', name: 'Y2K', bgImage: y2kbg },
];


const StyleSelection: React.FC = () => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [muitoEstilo, setMuitoEstilo] = useState('');
  const [username, setUsername] = useState<string | null>(null); // Adiciona estado para o username
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('username'); // Obtém o nome de usuário da localStorage
    //console.log('Username:', userName); // Adicione este log
    if (!userId || !userName) {
      console.error('User ID ou nome de usuário não encontrados.');
      alert('Usuário não autenticado. Redirecionando para o login.');
      navigate('/login'); // Redireciona para a página de login
    } else {
      setUsername(userName); // Define o nome de usuário no estado
    }
  }, [navigate]);

  const handleStyleChange = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(prev => prev.filter(s => s !== style));
      setMuitoEstilo(''); // Reseta a mensagem de erro ao desmarcar um estilo
    } else if (selectedStyles.length < 3) {
      setSelectedStyles(prev => [...prev, style]);
      setMuitoEstilo(''); // Garante que a mensagem de erro seja removida ao adicionar um estilo dentro do limite
    } else {
      setMuitoEstilo('Você só pode selecionar até 3 estilos.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Obtém o ID do usuário do localStorage

      if (!token || !userId) {
        alert('Usuário não autenticado.');
        return;
      }

      // Envie a solicitação para atualizar os estilos
      await api.post(`/users/${userId}/styles`, {
        styles: selectedStyles,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/${username}/Feed`); // Navega para a página com o username
    
    } catch (error) {
      console.error('Erro ao atualizar estilos:', error);
      alert('Erro ao atualizar estilos.');
    }
  };

  return (
    <div className="flex">
      <div className="bg-[#EDECE7] fixed font-[Martel Sans] flex flex-col items-center justify-center w-4/12 h-[100vh]">
        <div className="flex flex-col justify-center w-2/4">
          <img src={logo} width="250" alt="Logo" />
          <h2 className="text-4xl mt-[3rem]"><b>Voe</b> no seu estilo</h2>
          <p className="mt-[1rem] text-2xl">Conheça os mundos da moda na nossa plataforma prática e acessível!</p>
        </div>
      </div>
      <main
        className="bg-cover w-8/12 flex flex-col min-h-[100vh] items-center justify-center ml-[33.33%] py-12"
        style={{ backgroundImage: `url(${bgforms})` }}
      >
        <img src={cabide} alt="Cabide"/>
        <div className="bg-[rgba(0,0,0,0.6)] border-2 border-white flex flex-col items-start justify-center text-white w-[28rem] px-12 py-[2rem]">
          <h2 className="font-[Rufina] font-bold text-4xl mb-[1rem]">Escolha seus estilos!</h2>
          <p className="mb-[0]"><b>*No máximo 3</b></p>
          <p className="mb-[1rem]">Não possui preferências? <a href="#" className="hover:underline"><b>Prossiga</b></a></p>
          <form onSubmit={handleSubmit} className="font-[Martel Sans] text-center">
            <div className="flex flex-wrap justify-between items-center pr-2 overflow-y-scroll overflow-x-hidden h-[19rem] custom-scroll select-none">
              {styles.map(style => (
                <div className="div-estilo mb-1" key={style.name}>
                  <input
                    type="checkbox"
                    value={style.name}
                    className="checkboxstyle"
                    id={`checkbox-${style.name}`}
                    onChange={() => handleStyleChange(style.name)}
                    checked={selectedStyles.includes(style.name)}
                    disabled={!selectedStyles.includes(style.name) && selectedStyles.length >= 5}
                  />
                  <label
                  htmlFor={`checkbox-${style.name}`}
                  className="label-estilo relative flex items-center justify-center w-[166px] h-[166px] border border-[#EDECE7] cursor-pointer"
                >
                  {/* Imagem de fundo com filtro de escurecimento aplicado apenas na camada de fundo */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${style.bgImage})`, filter: 'brightness(70%)' }}
                  ></div>

                  {/* Texto sobre a imagem */}
                  <p className="relative z-10 text-center stroke-text text-2xl">{style.name}</p>

                  {/* Ícone de coração */}
                  <img
                    src={hearticon}
                    width="25"
                    className={selectedStyles.includes(style.name) ? 'absolute z-10 mt-[-172px] mr-[-172px]' : 'hidden'}
                  />
                </label>
                </div>
              ))}
            </div>
            <div className="w-[18rem] mt-2">
              {muitoEstilo && <p className="text-red-500">{muitoEstilo}</p>}
            </div>

            <button
              type="submit"
              className="bg-[#F9C62E] mx-auto text-black w-[8rem] py-[0.3rem] cut-corner mt-[1.5rem] hover:cursor-pointer hover:bg-[#EDECE7] transition duration-300 ease-in-out hover:border-[#EDECE7] hover:text-black"
            >
              <p>Enviar</p>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default StyleSelection;
