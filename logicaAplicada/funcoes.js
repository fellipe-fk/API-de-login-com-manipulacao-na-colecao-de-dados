import baseDadosUsuarios from "../dados/dados.js";

//retorna toda a lista de dados
export const retornaListaDados = () => baseDadosUsuarios;

// busca o id dos usuario
export const buscausuariosId  = (id) => {
    const filtraId = parseInt(id);
    const Id = baseDadosUsuarios.find(item => item.id === filtraId);
    return Id;
};

//cadastra novos usuarios
export const cadatraUsuario = (nome, senha) => {
    const novoId = baseDadosUsuarios.reduce((maxId, usuario) => {
        return usuario.id > maxId ? usuario.id : maxId;
    }, 0);

    const novoUsuario = {
        id: novoId + 1,
        nome:nome,
        senha:senha,
    };

    baseDadosUsuarios.push(novoUsuario);
    return novoUsuario;
};

//atualizar todos os usuarios
export const atualizarUsuarioBaseDados = (id, nome, senha) => {
    const usuarioIndex = baseDadosUsuarios.findIndex(item => item.id === id);
  
    if (usuarioIndex !== -1) {
      baseDadosUsuarios[usuarioIndex].nome = nome;
      baseDadosUsuarios[usuarioIndex].senha = senha;
      return baseDadosUsuarios[usuarioIndex];
    } else {
      return false;
    };
};

//atualiza um dado do usuario por vez  
export const atualizarUmdadosBaseDados = (id, nome, senha) => {
    const usuario = baseDadosUsuarios.find(item => item.id === id);

    if (!usuario) {
        return false;
    }

    if (nome) {
        usuario.nome = nome;
    }

    if (senha) {
        usuario.senha = senha;
    }

    return usuario;
};

// remover usuarios da lista
export const removeUsuarios = (id) => {
    const Id = parseInt(id)
    const removerId = baseDadosUsuarios.findIndex(item => item.id === Id);

    if(removerId !== -1){
        const remove = baseDadosUsuarios.splice(removerId, 1);
        return remove;
    };
};