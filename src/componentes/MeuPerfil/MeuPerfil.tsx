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
import previewBannerImage from '../../imagens/bg-forms.png';

const MeuPerfil: React.FC = () => {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [profilePreview, setProfilePreview] = useState<string | null>(null);
    const [favPreview, setFavPreview] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const userId = localStorage.getItem('userId');
      const storedUsername = localStorage.getItem('username'); // Obtém o nome de usuário do localStorage
      if (!userId || !storedUsername) {
        console.error('User ID ou username não encontrado.');
        alert('Usuário não autenticado. Redirecionando para o login.');
        navigate('/login'); // Redireciona para a página de login
      } else {
        setUsername(storedUsername); // Define o nome de usuário no estado
      }
    }, [navigate]);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setPreview: React.Dispatch<React.SetStateAction<string | null>>) => {
      if (event.target.files && event.target.files.length > 0) {
        const src = URL.createObjectURL(event.target.files[0]);
        setPreview(src);
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
                  <button onClick={handleOpenModal} className="hover:underline cursor-pointer justify-center">Excluir a conta</button>
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
      <main className="bg-[#EDECE7] w-[80%] ml-[20%]">
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

        {/* Banner */}
        <div className="bg-[url('./imagens/bg-forms.png')] bg-cover w-full h-[40vh]" />

        <div className="w-[65rem] mx-auto max-xl:w-[55rem] max-lg:w-[37rem]">
          <div className="flex mx-auto justify-between">
            <div>
              {/* Foto de perfil */}
              <img src={previewBannerImage} width="220" className="rounded-full mt-[-8rem]" alt="Profile" />
              <div className="flex items-center">
              <h2 className="text-3xl font-semibold mr-4">{username ? username : 'Nome do Perfil'}</h2>
                <Link to="/editar-perfil" className="flex items-center cursor-pointer border border-black text-lg bg-white transition duration-300 ease-in-out py-2 px-4 rounded-l-md">
                  <img src={pencilIcon} width="20" alt="Edit" />
                  <div className="py-2 px-4 rounded-r-md">Editar Perfil</div>
                </Link>
              </div>
              <p className="text-lg">Sobre o perfil</p>
              <ul className="flex">
                <li className="mr-4">
                  <p><b>10</b> Publicações</p>
                </li>
                <li className="mr-4">
                  <p><b>20</b> Seguidores</p>
                </li>
              </ul>

              {/* Botões de visualização de imagens */}
              <div className="my-4 flex flex-col items-center">
                <div className="flex flex-col items-center">
                  <label htmlFor="banner" id="label-banner" className="cursor-pointer text-lg p-2 bg-white border border-black rounded-lg">
                    Escolha um banner
                    <input
                      type="file"
                      id="banner"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setBannerPreview)}
                    />
                  </label>
                  {bannerPreview && (
                    <img src={bannerPreview} id="file-ip-1-preview" className="mt-2 rounded-lg" alt="Banner Preview" />
                  )}
                </div>

                <div className="flex flex-col items-center">
                  <label htmlFor="profile" id="label-profile" className="cursor-pointer text-lg p-2 bg-white border border-black rounded-lg">
                    Escolha uma foto de perfil
                    <input
                      type="file"
                      id="profile"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setProfilePreview)}
                    />
                  </label>
                  {profilePreview && (
                    <img src={profilePreview} id="file-ip-2-preview" className="mt-2 rounded-full" alt="Profile Preview" />
                  )}
                </div>

                <div className="flex flex-col items-center">
                  <label htmlFor="fav" id="label-fav" className="cursor-pointer text-lg p-2 bg-white border border-black rounded-lg">
                    Escolha uma imagem favorita
                    <input
                      type="file"
                      id="fav"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setFavPreview)}
                    />
                  </label>
                  {favPreview && (
                    <img src={favPreview} id="file-ip-3-preview" className="mt-2 rounded-lg" alt="Favorite Preview" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MeuPerfil;