import React, { useState, useEffect } from 'react';
import '../../App.css'; 
import logo from '../../imagens/logo.svg';
import searchIcon from '../../imagens/Icons/search-icon.svg';
import userIcon from '../../imagens/Icons/user-icon.png';
import gearIcon from '../../imagens/Icons/gear-icon.svg';
import arrowDownIcon from '../../imagens/Icons/arrow-down-icon.svg';
import closeIcon from '../../imagens/Icons/close-icon.svg';
import needleIcon from '../../imagens/Icons/needle-icon.svg';
import clipIcon from '../../imagens/Icons/clip-icon.svg'
import kebabMenu from '../../imagens/Icons/kebab-menu-icon.svg'
import saveIcon from '../../imagens/Icons/save-icon.svg'
import sadIcon from '../../imagens/Icons/sad-icon.svg'
import redflagIcon from '../../imagens/Icons/red-flag-icon.svg'
import trashIcon from '../../imagens/Icons/trash-icon.svg'
import blockIcon from '../../imagens/Icons/block-icon.svg'
import muteIcon from '../../imagens/Icons/mute-icon.svg'
import trashWhiteIcon from '../../imagens/Icons/trash-white-icon.svg';
import cabideFeed from '../../imagens/cabide-feed.svg'
import bordaBtv from '../../imagens/borda-btv.svg';
import bordaFeed from '../../imagens/borda-feed.svg';
import bgforms from '../../imagens/bg-login.png';
import previewProfileImage from '../../imagens/fotoPerfilGenerico.png';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';

interface User {
  id: string;
  nome: string;
}

interface Comentario {
  id: string;
  conteudo: string;
  autor: User;
}

interface Post {
  id: string;
  conteudo: string; // Mudado de 'descricao' para 'conteudo'
  foto?: string; // Mantido como 'foto'
  estilos?: string[];
  autor: User;
  comentarios: Comentario[];
}

interface NewPost {
  foto: File | null;
}

