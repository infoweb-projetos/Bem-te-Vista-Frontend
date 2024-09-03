import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../imagens/logo.svg';
import searchIcon from '../../imagens/Icons/search-icon.svg';
import gradeIcon from '../../imagens/Icons/grid-icon.svg';
import notifIcon from '../../imagens/Icons/notif-icon.svg';
import userIcon from '../../imagens/Icons/user-icon.png';
import gearIcon from '../../imagens/Icons/gear-icon.svg';
import arrowDownIcon from '../../imagens/Icons/arrow-down-icon.svg';
import closeIcon from '../../imagens/Icons/close-icon.svg';
import needleIcon from '../../imagens/Icons/needle-icon.svg';
import pencilIcon from '../../imagens/Icons/pencil-icon.svg';
import borderFeed from '../../imagens/borda-feed.svg';
import previewBannerImage from '../../imagens/bannerGenerico.png';
import previewProfileImage from '../../imagens/fotoPerfilGenerico.png';
import agulhaFav from '../../imagens/argulha.png';
import bordaBtv from '../../imagens/borda-btv.svg';
import axios from 'axios'; 

const MeuPerfil: React.FC = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [nome, setnome] = useState<string | null>(null);
  //const [estilos, setEstilos] = useState<string[]>([]);
  const navigate = useNavigate();

  const [estilos, setEstilos] = useState<{ estiloId: string; nome: string }[]>([]);


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username'); 
    const storednome = localStorage.getItem('nome');
    if (!userId || !storedUsername || !storednome) {
      console.error('User ID ou username não encontrado.');
      alert('Usuário não autenticado. Redirecionando para o login.');
      navigate('/login'); // Redireciona para a página de login
    } else {
      setUsername(storedUsername);
      setnome(storednome); // Define o nome de usuário no estado
      fetchEstilos(userId);
    }
  }, [navigate]);

    const fetchEstilos = async (userId: string) => {
        try {
          const response = await axios.get(`http://localhost:3000/users/${userId}/styles`);
          console.log('Estilos recebidos:', response.data);
          setEstilos(response.data); // Atualiza o estado com os estilos do usuário
        } catch (error) {
          console.error('Erro ao buscar estilos:', error);
          alert('Não foi possível carregar os estilos.');
        }
      };

  const handleOpenModal = () => {
    setShowModal(true);
    const esmaecer = document.getElementById('esmaecer');
    if (esmaecer) esmaecer.style.display = 'block';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    const esmaecer = document.getElementById('esmaecer');
    if (esmaecer) esmaecer.style.display = 'none';
  };
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/login');
};

