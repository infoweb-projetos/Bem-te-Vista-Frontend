import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  nome: string;
}

interface Comentario {
  id: string;
  conteudo: string;
}

interface Post {
  id: string;
  descricao: string;
  imagem?: string;
  estilos?: string[];
  autor: User;
  comentarios: Comentario[];
}

const Feed: React.FC = () => {
  const [postagens, setPostagens] = useState<Post[]>([]);
  const [comentarios, setComentarios] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState<{ descricao: string; imagem: File | null; estilos: string[] }>({
    descricao: '',
    imagem: null,
    estilos: [],
  });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchPostagens();
  }, []);

  const baseUrl = 'http://localhost:3000/postagens';
  const token = localStorage.getItem('token'); // Substitua com a chave correta do seu token

  const handleCreatePost = async () => {
    if (!newPost.descricao.trim()) {
      alert('A descrição é obrigatória!');
      return;
    }

    if (!token) {
      console.error('Token não encontrado. O usuário deve estar autenticado.');
      return;
    }

    const formData = new FormData();
    formData.append('conteudo', newPost.descricao); // Corrija o nome do campo
    if (newPost.imagem) {
      formData.append('imagem', newPost.imagem); // Nome do campo deve ser 'imagem'
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
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    }
  };

  const fetchPostagens = async () => {
    try {
      const response = await axios.get(baseUrl, {
        headers: {
          'Authorization': `Bearer ${token}`, // Adicione o token ao header da requisição
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
    formData.append('conteudo', selectedPost.descricao);
    if (selectedPost.imagem) {
      formData.append('imagem', selectedPost.imagem); // Certifique-se de que a imagem está sendo atualizada corretamente
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
    } catch (error) {
      console.error('Erro ao salvar a postagem:', error);
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
      const userId = localStorage.getItem('userId'); // Certifique-se de que o userId está salvo no localStorage
      if (!userId) {
        console.error('ID do usuário não encontrado.');
        console.log('User ID:', userId);
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

  return (
    <div className="postagens-page">
      <h1>Postagens</h1>
      <button onClick={openModal}>Criar Postagem</button>

      {/* Modal para criar/editar postagem */}
      {showModal && (
        <div className="modal">
          <h2>Criar Postagem</h2>
          <textarea
            placeholder="Escreva sua descrição"
            value={newPost.descricao}
            onChange={(e) => setNewPost({ ...newPost, descricao: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) => setNewPost({ ...newPost, imagem: e.target.files ? e.target.files[0] : null })}
          />

          <button onClick={handleCreatePost}>Publicar</button>
          <button onClick={closeModal}>Fechar</button>
        </div>
      )}

      {/* Listagem de postagens */}
      {postagens.map((post: Post) => (
        <div key={post.id} className="post">
          <h2>{post.descricao}</h2>
          <div>
            <span className="user-name" onClick={() => window.location.href = `/${post.autor.id}/MeuPerfil`}>
              {post.autor?.nome || 'Usuário anônimo'}
            </span>
            {post.imagem && (
              <>
                {console.log(`Imagem carregando: http://localhost:3000/uploads/${post.imagem}`)}
                <img src={`http://localhost:3000/uploads/${post.imagem}`} alt="Postagem" style={{ maxWidth: '100%', height: 'auto' }} />
              </>
            )}
          </div>
          <div>
            <button onClick={() => handleDeletePost(post.id)}>Deletar</button>
            <button onClick={() => setSelectedPost(post)}>Editar</button>
          </div>

          {/* Listagem de comentários */}
          <div>
            <h3>Comentários</h3>
            {post.comentarios?.length > 0 ? (
              post.comentarios.map((comentario: Comentario) => (
                <p key={comentario.id}>{comentario.conteudo}</p>
              ))
            ) : (
              <p>Sem comentários.</p>
            )}
            <input
              type="text"
              placeholder="Comentar"
              value={comentarios[post.id] || ''}
              onChange={(e) => setComentarios({ ...comentarios, [post.id]: e.target.value })}
            />
            <button onClick={() => handleAddComment(post.id)}>Comentar</button>
          </div>
        </div>
      ))}

      {/* Modal para editar postagem */}
      {selectedPost && (
        <div className="modal">
          <h2>Editar Postagem</h2>
          <textarea
            value={selectedPost.descricao}
            onChange={(e) => setSelectedPost({ ...selectedPost, descricao: e.target.value })}
          />
          <button onClick={handleSave}>Salvar</button>
          <button onClick={() => setSelectedPost(null)}>Fechar</button>
        </div>
      )}
    </div>
  );
};

export default Feed;
