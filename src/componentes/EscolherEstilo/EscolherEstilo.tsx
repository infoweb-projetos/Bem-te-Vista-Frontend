import '../../App.css';
import './EscolherEstilo.css';
import React, { useState } from 'react';
import api from '../../axiosConfig';

import bgforms from '../../imagens/bg-signup.png';
import cabide from '../../imagens/cabide.svg';
import logo from '../../imagens/logo.svg';

// import bgClássico from '../../imagens/bg-clássico.png';
// import bgMinimalista from '../../imagens/bg-minimalista.png';
// import bgBoho from '../../imagens/bg-boho.png';
// import bgVintage from '../../imagens/bg-vintage.png';
// import bgRetro from '../../imagens/bg-retro.png';
// import bgPunk from '../../imagens/bg-punk.png';
// import bgGótico from '../../imagens/bg-gótico.png';
// import bgGrunge from '../../imagens/bg-grunge.png';
// import bgStreetwear from '../../imagens/bg-streetwear.png';
// import bgEsportivo from '../../imagens/bg-esportivo.png';
// import bgPreppy from '../../imagens/bg-preppy.png';
// import bgChic from '../../imagens/bg-chic.png';
// import bgRoker from '../../imagens/bg-roker.png';
// import bgRomântico from '../../imagens/bg-romântico.png';
// import bgEclético from '../../imagens/bg-eclético.png';
// import bgFuturista from '../../imagens/bg-futurista.png';
// import bgCowboy from '../../imagens/bg-cowboy.png';
// import bgMilitar from '../../imagens/bg-militar.png';
// import bgGlam from '../../imagens/bg-glam.png';
// import bgGrungeRevival from '../../imagens/bg-grunge-revival.png';
// import bgCyberpunk from '../../imagens/bg-cyberpunk.png';
// import bgSafari from '../../imagens/bg-safari.png';
// import bgHipster from '../../imagens/bg-hipster.png';
// import bgModerno from '../../imagens/bg-moderno.png';
// import bgCasual from '../../imagens/bg-casual.png';
// import bgFormal from '../../imagens/bg-formal.png';
// import bgArtsy from '../../imagens/bg-artsy.png';
// import bgKawaii from '../../imagens/bg-kawaii.png';
// import bgAndrógino from '../../imagens/bg-andrógeno.png';
// import bgPinup from '../../imagens/bg-pinup.png';
// import bgY2K from '../../imagens/bg-y2k.png';

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
  { id: 'eclético', name: 'Eclético', bgImage: bgforms },
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

  const handleStyleChange = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Enviar estilos selecionados para o backend, ou prossiga para a próxima página
    console.log('Estilos selecionados:', selectedStyles);
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
          className="bg-[rgba(0,0,0,0.6)] border-2 border-white flex flex-col items-start justify-center text-white w-[28rem] px-12 py-[2rem]"
        >
          <h2 className="font-[Rufina] font-bold text-4xl mb-[1rem]">Escolha seus estilos!</h2>
          <p className="mb-[2rem]">Não possui preferências? <a href="#" className="hover:underline"><b>Prossiga</b></a></p>
          <form onSubmit={handleSubmit} className="font-[Martel Sans] flex flex-wrap justify-between items-center">
            {styles.map(style => (
              <div className="div-estilo mb-1" key={style.id}>
                <input
                  type="checkbox"
                  value={style.id}
                  className="checkboxstyle"
                  id={`checkbox-${style.id}`}
                  onChange={() => handleStyleChange(style.id)}
                />
                <label
                  htmlFor={`checkbox-${style.id}`}
                  className="label-estilo bg-cover flex items-center justify-center w-[172px] h-[172px] border border-[#EDECE7] cursor-pointer"
                  style={{ backgroundImage: `url(${style.bgImage})` }}
                >
                  <p className="text-center stroke-text text-2xl">{style.name}</p>
                  <img
                    src="imagens/Icons/heart-icon.svg"
                    width="25"
                    className={selectedStyles.includes(style.id) ? '' : 'hidden'}
                  />
                </label>
              </div>
            ))}
            <button
              type="submit"
              className="bg-[#F9C62E] mx-auto text-black w-[8rem] py-[0.3rem] mt-[1.5rem] hover:cursor-pointer hover:bg-[#EDECE7] transition duration-300 ease-in-out hover:border-[#EDECE7] hover:text-black"
            >
              Enviar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default StyleSelection;
