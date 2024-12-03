import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../../imagens/logo.svg';
import searchIcon from '../../imagens/Icons/search-icon.svg'
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

// const predefinedStyles = [
//   'Clássico', 'Minimalista', 'Boho', 'Vintage', 'Retro', 'Punk', 'Gótico',
//   'Grunge', 'Streetwear', 'Esportivo', 'Preppy', 'Chic', 'Roker', 'Romântico',
//   'Eclético', 'Futurista', 'Cowboy/Western', 'Militar', 'Glam', 'Grunge Revival',
//   'Cyberpunk', 'Safari', 'Hipster', 'Moderno', 'Casual', 'Formal', 'Artsy',
//   'Kawaii', 'Andrógino', 'Pin-up', 'Y2K',
// ];

const predefinedStyles = [
  { id: 'classico', name: 'Clássico' },
  { id: 'minimalista', name: 'Minimalista'},
  { id: 'boho', name: 'Boho'},
  { id: 'vintage', name: 'Vintage'},
  { id: 'retro', name: 'Retro'},
  { id: 'punk', name: 'Punk'},
  { id: 'gotico', name: 'Gótico'},
  { id: 'grunge', name: 'Grunge'},
  { id: 'streetwear', name: 'Streetwear'},
  { id: 'esportivo', name: 'Esportivo'},
  { id: 'preppy', name: 'Preppy'},
  { id: 'chic', name: 'Chic'},
  { id: 'roker', name: 'Roker'},
  { id: 'romantico', name: 'Romântico'},
  { id: 'futurista', name: 'Futurista'},
  { id: 'cowboy', name: 'Cowboy'},
  { id: 'militar', name: 'Militar' },
  { id: 'glam', name: 'Glam'},
  { id: 'grunge-revival', name: 'Grunge Revival'},
  { id: 'cyberpunk', name: 'Cyberpunk'},
  { id: 'safari', name: 'Safari'},
  { id: 'hipster', name: 'Hipster'},
  { id: 'moderno', name: 'Moderno'},
  { id: 'casual', name: 'Casual' },
  { id: 'formal', name: 'Formal'},
  { id: 'artsy', name: 'Artsy'},
  { id: 'kawaii', name: 'Kawaii'},
  { id: 'androgino', name: 'Andrógino'},
  { id: 'pinup', name: 'Pin-up'},
  { id: 'y2k', name: 'Y2K'}
];