const Feed: React.FC = () => {
  const [postagens, setPostagens] = useState<Post[]>([]);
  const [comentarios, setComentarios] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState<string | null>(null);
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [newPost, setNewPost] = useState<{ conteudo: string; foto: File | null; estilos: string[] }>({ // Mudado de 'descricao' para 'conteudo'
    conteudo: '',
    foto: null,
    estilos: [],
  });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');
  console.log(userId)
  const [estilos, setEstilos] = useState<{ estiloId: string; nome: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostagens();

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        if (target && !target.closest(`#menu-${activeMenuId}`)) {
            setActiveMenuId(null);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, [activeMenuId]);

  const baseUrl = 'http://localhost:3000/postagens';
  const token = localStorage.getItem('token');


  const fetchEstilos = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}/styles`);
      setEstilos(response.data); // Atualiza o estado com os estilos do usuário
    } catch (error) {
      console.error('Erro ao buscar estilos:', error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchEstilos(userId);
    }
  }, []);
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          setNewPost((prevPost) => ({ ...prevPost, foto: file }));
  
          // File preview
          const reader = new FileReader();
          reader.onload = () => {
              const previewElement = document.getElementById("file-ip-4-preview") as HTMLImageElement;
              if (previewElement) previewElement.src = reader.result as string;
          };
          reader.readAsDataURL(file);
        }
    };


const toggleMenu = (postId: string): void => {
    setActiveMenuId((prevId) => (prevId === postId ? null : postId));
};

const handleOpenDeletePostModal = () => {
  setShowDeletePostModal(true);
};

// Função para fechar o modal
const handleCloseDeletePostModal = () => {
  setShowDeletePostModal(false);
  
};
  
  const handleCreatePost = async () => {
    if (!newPost.conteudo.trim()) { // Alterado de 'descricao' para 'conteudo'
      alert('A descrição é obrigatória!'); // Mensagem alterada
      return;
    }

    if (!token) {
      console.error('Token não encontrado. O usuário deve estar autenticado.');
      return;
    }

    const formData = new FormData();
    formData.append('conteudo', newPost.conteudo); // Mudado de 'descricao' para 'conteudo'
    if (newPost.foto) {
      formData.append('foto', newPost.foto); // Nome do campo deve ser 'foto'
    }

    try {
      await axios.post(baseUrl, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowModal(false);
      fetchPostagens();
    } catch (error: unknown) { // Aqui usamos 'unknown'
      if (axios.isAxiosError(error)) { // Verificação de tipo
        console.error('Erro ao criar postagem:', error.response?.data || error.message);
      } else {
        console.error('Erro inesperado ao criar postagem:', error); // Captura de outros tipos de erro
    }
  }
  };

  const fetchPostagens = async () => {
    try {
      const response = await axios.get(baseUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setPostagens(response.data);
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
    }
  };

  const handleSave = async () => {
    if (!token || !selectedPost) {
      console.error('Token não encontrado ou postagem não selecionada.');
      return;
    }

    const formData = new FormData();
    formData.append('conteudo', selectedPost.conteudo); // Mudado de 'descricao' para 'conteudo'
    if (selectedPost.foto) {
      formData.append('foto', selectedPost.foto);
    }

    try {
      await axios.put(`${baseUrl}/${selectedPost.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setPostagens(prevPosts =>
        prevPosts.map(post => (post.id === selectedPost.id ? selectedPost : post))
      );
      setSelectedPost(null);
    } catch (error: unknown) { // Aqui usamos 'unknown'
      if (axios.isAxiosError(error)) { // Verificação de tipo
        console.error('Erro ao criar postagem:', error.response?.data || error.message);
      } else {
        console.error('Erro inesperado ao criar postagem:', error); // Captura de outros tipos de erro
    }
  }
  };

  const handleDeletePost = async (postId: string) => {
    if (!token) {
      console.error('Token não encontrado. O usuário deve estar autenticado.');
      return;
    }

    try {
      await axios.delete(`${baseUrl}/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchPostagens();
    } catch (error) {
      console.error('Erro ao deletar postagem:', error);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!token) {
      console.error('Token não encontrado. O usuário deve estar autenticado.');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('ID do usuário não encontrado.');
        return;
      }

      const comentarioData = { conteudo: comentarios[postId] };

      await axios.post(`${baseUrl}/${postId}/comentarios`, comentarioData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setComentarios(prev => ({ ...prev, [postId]: '' }));
      fetchPostagens();
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openPostModal = (postId : string) => {
    setShowPostModal(postId);
  }
  const closePostModal = (): void => {
    setShowPostModal(null);
  }

  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const handleOpenModal = () => {
    setShowModal1(true);
    const esmaecer = document.getElementById('esmaecer');
    if (esmaecer) esmaecer.style.display = 'block';
  };

  const handleCloseSubMenu = () =>{
    setShowSubMenu(false);
  }

  const handleCloseModal = () => {
    setShowModal1(false);
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
    <div className="postagens-page" >
      <body className="flex">
{/* <!-- Div esmaecer pros modais --> */}
<div id="esmaecer" className="hidden bg-[rgba(0,0,0,0.3)] absolute z-10 w-[100vw] h-[100vh]"></div>
    {/* <!-- MENU LATERAL --> */}
<div className="bg-[#EDECE7] w-[20%] flex flex-col items-center fixed h-[100vh] text-2xl ">
    <div className="pt-12 flex flex-col items-center justify-center">
        <Link to={`/${username}/Feed`}>
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
    <Link to={`/${username}/Perfil`} className="flex items-center">
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
            <button onClick={openModal} className="flex justify-around items-center bg-black text-white px-4 py-3 mt-10 text-xl cut-corner">
                <p className="pr-2">Publicar</p>
                <img src={needleIcon} width="20"/>
            </button>
        </nav>
    </div>
    <span>
        <img src={bordaFeed} className="absolute h-[110vh] top-0 left-[100%]" />
    </span>
</div>
    {/* <!-- MAIN --> */}
    <main className="bg-[#EDECE7] w-[50%] ml-[20%] flex flex-col items-center">
     {/* Modal de excluir usuário */}
     {showModal1 && (
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
        {/* <!-- Modal de criar post --> */}
        {showModal && (
        <div className='mx-auto fixed z-50'>
            <span
                className="w-[100vw] h-[100vh] fixed top-0 left-0 z-40 bg-black bg-opacity-20"
                onClick={closeModal}
            />
            <div id="modalCriarPost" className="bg-[#EDECE7] fixed z-50 w-[35rem] centralizado-fixed mx-auto px-4 py-6 mt-24 border border-black">
                <form className="flex flex-col">
                    <div className="flex justify-between w-full">
                        <div className="flex">
                            <a>
                                <img src={previewProfileImage} width="50" className="rounded-full" />
                            </a>
                            <input type="text" id="textoPost" placeholder="Voe no seu estilo..." className="border-none bg-transparent w-[26rem] ml-2 text-lg" value={newPost.conteudo}  onChange={(e) => setNewPost({ ...newPost, conteudo: e.target.value })} />
                        </div>
                        <button onClick={closeModal} className="mt-[-3rem]">
                            <img src={closeIcon} width="15" />
                        </button>
                    </div>
                    {/* <div
                            className="mt-4"
                            id="tags-component">
                            <!-- Tag Input -->
                        <div
                        className="w-full"
                        id="tags-input-wrapper">
                            <!-- INPUT -->
                            <select
                                id="new-tag-input"
                                className="w-full border bg-white border-black p-2 text-lg"
                                type="text"
                                
                            >
                                <option disabled selected>
                                    Escolha os seus estilos!</option>
                                <option>
                                    Old money </option>
                                <option>
                                    Gótico </option>
                                <option>
                                    Alternativo </option>
                                <option>
                                    Cosplay </option>
                            </select>
                            <!-- DIV COM AS TAGS -->
                            <div
                                className="mt-4 flex justify-start gap-[1.2rem] flex-wrap"
                                id="tags-list">
                            </div>
                        </div>
                    </div> */}
                    <div className="dashed-border w-full h-[20rem] mt-4 flex items-center justify-center">
                        <button 
                        onClick={closeModal}
                        id="botaoRemoverPost" className="hidden absolute mt-[-20rem] mr-[-33rem] bg-white rounded-full border border-black p-1">
                            <img src={closeIcon} width="15" />
                        </button>
                        <label id="labelPost" htmlFor="imagemPost" className="text-lg z-10 py-2 px-4 bg-[#F9C62E] border border-black hover:cursor-pointer hover:bg-[#ECB100] transition ease-in-out duration-300">
                            <p>Selecionar do computador</p>
                            <input type="file" id="imagemPost" className="hidden" accept="image/*"  onChange={handleFileChange}
                            />
                            
                        </label>
                        <img id="file-ip-4-preview" className="absolute w-[33rem] h-[20rem] object-cover" />
                        <div className="hidden w-full h-full" id="preview-post">
                            <img className="hidden object-cover" id="file-ip-4-preview" />
                        </div>
                    </div>
                    <div className="flex justify-end items-center mt-4">
                        <a onClick={closeModal} className="text-red-500 mr-4 hover:cursor-pointer hover:underline">
                            <p>Cancelar</p>
                        </a>
                        <button className="cut-corner bg-black text-white flex items-center px-4 py-2" onClick={(e) => {e.preventDefault(); handleCreatePost();}}>
                          <p>Publicar</p>
                          <img src={needleIcon} className="ml-2"/>
                        </button>
                        {/* <label htmlFor="submitPost" className="cut-corner bg-black text-white flex px-4 py-2 hover:cursor-pointer" >
                            <p className="mr-2">Publicar</p>
                            <img src={needleIcon} />
                            <input id="submitPost" name="submitPost" type="submit" className="hidden" />
                        </label> */}
                    </div>
                </form>
            </div>
        </div>
        
        )}
        {/* Listagem de postagens */}
        {postagens.map((post) => (
        <div key={post.id} className="post">
          {/* Modal para visualizar o post */}
          <section className="flex flex-col w-[35rem] pb-8 pt-6 min-h-[100vh]">
            {/* Modal de post */}
            {showPostModal === post.id && (
              <div className="w-100 h-100" id={`modal-${post.id}`}>
                <span
    className="w-[100vw] h-[100vh] fixed top-0 left-0 z-[5] bg-black bg-opacity-20"
    onClick={closePostModal}
/>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[40rem] pt-4 px-4 flex flex-col bg-[#EDECE7] border border-black">
                  <div className="flex justify-between items-center">
                    {post.foto && (
                      <img
                        src={`http://localhost:3000/uploads/${post.foto}`}
                        alt="Postagem"
                        className="w-[12rem] h-[12rem] object-cover border border-black shadow-lg"
                      />
                    )}
                    <div className="flex flex-col ml-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <a>
                            <img src={previewProfileImage} width="30" className="rounded-full mr-2" />
                          </a>
                          <p>@{post.autor.nome}</p>
                        </div>
                        <button onClick={closePostModal} className="bg-transparent border-none">
                          <img src={closeIcon} width="15" />
                        </button>
                      </div>
                      <div className="flex">
                        <div className="borda-btv bg-cover w-[7.6rem] h-[2.5rem] mr-2">
                          <p className="pt-[0.8rem] text-center pr-4">Old money</p>
                        </div>
                        <div className="borda-btv bg-cover w-[7.6rem] h-[2.5rem] mr-2">
                          <p className="pt-[0.8rem] text-center pr-4">Old money</p>
                        </div>
                        <div className="borda-btv bg-cover w-[7.6rem] h-[2.5rem]">
                          <p className="pt-[0.8rem] text-center pr-4">Old money</p>
                        </div>
                      </div>
                      <p className="mt-2">
                        <b>{post.autor.nome}</b> {post.conteudo}
                      </p>
                      <div className="flex mt-6">
                        <button>
                          <svg
                            width="24"
                            height="22"
                            viewBox="0 0 24 22"
                            fill="none"
                            className="hover:fill-[#F9C62E] mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.1721 11.7216L12.0102 21L2.84826 11.7216C2.24395 11.1203 1.76794 10.3976 1.45021 9.59892C1.13248 8.80027 0.979915 7.943 1.00212 7.08109C1.02432 6.21918 1.22081 5.37131 1.57922 4.59087C1.93763 3.81043 2.45019 3.11432 3.08462 2.54638C3.71905 1.97844 4.46162 1.55098 5.26555 1.2909C6.06949 1.03083 6.91738 0.943779 7.75583 1.03524C8.59429 1.12669 9.40514 1.39467 10.1373 1.82231C10.8695 2.24994 11.5072 2.82796 12.0102 3.51996C12.5153 2.83298 13.1538 2.26001 13.8854 1.83692C14.6171 1.41382 15.4263 1.14971 16.2624 1.06112C17.0985 0.972517 17.9435 1.06134 18.7445 1.32202C19.5455 1.5827 20.2853 2.00963 20.9175 2.57609C21.5497 3.14255 22.0607 3.83634 22.4186 4.61405C22.7766 5.39175 22.9736 6.23663 22.9975 7.0958C23.0214 7.95497 22.8716 8.80993 22.5575 9.60719C22.2434 10.4044 21.7718 11.1268 21.1721 11.7291"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                        <button>
                          <svg
                            width="16"
                            height="22"
                            viewBox="0 0 16 22"
                            fill="none"
                            className="hover:fill-black"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.25 1H3.25C2.65326 1 2.08097 1.23705 1.65901 1.65901C1.23705 2.08097 1 2.65326 1 3.25V21.25L7.75 17.875L14.5 21.25V3.25C14.5 2.65326 14.2629 2.08097 13.841 1.65901C13.419 1.23705 12.8467 1 12.25 1Z"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Comentários no modal */}
                  <div className="mt-4">
                    <h3 className="pb-6">Comentários</h3>
                    {post.comentarios?.length > 0 ? (
                      post.comentarios.map((comentario) => (
                        <ul key={comentario.id}>
                          <li className="flex items-center mb-4">
                            <img src={previewProfileImage} width="30" className="rounded-full mr-2" />
                            <p>
                              <b>{comentario.autor.nome}</b> - {comentario.conteudo}
                            </p>
                          </li>
                        </ul>
                      ))
                    ) : (
                      <p>Sem comentários.</p>
                    )}

                    <div className="mt-8 flex">
                      <img src={previewProfileImage} width="30" className="rounded-full mr-2" />
                      <input
                        type="text"
                        placeholder="Comentar"
                        className="bg-transparent"
                        value={comentarios[post.id] || ''}
                        onChange={(e) =>
                          setComentarios({ ...comentarios, [post.id]: e.target.value })
                        }
                      />
                    </div>

                    <div className="self-end flex items-center justify-end my-4">
                      <a
                        onClick={closePostModal}
                        className="popup__close text-red-500 mr-6 hover:cursor-pointer"
                      >
                        Cancelar
                      </a>
                      <button
                        className="bg-black cut-corner text-white flex py-2 px-4 hover:cursor-pointer"
                        // onClick={() => handleAddComment(post.id)}
                        onClick={(e) => {e.preventDefault(); handleAddComment(post.id);}}
                      >
                        <p className="mr-2" >Comentar</p>
                        <img src={needleIcon} alt="Comentar" />
                      </button>
                      <input type="submit" className="hidden"/>
                    </div>
                  </div>
                </div>
              </div>
            )}
          
            {showDeletePostModal && (
              <div>
                <span
                  className="w-[100vw] h-[100vh] fixed top-0 left-0 z-[5] bg-black bg-opacity-20"
                  onClick={handleCloseDeletePostModal}
                />
                <div className="fixed text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[30rem] py-8 px-4 flex flex-col bg-[#EDECE7] border border-black">
                  <h2 className="mb-4 text-xl">Quer mesmo deletar sua postagem?</h2>
                  <div className="flex justify-center pr-8">
                    <button className="mr-2" onClick={handleCloseDeletePostModal}>
                      <p className="text-red-500 underline-offset-1 hover:underline">Cancelar</p>
                    </button>
                    <button className="flex items-center ml-2 bg-black cut-corner text-white px-4 py-2" onClick={() => {
    handleDeletePost(post.id);
    handleCloseDeletePostModal();
  }}>
                      <p>Deletar</p>
                      <img className="ml-2" src={trashWhiteIcon} />
                    </button>  
                  </div>
                </div>
              </div>
              

            )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {/* <!-- Foto de perfil --> */}
                        <img src={previewProfileImage} className="mr-2 w-[30px] h-[30px] rounded-full"/>
                        <a onClick={() => window.location.href = `/${post.autor.nome}/Perfil`}
                        >
                          <p>@{post.autor.nome}</p>
                        </a>
                    </div>
                    <img src={cabideFeed} width="220" className="mr-[25%]" />
                    <button 
                        onClick={() => toggleMenu(post.id)}
                    >
                        {activeMenuId === post.id}
                        <img src={kebabMenu} width="5" id="kebab-menu" className=""/>
                    </button>
                   {/* <!-- Menu post --> */}
{activeMenuId === post.id && (
  <div id={`menu-${post.id}`} className="absolute z-5 ml-[22rem] mt-[20rem] border border-black bg-[#EDECE7] p-4">
    <ul>
      <li className="mb-4">
        <button className="flex items-center border-none bg-transparent">
          <img src={saveIcon} />
          <p className="ml-2 hover:underline">Salvar</p>
        </button>
      </li>
      <li className="mb-4">
        <button className="flex items-center border-none bg-transparent">
          <img src={clipIcon} />
          <p className="ml-2 hover:underline">Copiar link</p>
        </button>
      </li>

      {/* Botão "Deletar" apenas para o autor do post */}
      {post.autor.id === userId && (
        <li className="mb-4" onClick={handleOpenDeletePostModal}>
          <button className="flex items-center border-none bg-transparent">
            <img src={trashIcon} className="w-[1rem]" />
            <p className="ml-2 hover:underline">Deletar</p>
          </button>
        </li>
      )}

      <li className="mb-4">
        <button className="flex items-center border-none bg-transparent">
          <img src={userIcon} className="w-[1rem]" />
          <p className="ml-2 hover:underline">Visualizar perfil</p>
        </button>
      </li>
      <li className="mb-4">
        <button className="flex items-center border-none bg-transparent">
          <img src={muteIcon} />
          <p className="ml-2 hover:underline">
            Silenciar @{post.autor.nome}
          </p>
        </button>
      </li>
      <li className="mb-4">
        <button className="flex items-center border-none bg-transparent">
          <img src={blockIcon} />
          <p className="ml-2 hover:underline">Bloquear @{post.autor.nome}</p>
        </button>
      </li>
      <li>
        <button className="flex items-center border-none bg-transparent">
          <img src={redflagIcon} width="18" />
          <p className="ml-2 text-red-500 hover:underline">Denunciar publicação</p>
        </button>
      </li>
    </ul>
  </div>
)}

                </div>
                <div className=" w-[35rem] h-[35rem]">
                    <a onClick={() => openPostModal(post.id)} className="hover:cursor-pointer">
                    {post.foto && (
                      <>
                        {/* {console.log(`Imagem carregando: http://localhost:3000/uploads/${post.foto}`)} */}
                        <img src={`http://localhost:3000/uploads/${post.foto}`} alt="Postagem" className="w-[100%] h-[100%] object-cover"/>
                      </>
                    )}
                    </a>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <div className="flex justify-between">
                        <button>
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none" className="hover:fill-[#F9C62E] transition duration-300 ease-in-out mr-3" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.1721 11.7216L12.0102 21L2.84826 11.7216C2.24395 11.1203 1.76794 10.3976 1.45021 9.59892C1.13248 8.80027 0.979915 7.943 1.00212 7.08109C1.02432 6.21918 1.22081 5.37131 1.57922 4.59087C1.93763 3.81043 2.45019 3.11432 3.08462 2.54638C3.71905 1.97844 4.46162 1.55098 5.26555 1.2909C6.06949 1.03083 6.91738 0.943779 7.75583 1.03524C8.59429 1.12669 9.40514 1.39467 10.1373 1.82231C10.8695 2.24994 11.5072 2.82796 12.0102 3.51996C12.5153 2.83298 13.1538 2.26001 13.8854 1.83692C14.6171 1.41382 15.4263 1.14971 16.2624 1.06112C17.0985 0.972517 17.9435 1.06134 18.7445 1.32202C19.5455 1.5827 20.2853 2.00963 20.9175 2.57609C21.5497 3.14255 22.0607 3.83634 22.4186 4.61405C22.7766 5.39175 22.9736 6.23663 22.9975 7.0958C23.0214 7.95497 22.8716 8.80993 22.5575 9.60719C22.2434 10.4044 21.7718 11.1268 21.1721 11.7291" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <button 
                        // onClick="location.href='#modal1'"
                        >
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className=" mr-3" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0784 10.9967C12.0784 11.21 12.0152 11.4186 11.8967 11.5959C11.7782 11.7733 11.6098 11.9115 11.4127 11.9931C11.2156 12.0748 10.9988 12.0961 10.7896 12.0545C10.5804 12.0129 10.3883 11.9102 10.2374 11.7594C10.0866 11.6085 9.9839 11.4163 9.94229 11.2071C9.90068 10.9979 9.92204 10.7811 10.0037 10.584C10.0853 10.3869 10.2235 10.2185 10.4009 10.1C10.5782 9.98145 10.7867 9.91819 11 9.91819C11.286 9.91819 11.5603 10.0318 11.7626 10.2341C11.9648 10.4363 12.0784 10.7107 12.0784 10.9967ZM6.2549 9.91819C6.04161 9.91819 5.8331 9.98145 5.65576 10.1C5.47841 10.2185 5.34019 10.3869 5.25856 10.584C5.17694 10.7811 5.15558 10.9979 5.19719 11.2071C5.2388 11.4163 5.34151 11.6085 5.49234 11.7594C5.64316 11.9102 5.83532 12.0129 6.04451 12.0545C6.25371 12.0961 6.47054 12.0748 6.6676 11.9931C6.86466 11.9115 7.03309 11.7733 7.15159 11.5959C7.27008 11.4186 7.33333 11.21 7.33333 10.9967C7.33333 10.7107 7.21971 10.4363 7.01747 10.2341C6.81522 10.0318 6.54092 9.91819 6.2549 9.91819ZM15.7451 9.91819C15.5318 9.91819 15.3233 9.98145 15.146 10.1C14.9686 10.2185 14.8304 10.3869 14.7488 10.584C14.6671 10.7811 14.6458 10.9979 14.6874 11.2071C14.729 11.4163 14.8317 11.6085 14.9825 11.7594C15.1334 11.9102 15.3255 12.0129 15.5347 12.0545C15.7439 12.0961 15.9607 12.0748 16.1578 11.9931C16.3549 11.9115 16.5233 11.7733 16.6418 11.5959C16.7603 11.4186 16.8235 11.21 16.8235 10.9967C16.8235 10.7107 16.7099 10.4363 16.5077 10.2341C16.3054 10.0318 16.0311 9.91819 15.7451 9.91819ZM22 10.9967C22.0004 12.9038 21.5051 14.7782 20.5626 16.4361C19.6202 18.0939 18.263 19.4783 16.6242 20.4534C14.9854 21.4284 13.1213 21.9607 11.2147 21.9979C9.30819 22.0351 7.42473 21.5761 5.74912 20.6657L1.98863 21.919C1.72261 22.0077 1.43713 22.0206 1.16421 21.9561C0.891278 21.8917 0.641682 21.7526 0.443392 21.5543C0.245101 21.356 0.105954 21.1063 0.0415447 20.8334C-0.0228645 20.5604 -0.00998991 20.2749 0.0787256 20.0089L1.33186 16.2481C0.533027 14.7759 0.0808763 13.1407 0.00988664 11.4673C-0.0611031 9.79379 0.250943 8.12621 0.922232 6.59166C1.59352 5.05712 2.60632 3.69613 3.88342 2.61249C5.16051 1.52884 6.66816 0.751153 8.29142 0.338717C9.91468 -0.0737194 11.6107 -0.11001 13.2501 0.232611C14.8895 0.575233 16.429 1.28772 17.7513 2.31574C19.0736 3.34377 20.1437 4.66018 20.88 6.16461C21.6163 7.66903 21.9994 9.32174 22 10.9967ZM20.7059 10.9967C20.7055 9.50772 20.3627 8.03876 19.7038 6.7035C19.0449 5.36823 18.0877 4.20246 16.9062 3.29637C15.7248 2.39028 14.3507 1.76817 12.8903 1.47817C11.43 1.18817 9.92249 1.23805 8.4845 1.62396C7.0465 2.00987 5.71656 2.72146 4.59756 3.70367C3.47856 4.68588 2.60051 5.91238 2.03134 7.28828C1.46216 8.66418 1.21713 10.1526 1.31519 11.6384C1.41326 13.1241 1.85179 14.5674 2.59686 15.8566C2.64288 15.936 2.67149 16.0242 2.68079 16.1155C2.69009 16.2068 2.67986 16.2991 2.65078 16.3861L1.30706 20.4176C1.29439 20.4557 1.29255 20.4964 1.30175 20.5354C1.31095 20.5744 1.33083 20.6101 1.35915 20.6384C1.38748 20.6667 1.42314 20.6866 1.46213 20.6958C1.50112 20.705 1.5419 20.7032 1.5799 20.6905L5.60784 19.3467C5.67399 19.3249 5.74312 19.3136 5.81275 19.3132C5.92632 19.3139 6.03778 19.344 6.13627 19.4006C7.61186 20.2551 9.2865 20.7058 10.9916 20.7073C12.6967 20.7088 14.3722 20.261 15.8492 19.409C17.3263 18.557 18.5528 17.3309 19.4054 15.8541C20.258 14.3773 20.7066 12.702 20.7059 10.9967Z" fill="black"/>
                            </svg>
                        </button>
                        <button>
                            <svg width="16" height="22" viewBox="0 0 16 22" fill="none" className="hover:fill-black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.25 1H3.25C2.65326 1 2.08097 1.23705 1.65901 1.65901C1.23705 2.08097 1 2.65326 1 3.25V21.25L7.75 17.875L14.5 21.25V3.25C14.5 2.65326 14.2629 2.08097 13.841 1.65901C13.419 1.23705 12.8467 1 12.25 1Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                    
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="borda-btv bg-cover w-[7.6rem] h-[2.5rem] mr-2">
                            {/* <!-- Por enquanto manter até ~13carac. Vou ajeitar dps   --> */}
                            <p className="pt-[0.8rem] text-center pr-4">Old money</p>
                        </div>
                        <div className="borda-btv bg-cover w-[7.6rem] h-[2.5rem] mr-2">
                            {/* <!-- Por enquanto manter até ~13carac. Vou ajeitar dps   --> */}
                            <p className="pt-[0.8rem] text-center pr-4">Old money</p>
                        </div>
                        <div className="borda-btv bg-cover w-[7.6rem] h-[2.5rem]">
                            {/* <!-- Por enquanto manter até ~13carac. Vou ajeitar dps   --> */}
                            <p className="pt-[0.8rem] text-center pr-4">Old money</p>
                        </div>
                        
                    </div>
                </div>
                <div className="pt-2">
                    <p>
                        {/* <!-- USERNAME DO USUÁRIO --> */}
                        <b>{post.autor.nome}</b> - {post.conteudo}
                    </p>
                </div>
                </section>
        </div>
      ))}
        

    </main>
    <aside className="w-[30%] bg-[#EDECE7] min-h-[100vh] flex flex-col items-center fixed right-0 pt-12 z-1">
        <div className="flex flex-col items-center w-[22rem]">
            <p>
                Confira algumas ideias nos seus estilos favoritos:
            </p>
            <ul className="flex text-lg mt-2 flex-wrap">
  {estilos.length > 0 ? (
    estilos.map((estilo) => (
      <div
        key={estilo.estiloId} // Mova a key para o div
        className="bg-cover w-[9rem] h-[3rem] mr-2"
        style={{
          backgroundImage: `url(${bordaBtv})`,
        }}
      >
        <li className=" flex justify-center pr-4 pt-4">
          {estilo.nome}
        </li>
      </div>
    ))
  ) : (
    <li className="text-gray-500">Carregando estilos... Ou você ainda não possui nenhum estilo.</li>
  )}
