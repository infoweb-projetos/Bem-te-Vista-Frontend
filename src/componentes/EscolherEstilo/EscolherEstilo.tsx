import '../../App.css';
import React, { useState } from 'react';
import api from '../../axiosConfig';

import bgforms from '../../imagens/bg-signup.png';
import cabide from '../../imagens/cabide.svg';
import logo from '../../imagens/logo.svg';
import hearticon from '../../imagens/Icons/heart-icon.svg';

// Lista de estilos com a imagem de fundo associada
const styles = [
  { id: 'clássico', name: 'Clássico', bgImage: bgforms },
  { id: 'minimalista', name: 'Minimalista', bgImage: bgforms },
  { id: 'boho', name: 'Boho', bgImage: bgforms },
  { id: 'vintage', name: 'Vintage', bgImage: bgforms },
  { id: 'retro', name: 'Retro', bgImage: bgforms },
  { id: 'punk', name: 'Punk', bgImage: bgforms },
  { id: 'gótico', name: 'Gótico', bgImage: bgforms },
  { id: 'grunge', name: 'Grunge', bgImage: bgforms },
  { id: 'streetwear', name: 'Streetwear', bgImage: bgforms },
  { id: 'esportivo', name: 'Esportivo', bgImage: bgforms },
  { id: 'preppy', name: 'Preppy', bgImage: bgforms },
  { id: 'chic', name: 'Chic', bgImage: bgforms },
  { id: 'roker', name: 'Roker', bgImage: bgforms },
  { id: 'romântico', name: 'Romântico', bgImage: bgforms },
  { id: 'futurista', name: 'Futurista', bgImage: bgforms },
  { id: 'cowboy', name: 'Cowboy/Western', bgImage: bgforms },
  { id: 'militar', name: 'Militar', bgImage: bgforms },
  { id: 'glam', name: 'Glam', bgImage: bgforms },
  { id: 'grunge-revival', name: 'Grunge Revival', bgImage: bgforms },
  { id: 'cyberpunk', name: 'Cyberpunk', bgImage: bgforms },
  { id: 'safari', name: 'Safari', bgImage: bgforms },
  { id: 'hipster', name: 'Hipster', bgImage: bgforms },
  { id: 'moderno', name: 'Moderno', bgImage: bgforms },
  { id: 'casual', name: 'Casual', bgImage: bgforms },
  { id: 'formal', name: 'Formal', bgImage: bgforms },
  { id: 'artsy', name: 'Artsy', bgImage: bgforms },
  { id: 'kawaii', name: 'Kawaii', bgImage: bgforms },
  { id: 'andrógino', name: 'Andrógino', bgImage: bgforms },
  { id: 'pinup', name: 'Pin-up', bgImage: bgforms },
  { id: 'y2k', name: 'Y2K', bgImage: bgforms },
];

const StyleSelection: React.FC = () => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [muitoEstilo, setMuitoEstilo] = useState('');

  const handleStyleChange = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(prev => prev.filter(s => s !== style));
      setMuitoEstilo(''); // Reseta a mensagem de erro ao desmarcar um estilo
    } else if (selectedStyles.length < 5) {
      setSelectedStyles(prev => [...prev, style]);
      setMuitoEstilo(''); // Garante que a mensagem de erro seja removida ao adicionar um estilo dentro do limite
    } else {
      setMuitoEstilo('Você só pode selecionar até 5 estilos.');
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
  
      alert('Estilos atualizados com sucesso!');
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
          <p className="mb-[0]"><b>*No máximo 5</b></p>
          <p className="mb-[1rem]">Não possui preferências? <a href="#" className="hover:underline"><b>Prossiga</b></a></p>
          <form onSubmit={handleSubmit} className="font-[Martel Sans] text-center">
            <div className="flex flex-wrap justify-between items-center pr-2 overflow-y-scroll overflow-x-hidden h-[19rem] custom-scroll select-none">
              {styles.map(style => (
                <div className="div-estilo mb-1" key={style.id}>
                  <input
                    type="checkbox"
                    value={style.id}
                    className="checkboxstyle"
                    id={`checkbox-${style.id}`}
                    onChange={() => handleStyleChange(style.id)}
                    checked={selectedStyles.includes(style.id)}
                    disabled={!selectedStyles.includes(style.id) && selectedStyles.length >= 5}
                  />
                  <label
                    htmlFor={`checkbox-${style.id}`}
                    className="label-estilo bg-cover flex items-center justify-center w-[166px] h-[166px] border border-[#EDECE7] cursor-pointer"
                    style={{ backgroundImage: `url(${style.bgImage})` }}
                  >
                    <p className="text-center stroke-text text-2xl">{style.name}</p>
                    <img
                      src={hearticon}
                      width="25"
                      className={selectedStyles.includes(style.id) ? 'absolute z-10 mt-[-172px] mr-[-172px]' : 'hidden'}
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