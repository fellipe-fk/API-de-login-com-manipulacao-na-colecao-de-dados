import express from 'express';
import { retornaListaDados, buscausuariosId, cadatraUsuario, atualizarUsuarioBaseDados,atualizarUmdadosBaseDados,removeUsuarios } from './logicaAplicada/funcoes.js';
import { validarCamposNomeSenha } from './validaErro/validaErro.js';
const app = express();
const port = 3000;
app.use(express.json());

// retorna um id especifico
app.get('/login/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if(isNaN(id)){
        res.status(404).json({erro: 'Id invalido'});
    }

    const retornId = buscausuariosId(id);
    if(retornId){
        res.json(retornId);
    }else{
        res.status(404).json({erro: 'Id nao encontrado'});
    };
});

//cadastra novo usuario
app.post('/login', (req, res) => {
    const nome = req.body.nome;
    const senha = req.body.senha;
    const erros = validarCamposNomeSenha(nome, senha);

    if (Object.keys(erros).length > 0) {
        res.status(400).json(erros);
      }else{
        const usuario = cadatraUsuario(nome, senha);

        res.json(usuario);
      }
});

//atualiza todos os dados usuario
app.put('/login/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome;
    const senha = req.body.senha;

    const erros = validarCamposNomeSenha(nome, senha);
    
    if (Object.keys(erros).length > 0) {
        res.status(400).json(erros);
      };
    
    if (isNaN(id)) {
      return res.status(404).json({ erro: 'Id inválido' });
    };
  
    const atualizadoComSucesso = atualizarUsuarioBaseDados(id, nome, senha);
  
    if (atualizadoComSucesso) {
      res.json(atualizadoComSucesso);
    } else {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    };
});

//atualiza um dado especifico do usuario
app.patch('/login/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {nome, senha} = req.body;

    
    if (isNaN(id)) {
      return res.status(404).json({ erro: 'Id inválido' });
    };

    if((nome && senha )||(!nome && !senha)){
      res.status(400).json({erro:"Escolha nome ou senha para atualizar"});
    };

    const atualizarUsuario = atualizarUmdadosBaseDados(id,nome,senha)

    if (atualizarUsuario) {
      res.json(atualizarUsuario);
    } else {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    };
});

//remover usuario da lista

app.delete('/login/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if(isNaN(id)){
    res.status(404).json({erro: 'Id invalido'});
  };

  const remove = removeUsuarios(id);
  if(remove){
    res.json({mensagem:`Usuário com ID ${id} foi excluído` });
  }else{
    res.status(404).json({erro: 'Id nao encontrado'});
  }
});


// retorna toda a lista
app.get('/login', (req, res) => {
    const lista = retornaListaDados();
    res.json(lista);
});

app.listen(port, () => {
    console.log('API login inicializada..')
});