</ul>
            <button className="hover:underline">
                ver mais +
            </button>
        </div>
        <div className="flex flex-col items-center text-left mt-12">
            <p className="w-[150%]">
                Sugestões de perfis para você:
            </p>
            <ul className="flex flex-col w-[150%] mt-2">
                <li className="w-full flex justify-between items-center py-2">
                    <a className="flex items-center hover:underline hover:cursor-pointer">
                        <img src={previewProfileImage} width="30"  className="rounded-full mr-2" />
                        <p>Iraikare Rodrigues</p>
                    </a>
                    <button className="hover:underline">
                        Seguir
                    </button>
                </li>
                <li className="w-full flex justify-between items-center py-2">
                    <a className="flex items-center hover:underline hover:cursor-pointer">
                        <img src={previewProfileImage} width="30"  className="rounded-full mr-2" />
                        <p>Iraikare Rodrigues</p>
                    </a>
                    <button className="hover:underline">
                        Seguir
                    </button>
                </li>
                <li className="w-full flex justify-between items-center py-2">
                    <a className="flex items-center hover:underline hover:cursor-pointer">
                        <img src={previewProfileImage} width="30"  className="rounded-full mr-2" />
                        <p>Iraikare Rodrigues</p>
                    </a>
                    <button className="hover:underline">
                        Seguir
                    </button>
                </li>
                <li className="w-full flex justify-between items-center py-2">
                    <a className="flex items-center hover:underline hover:cursor-pointer">
                        <img src={previewProfileImage} width="30"  className="rounded-full mr-2" />
                        <p>Iraikare Rodrigues</p>
                    </a>
                    <button className="hover:underline">
                        Seguir
                    </button>
                </li>
            </ul>
        </div>
    </aside>
</body>
    </div>
  );
};

export default Feed;
