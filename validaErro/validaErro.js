export const validarCamposNomeSenha = (nome, senha) => {
    const erros = {};
  
    if (!nome || nome === '') {
      erros.nome = 'O campo nome é obrigatório';
    }
  
    if (!senha || senha === '') {
      erros.senha = 'O campo senha é obrigatório';
    }
  
    return erros;
};