const handleDeleteAccount = async () => {
  try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
          throw new Error('Usuário não autenticado.');
      }

      console.log(userId);
      
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erro ao excluir a conta: ${errorText}`);
      }

      // Remove o usuário do armazenamento local e redireciona para a página de login
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('nome');
      navigate('/Cadastro');
  } catch (error) {
      // Verifica se o erro é uma instância de Error
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('Erro ao excluir conta:', error);
      alert('Ocorreu um erro ao excluir sua conta. Detalhes: ' + errorMessage);
  }
};

  return (
    <div className="flex">
      {/* Div esmaecer pros modais */}
      {showModal && (
        <div id="esmaecer" className="bg-[rgba(0,0,0,0.3)] fixed z-10 w-[100vw] h-[100vh]" />
      )}

      {/* MENU LATERAL */}
      <div className="bg-[#EDECE7] w-[20%] flex flex-col items-center fixed h-[100vh] text-2xl">
        <div className="pt-12 flex flex-col items-center justify-center">
          <Link to="/">
            <img src={logo} width="200" alt="Logo" />
          </Link>
          <nav className="mt-12">
            <ul>
              <li className="my-2 mt-2">
                <Link to="" className="flex items-center">
                  <img src={searchIcon} width="20" className="mr-2" alt="Pesquisa" />
                  <p className="max-md:hidden hover:underline">Explorar</p>
                </Link>
              </li>
              <li className="my-2 mt-6">
                <Link to="" className="flex items-center">
                  <img src={gradeIcon} width="20" className="mr-2" alt="Grade" />
                  <p className="max-md:hidden hover:underline">Grade</p>
                </Link>
              </li>
              <li className="my-2 mt-6 flex">
                  <img src={notifIcon} width="20" className="mr-2" alt="Notificações" />
                  <p className="max-md:hidden hover:underline">Notificações</p>
              </li>
              <li className="my-2 mt-6">
                <Link to="" className="flex items-center">
                  <img src={userIcon} width="20" className="mr-2" alt="Meu Perfil" />
                  <p className="max-md:hidden hover:underline">Meu Perfil</p>
                </Link>
              </li>
              <li className="my-2 mt-6 flex">
                <button onClick={() => setShowSubMenu(!showSubMenu)} className='flex items-center'>
                <Link to="" className="flex items-center">
                  <img src={gearIcon} width="20" className="mr-2" alt="Settings" />
                  <p className="max-md:hidden hover:underline mr-2">Configurações</p>
                </Link>
                  <img src={arrowDownIcon} width="15" className="pt-2" alt="Arrow Down" />
                </button>
              </li>
              {/* Submenu de Configurações */}
              {showSubMenu && (
                <div id="subMenuConfig" className="hover:cursor-pointer flex absolute z-10 text-lg ml-[12rem] w-[10rem] bg-[#EDECE7] border border-black flex-col p-4 text-red-500">
                  <p onClick={handleLogout} className="hover:underline">Sair</p>
                  <button onClick={handleOpenModal} className="hover:underline cursor-pointer text-left">Excluir a conta</button>
                </div>
              )}
            </ul>
            <button className="flex justify-around items-center bg-black text-white px-4 py-3 mt-10 text-xl cut-corner">
              <p className="pr-2">Publicar</p>
              <img src={needleIcon} width="20" alt="Publish" />
            </button>
          </nav>
        </div>
        <span>
          <img src={borderFeed} className="absolute h-[110vh] top-0 left-[100%]" alt="Border Feed" />
        </span>
      </div>

      {/* MAIN */}
      <main className="bg-[#EDECE7] w-[80%] ml-[20%] min-h-[100vh] pb-12">
        {/* Modal de excluir usuário */}
        {showModal && (
          <div id="modalExcluir" className="absolute z-10 w-[26rem] mx-auto left-0 right-0 mt-24 py-2 px-10 bg-[#EDECE7] border border-black text-center">
            <button onClick={handleCloseModal} className="bg-none absolute ml-[11rem] mb-[5rem]">
              <img src={closeIcon} width="15" alt="Close Modal" />
            </button>
            <h3 className="text-2xl font-bold mt-8">Está de saída? :(</h3>
            <p className="text-lg w-full pt-2">Ao deletar sua conta, seus dados serão excluídos permanentemente. Tem certeza?</p>
            <div className="flex justify-around pt-6 mb-8">
              <button className="p-2 border border-[#8AA66D] hover:bg-[#8AA66D] hover:text-white transition duration-300 ease-in-out" onClick={handleCloseModal}>Cancelo..</button>
              <button onClick={handleDeleteAccount} className="p-2 border border-[#FF441B] hover:bg-[#FF441B] hover:text-white transition duration-300 ease-in-out">Vai na paz irmão</button>
            </div>
          </div>
        )}

        {/* BANNER */}
        <div style={{backgroundImage : `url(${previewBannerImage})`}} className="bg-cover w-full h-[40vh]">
        
        </div>

        <div className="w-[1050px] mx-auto flex flex-col w-full max-xl:w-[55rem] max-lg:w-[37rem] px-16">
          <div className="flex mx-auto justify-between w-full">
            <div className="flex justify-between w-full">
              <div >
              {/* FOTO DE PERFIL */}
              <div>
                <img src={previewProfileImage} width="220" className="rounded-full mt-[-8rem] mb-4" alt="Profile" />
                
              </div>
              
              <div className="flex items-center">
                <h2 className="text-3xl font-semibold mr-4">{nome ? nome : 'Nome do Usuário'}</h2>
                
                  <Link to="/editar-perfil" className="cut-corner-border flex bg-black text-xl font-medium">
                      <div className="bg-[#EDECE7] hover:bg-[#F9C62E] transition duration-300 ease-in-out w-[20rem]">
                          <div className="w-full h-full flex items-center justify-between px-2 py-1">
                              <img src={pencilIcon} width="20" />
                              <p>Editar perfil</p>
                          </div>
                      </div>
                  </Link>
                
              </div>
                <h2 className="text-2xl font-semibold mr-4">{username ? username : 'Nome do Perfil'}</h2>
                
                <ul className="flex mt-2 text-lg">
                    <li className="mr-4">
                      {/* NÚMERO SEGUINDO */}
                        <p>Seguindo <b>0</b></p>
                    </li>
                    <li className="mx-2">
                      {/* NÚMERO SEGUIDORES */}
                        <p>Seguidores <b>0</b></p>
                    </li>
                    <li className="mx-2">
                      {/* NÚMERO PUBLICAÇÕES */}
                        <p>Publicações <b>0</b></p>
                    </li>
                </ul>
                {/* DESCRIÇÃO PERFIL */}
                <p className="text-lg mt-4 w-[32rem]">Sobre o perfil</p>
                {/* ESTILOS ESCOLHIDOS */}
                <ul className="flex text-lg mt-2">
  {estilos.length > 0 ? (
    estilos.map((estilo) => (
      <li key={estilo.estiloId} className="bg-white border border-gray-300 p-4 rounded-lg shadow">
        {estilo.nome}
      </li>
    ))
  ) : (
    <li className="text-gray-500">Carregando estilos... Ou você ainda não possui nenhum estilo.</li>
  )}
</ul>
              </div>
              
                <div className="flex flex-col mt-[3rem] items-center">
                  {/* LOOK FAVORITO */}
                  <h2 className="mb-4 text-xl font-medium">Seu Look Favorito</h2>
                    <div className="flex flex-col items-center">
                      <div className="w-[300px] h-[300px] bg-[#C4C4C4] flex items-center justify-center">
                      </div>
                      <img src={agulhaFav} className="mt-[-19.5rem] max-xl:mt-[-15rem] max-xl:ml-0" width="350" />
                    
                    
                </div>
                
              </div>
              
            </div>
          </div>
          <div className="flex text-2xl w-full mx-auto ">
                    <div className="flex">
                        <a className="mr-[3rem]">
                            <h3 className="underline decoration-[#F9C62E] hover:cursor-pointer">Feed</h3>
                        </a>
                        <a className="hover:underline hover:cursor-pointer">
                            <h3>Coleções</h3>
                        </a>
                    </div>
        
                </div>
                {/* FEED */}
                <div className="mt-[2rem] flex flex-col items-center justify-center pb-16 w-full">
                    <p className="text-2xl text-gray-500 mt-10">Sem postagens</p>
                </div>
        </div>
      </main>
    </div>
  );
};

export default MeuPerfil;