import React, { useState, useEffect } from 'react';
import intro from '../../imagens/intro.gif';
import logo from '../../imagens/logo.svg';
import lpimg from '../../imagens/lp-img.png';
import bordaFeed from '../../imagens/borda-feed.svg';
import desenvolvedores from '../../imagens/desenvolvedores.png';
import felipe from '../../imagens/felipe.png';
import gabriel from '../../imagens/gabriel.png';
import iraikare from '../../imagens/iraikare.png';
import jordson from '../../imagens/jordson.png';
import lielly from '../../imagens/lielly.png';
import lucas from '../../imagens/lucas.png';
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
    <div className="w-full h-screen flex flex-col items-center justify-items-center">
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
        <div className="bg-[#EDECE7] flex flex-col items-center">
      {/* Navbar */}
      <nav className="flex justify-center w-full items-center px-8 py-4 bg-[#EDECE7] border-b border-black border-dashed " >
        <div className="w-11/12 flex justify-between items-center mx-0-auto">
          <Link to="/">
              <img src={logo} width="200" alt="Logo" />
            </Link>
          <ul className="flex items-center space-x-6 text-lg">
            <a href='#sobre' className="hover:underline decoration-[#F9C62E] text-xl underline-offset-4 cursor-pointer">Quem somos?</a>
            <a href="#desenvolvedores" className="hover:underline decoration-[#F9C62E] text-xl underline-offset-4 cursor-pointer">Desenvolvedores</a>
          </ul>
          <div className="flex space-x-4">
          <Link to="/Login" className="bg-[#ffffff] text-center self-center cut-corner text-black w-[8rem] py-[0.3rem] hover:text-white hover:cursor-pointer hover:bg-[#000000] transition duration-300 ease-in-out hover:text-black">
              Entrar
            </Link>
            <Link to="/Cadastro" className="bg-[#F9C62E] text-center self-center cut-corner text-black w-[8rem] py-[0.3rem] hover:text-white hover:cursor-pointer hover:bg-[#000000] transition duration-300 ease-in-out hover:border-[#EDECE7] hover:text-black">
              Cadastre-se
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 pt-16 flex space-x-4 items-center w-11/12">
        <div>
        <h1 id="sobre" className=" text-8xl font-light mb-10 min-w-400 z-10 absolute top-[13rem]">Quem somos?</h1>
        <p className="text-xl mb-6 w-[40rem] leading-relaxed pr-60"> O 
          <span className=" text-5xl italiana-font"> Bem te Vista</span> é uma plataforma
          única, onde <span className="font-bold">estilo</span> e{" "}
          <span className="font-bold">conexão</span> se encontram.
        </p>
        <p className="text-xl mb-6 w-[40rem] leading-relaxed pr-60">
          Somos uma rede social dedicada à <span className="font-bold">moda</span>, criada para quem ama explorar,
          compartilhar e se inspirar no universo dos estilos. <br/> <br/> Aqui, cada
          publicação é uma expressão de <span className="font-bold">identidade</span>, e cada <span className="font-bold">interação</span>, uma
          oportunidade de descobrir algo novo.
        </p>
        <div className="flex space-x-4">
        <Link to="/Login" className="bg-[#ffffff] text-xl text-center self-center cut-corner text-black w-[12rem] py-[0.8rem] hover:text-white mt-[1.5rem] hover:cursor-pointer hover:bg-[#000000] transition duration-300 ease-in-out hover:text-black">
            Entrar
          </Link>
          <Link to="/Cadastro" className="bg-[#F9C62E] text-xl text-center self-center cut-corner text-black w-[12rem] py-[0.8rem] hover:text-white mt-[1.5rem] hover:cursor-pointer hover:bg-[#000000] transition duration-300 ease-in-out hover:border-[#EDECE7] hover:text-black">
            Cadastre-se
          </Link>
        </div>
        </div>
        <div style={{ marginLeft: "-100px" }}>
            <img src={lpimg} width={1000}  alt="Imagem de destaque remetendo a moda"/>
        </div>
      </section>

      {/* Developers Section */}
      <section className="px-8 py-16 bg-[#EDECE7] w-11/12">
        <h1 id="desenvolvedores" className="text-8xl font-light mb-10 min-w-400 text-center">Desenvolvedores</h1>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <img src={felipe} />
            <p className="text-xl mt-2">Felipe Gabriel</p>
          </div>
          <div className="text-center">
            <img src={gabriel} />
            <p className="text-xl mt-2">Gabriel Ferreira</p>
          </div>
          <div className="text-center">
            <img src={iraikare} />
            <p className="text-xl mt-2">Iraikare Rodrigues</p>
          </div>
          <div className="text-center">
            <img src={jordson} />
            <p className="text-xl mt-2">Jordson Albino</p>
          </div>
          <div className="text-center">
            <img src={lielly} />
            <p className="text-xl mt-2">Lielly Nátaly</p>
          </div>
          <div className="text-center">
            <img src={lucas} />
            <p className="text-xl mt-2">Lucas de Lima</p>
          </div>
        </div>
        
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-[#EDECE7] border-t border-black border-dashed w-full">
        <div className="">
        <p className="text-gray-500">© Todos os direitos reservados</p>
        </div>
        
      </footer>
    </div>
      )}
    </div>
  );
};

export default Landing;