const EditarPerfil: React.FC = () => {
  const { username } = useParams<{ username: string }>(); // Extrai o parâmetro da URL
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState<string | null>(null);
  const [estilos, setEstilos] = useState<{ estiloId: string; nome: string }[]>([]);
  const navigate = useNavigate();
  const [bio, setBio] = useState<string | null>(null);
  const [userName, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [senha, setSenha] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      console.error('Nome de usuário não fornecido.');
      navigate('/login');
      return;
    }


    const fetchPerfilData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/profile/${username}`);
        setNome(response.data.nome);
        fetchEstilos(response.data.id);
        setBio(response.data.bio)
        setEmail(response.data.email)
        setUsername(response.data.nome_de_usuario)
        setSenha(response.data.senha)
      } catch (error) {
        console.error('Erro ao buscar dados do perfil:', error);
        navigate('/login');
      }
    };

    fetchPerfilData();
  }, [username, navigate]);

  const fetchEstilos = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}/styles`);
      const userStyles = response.data.map((estilo: { nome: string }) => estilo.nome);
      setEstilos(response.data); // Atualiza todos os estilos do usuário
      setSelectedStyles(userStyles); // Ajusta os estilos selecionados
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
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('Usuário não autenticado.');
      }

      //console.log(userId);

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
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);
  const [previewProfile, setPreviewProfile] = useState<string | null>(null);
  const [previewFavLook, setPreviewFavLook] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setPreview: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleStyleSelection = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles((prevStyles) => prevStyles.filter((s) => s !== style));
    } else if (selectedStyles.length < 3) {
      setSelectedStyles((prevStyles) => [...prevStyles, style]);
    } else {
      alert('Você pode selecionar no máximo 3 estilos.');
    }
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Usuário não autenticado.');
      return;
    }

    try {
      const formData = new FormData();
      if (previewBanner) formData.append('banner', previewBanner);
      if (previewProfile) formData.append('profile', previewProfile);
      formData.append('nome', nome || '');
      formData.append('bio', bio || '');
      formData.append('estilos', JSON.stringify(selectedStyles));
      // console.log(nome)
      // console.log(bio)
      // console.log(userName)
      // console.log(email)
      // console.log(senha)
      // console.log(formData)
      // console.log(userId)
      console.info(selectedStyles)
      const usuario = {
        nome: nome, bio: bio, nome_de_usuario: userName
      };
      const usuarioEstilos = {styles: selectedStyles};
      // const estilosParaAtualizar = estilos.filter((estilo) => selectedStyles.includes(estilo.nome));
      
      //console.info(estilosParaAtualizar)
      const a = await axios.patch(`http://localhost:3000/users/${userId}`, usuario);
      const b = await axios.post(`http://localhost:3000/users/${userId}/styles`, usuarioEstilos);
      console.log(a)
      console.log(b)
      alert('Perfil atualizado com sucesso!');
      navigate(`/${username}/MeuPerfil`);

    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      alert('Erro ao atualizar o perfil.');
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
          <Link to="/Feed">
            <img src={logo} width="200" alt="Logo" />
          </Link>
          <nav className="mt-12">
            <ul className="">
              <li className="my-2 mt-2">
                <a href="explorar.html" className="flex items-center">
                  <img src={searchIcon} width="20" className="mr-2" />
                  <p className="max-md:hidden hover:underline">Explorar</p>
                </a>
              </li>
              <li className="my-2 mt-6">
                <Link to={`/${username}/MeuPerfil`} className="flex items-center">
                  <img src={userIcon} width="20" className="mr-2" />
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
        <form onSubmit={handleSubmit}>
          {/* Banner */}
          <div className="w-full h-[40vh] flex items-center justify-center" id="banner-preview">
            {!previewBanner ? (
              <label htmlFor="banner" className="">
                <img src={previewBannerImage} alt="Upload" className="mx-auto my-auto" />
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  id="banner"
                  className="absolute hidden"
                  onChange={(e) => handleFileChange(e, setPreviewBanner)}
                />
              </label>
            ) : (
              <img src={previewBanner} alt="Banner Preview" className="w-full h-full object-cover" />
            )}
          </div>

          <div className="w-[65rem] mx-auto max-xl:w-[55rem] max-lg:w-[37rem]">
            <div className="flex justify-between">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <div className="rounded-full mt-[-8rem] bg-[#D9D9D9] h-[220px] w-[220px] flex items-center justify-center relative">
                  {previewProfile && (
                    <button
                      onClick={() => setPreviewProfile(null)}
                      className="absolute bg-white rounded-full p-1 border border-red-500 top-[1rem] right-[1.5rem]"
                    >
                      <img src={closeIcon} alt="Remove" width={12} />
                    </button>
                  )}
                  {!previewProfile ? (
                    <label htmlFor="profile-pic" className="cursor-pointer">
                      <img src={previewProfileImage} alt="Upload" width={80} />
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id="profile-pic"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setPreviewProfile)}
                      />
                    </label>
                  ) : (
                    <img src={previewProfile} alt="Profile Preview" className="rounded-full object-cover w-full h-full" />
                  )}
                </div>
                <div className="flex flex-col text-xl pt-6 pb-12">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    value={nome || ''}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Adicione um novo nome..."
                    className="bg-transparent p-2 border border-black mb-4 w-[30rem] text-lg"
                  />
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    placeholder="Adicione uma nova bio"
                    value={bio || ''}
                    onChange={(e) => setBio(e.target.value)}
                    className="bg-transparent p-2 border mb-4 border-black h-[8rem] resize-none text-lg"
                  ></textarea>
                  {/* Dropdown para seleção de estilos */}
                  <div className="relative mb-6">
                    <label className="block text-xl font-semibold mb-2">Estilos</label>
                    <div
                      className="bg-transparent p-2 border border-black mb-4 text-lg rounded p-3 cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      {selectedStyles.length > 0
                        ? selectedStyles.join(', ')
                        : 'Selecione até 3 estilos'}
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute z-10  border rounded shadow w-full max-h-44 overflow-y-auto text-sm">
                        {predefinedStyles.map((style) => (
                          <div
                            key={style.name}
                            className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedStyles.includes(style.name) ? 'bg-blue-100' : ''
                              }`}
                            onClick={() => handleStyleSelection(style.name)}
                          >
                            {style.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Favorite Look */}
              <div className="flex flex-col items-center mt-[8rem]">
                <div className="w-[350px] h-[350px] bg-[#C4C4C4] flex items-center justify-center relative">
                  {previewFavLook && (
                    <button
                      onClick={() => setPreviewFavLook(null)}
                      className="absolute z-20 bg-white rounded-full p-1 border border-red-500 -top-2 -right-2"
                    >
                      <img src={closeIcon} alt="Remove" width={12} />
                    </button>
                  )}
                  {!previewFavLook ? (
                    <label htmlFor="fav-look" className="cursor-pointer z-20">
                      <img src={pencilIcon} alt="Upload" width={80} />
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id="fav-look"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setPreviewFavLook)}
                      />
                    </label>
                  ) : (
                    <img src={previewFavLook} alt="Fav Look Preview" className="object-cover w-full h-full" />
                  )}
                </div>
                <img src={agulhaFav} alt="Decoration" className="mt-[-22rem] z-10" width={400} />


                <div className="text-xl self-end mt-20">
                  <Link to={`/${username}/MeuPerfil`} className="text-[#FF441B] mr-4 hover:underline">
                    Cancelar
                  </Link>
                  <button type="submit" className="cut-corner bg-black p-4 text-white">Salvar alterações</button>
                </div>
              </div>
            </div>
          </div>
        </form>

      </main>
    </div>
  );
};

export default EditarPerfil;