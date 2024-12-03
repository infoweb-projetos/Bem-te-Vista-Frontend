import React, { useState, useEffect } from 'react';
import intro from '../../imagens/intro.gif';
import logo from '../../imagens/logo.svg';
import lpimg from '../../imagens/lp-img.png';
import desenvolvedores from '../../imagens/desenvolvedores.png';
import { Link } from 'react-router-dom';
import '../../App.css';

const Landing: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Definir o temporizador para ocultar a imagem após 3 segundos
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    // Limpar o temporizador ao desmontar
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen">
      {showIntro ? (
        // Tela de introdução com a imagem ocupando toda a tela
        <div className="w-full h-full flex items-center justify-center bg-black">
          <img
            src={intro}
            alt="Intro"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="bg-[#EDECE7]">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-[#EDECE7] border-b border-black border-dashed " >
        <Link to="/">
            <img src={logo} width="200" alt="Logo" />
          </Link>
        <ul className="flex space-x-6 text-lg">
          <a href='#sobre' className="hover:underline cursor-pointer">Quem somos?</a>
          <a href="#desenvolvedores" className="hover:underline cursor-pointer">Desenvolvedores</a>
        </ul>
        <div className="flex space-x-4">
        <Link to="/Login" className="bg-[#ffffff] text-center self-center cut-corner text-black w-[8rem] py-[0.3rem] hover:text-white mt-[1.5rem] hover:cursor-pointer hover:bg-[#000000] transition duration-300 ease-in-out hover:text-black">
            Entrar
          </Link>
          <Link to="/Cadastro" className="bg-[#F9C62E] text-center self-center cut-corner text-black w-[8rem] py-[0.3rem] hover:text-white mt-[1.5rem] hover:cursor-pointer hover:bg-[#000000] transition duration-300 ease-in-out hover:border-[#EDECE7] hover:text-black">
            Cadastre-se
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 pt-16 flex space-x-4 items-center">
        <div>
        <h1 id="sobre" className=" text-8xl font-light mb-10 min-w-400">Quem somos?</h1>
        <p className="text-xl mb-6 leading-relaxed pr-60"> O 
          <span className="font-medium text-3xl italiana-font"> Bem te Vista</span> é uma plataforma
          única, onde <span className="font-bold">estilo</span> e{" "}
          <span className="font-bold">conexão</span> se encontram.
        </p>
        <p className="text-xl mb-6 leading-relaxed pr-60">
          Somos uma rede social dedicada à <span className="font-bold">moda</span>, criada para quem ama explorar,
          compartilhar e se inspirar no universo dos estilos. <br/> <br/> Aqui, cada
          publicação é uma expressão de <span className="font-bold">identidade</span>, e cada <span className="font-bold">interação</span>, uma
          oportunidade de descobrir algo novo.
        </p>
        <div className="flex space-x-4">
        <Link to="/Login" className="bg-[#ffffff] text-center self-center cut-corner text-black w-[8rem] py-[0.3rem] hover:text-white mt-[1.5rem] hover:cursor-pointer hover:bg-[#000000] transition duration-300 ease-in-out hover:text-black">
            Entrar
          </Link>
          <Link to="/Cadastro" className="bg-[#F9C62E] text-center self-center cut-corner text-black w-[8rem] py-[0.3rem] hover:text-white mt-[1.5rem] hover:cursor-pointer hover:bg-[#000000] transition duration-300 ease-in-out hover:border-[#EDECE7] hover:text-black">
            Cadastre-se
          </Link>
        </div>
        </div>
        <div style={{ marginLeft: "-100px" }}>
            <img src={lpimg} width={1000}  alt="Imagem de destaque remetendo a moda"/>
        </div>
      </section>

      {/* Developers Section */}
      <section className="px-8 py-16 bg-[#EDECE7]">
        <h1 id="desenvolvedores" className="text-8xl font-light mb-10 min-w-400 text-center">Desenvolvedores</h1>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 items-center">
         
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-[#EDECE7] border-t border-black border-dashed">
        <p className="text-gray-500">© Todos os direitos reservados</p>
      </footer>
    </div>
      )}
    </div>
  );
};

export default Landing;