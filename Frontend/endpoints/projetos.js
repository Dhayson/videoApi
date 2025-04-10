import { getSessionId, setSessionId, efetuarLogin } from "./login.js";
import { isNode } from "./isNode.mjs";

async function criarProjeto(nome, url_proj, descricao) {
  const url = "http://localhost:8080/api/v1/projetos/criar";

  const session_id = getSessionId();
  const headers = {
    chaveSessao: session_id,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    nome: nome,
    descricao: descricao,
    urlVideo: url_proj,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro ao criar projeto:", errorText);
      return { sucesso: false, erro: errorText };
    }

    const responseText = await response.text();
    console.log("Projeto criado:", responseText);
    const idMatch = responseText.match(/ID: ([a-f0-9-]+)/);
    const projetoId = idMatch ? idMatch[1] : null;
    return { sucesso: true, mensagem: responseText, id: projetoId };
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de criação de projeto:",
      error
    );
    return {
      sucesso: false,
      erro: error.message || "Erro desconhecido ao criar projeto.",
    };
  }
}

var id_projeto_1;
var id_projeto_2;

// Função para testar a função criarProjeto
async function testarCriarProjeto() {
  const usuarioTeste = "joao.silva3@example.com"; // Substitua por um usuário existente para teste
  const senhaTeste = "senha123"; // Substitua pela senha correta do usuário
  const resultadoLoginSucesso = await efetuarLogin(usuarioTeste, senhaTeste);
  setSessionId(resultadoLoginSucesso.data);

  const nomeProjetoTeste = "Projeto de Teste JavaScript";
  const descricaoProjetoTeste =
    "Este é um projeto criado via teste em JavaScript.";

  console.log("\nIniciando teste de criação de projeto...");
  const resultadoCriacao = await criarProjeto(
    nomeProjetoTeste,
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    descricaoProjetoTeste
  );

  if (resultadoCriacao.sucesso) {
    console.log("Teste de criação de projeto bem-sucedido!");
    console.log("Mensagem:", resultadoCriacao.mensagem);
    if (resultadoCriacao.id) {
      console.log("ID do Projeto Criado:", resultadoCriacao.id);
      id_projeto_1 = resultadoCriacao.id;
    }
  } else {
    getSessionId();
    console.error("Teste de criação de projeto falhou!");
    console.error("Detalhes do erro:", resultadoCriacao.erro);
  }

  // Outro teste com dados diferentes (opcional)
  console.log("\nIniciando outro teste de criação de projeto...");
  const resultadoCriacao2 = await criarProjeto(
    "Outro Projeto",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "Uma descrição diferente."
  );

  if (resultadoCriacao2.sucesso) {
    console.log("Teste de criação de projeto bem-sucedido!");
    console.log("Mensagem:", resultadoCriacao2.mensagem);
    if (resultadoCriacao2.id) {
      console.log("ID do Projeto Criado:", resultadoCriacao2.id);
      id_projeto_2 = resultadoCriacao2.id;
    }
  } else {
    console.error("Teste de criação de projeto falhou!");
    console.error("Detalhes do erro:", resultadoCriacao2.erro);
  }
}

async function deletarProjeto(projetoId) {
  const chaveSessao = getSessionId();
  const url = `http://localhost:8080/api/v1/projetos/${projetoId}`;
  const headers = {
    chaveSessao: chaveSessao,
  };

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro ao deletar projeto com ID ${projetoId}:`, errorText);
      return { sucesso: false, erro: errorText };
    }

    const responseText = await response.text();
    console.log(`Projeto com ID ${projetoId} deletado:`, responseText);
    return { sucesso: true, mensagem: responseText };
  } catch (error) {
    console.error(
      `Erro ao realizar a requisição de exclusão do projeto com ID ${projetoId}:`,
      error
    );
    return {
      sucesso: false,
      erro:
        error.message ||
        `Erro desconhecido ao deletar projeto com ID ${projetoId}.`,
    };
  }
}

// Função para testar a função deletarProjeto
async function testarDeletarProjeto() {
  // Substitua por um ID de projeto existente que você deseja deletar (com cautela!)
  const projetoIdParaDeletar = id_projeto_2;

  console.warn(
    `\nIniciando teste de exclusão do projeto com ID: ${projetoIdParaDeletar}`
  );

  const resultadoDelecao = await deletarProjeto(projetoIdParaDeletar);

  if (resultadoDelecao.sucesso) {
    console.log("Teste de exclusão de projeto bem-sucedido!");
    console.log("Mensagem:", resultadoDelecao.mensagem);
  } else {
    console.error("Teste de exclusão de projeto falhou!");
    console.error("Detalhes do erro:", resultadoDelecao.erro);
  }

  // Tentativa de deletar um ID inexistente (opcional, para testar o tratamento de erro)
  const projetoIdInexistente = "456";
  console.log(
    `\nTentando deletar projeto com ID inexistente: ${projetoIdInexistente}`
  );
  const resultadoDelecaoInexistente = await deletarProjeto(
    projetoIdInexistente
  );

  if (resultadoDelecaoInexistente.sucesso) {
    console.warn(
      "Teste de exclusão de projeto inexistente inesperadamente bem-sucedido!"
    );
    console.log("Mensagem:", resultadoDelecaoInexistente.mensagem);
  } else {
    console.log(
      "Teste de exclusão de projeto inexistente falhou conforme esperado."
    );
    console.error("Detalhes do erro:", resultadoDelecaoInexistente.erro);
  }
}

async function listarProjetosDoUsuario() {
  const chaveSessao = getSessionId();
  const url = "http://localhost:8080/api/v1/projetos/get";
  const headers = {
    chaveSessao: chaveSessao,
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao listar projetos:", errorData);
      return { sucesso: false, erro: errorData };
    }

    const projetos = await response.json();
    console.log("Projetos do usuário:", projetos);
    return { sucesso: true, data: projetos };
  } catch (error) {
    console.error("Erro ao realizar a requisição para listar projetos:", error);
    return {
      sucesso: false,
      erro: { message: "Erro ao realizar a requisição para listar projetos." },
    };
  }
}

// Função para testar a função listarProjetosDoUsuario
async function testarListarProjetos() {
  console.log("\nIniciando teste de listagem de projetos...");
  const resultadoListagem = await listarProjetosDoUsuario();

  if (resultadoListagem.sucesso) {
    console.log("Teste de listagem de projetos bem-sucedido!");
    if (resultadoListagem.data && Array.isArray(resultadoListagem.data)) {
      if (resultadoListagem.data.length > 0) {
        // console.log("Projetos encontrados:");
        // resultadoListagem.data.forEach((projeto) => {
        //   console.log(`- ID: ${projeto.id}`);
        //   console.log(`  Nome: ${projeto.nome}`);
        //   console.log(`  Descrição: ${projeto.descricao}`);
        //   console.log(`  Criado por: ${projeto.nomeUsuario}`);
        // });
      } else {
        console.log("Nenhum projeto encontrado para esta chave de sessão.");
      }
    } else {
      console.warn(
        "Resposta de listagem de projetos em formato inesperado:",
        resultadoListagem.data
      );
    }
  } else {
    console.error("Teste de listagem de projetos falhou!");
    console.error("Detalhes do erro:", resultadoListagem.erro);
  }
}

async function editarProjeto(projetoId, nome, descricao, urlVideo) {
  const chaveSessao = getSessionId();
  const url = `http://localhost:8080/api/v1/projetos/${projetoId}`;
  const headers = {
    chaveSessao: chaveSessao,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    nome: nome,
    descricao: descricao,
    urlVideo: urlVideo,
  });

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro ao editar projeto com ID ${projetoId}:`, errorText);
      return { sucesso: false, erro: errorText };
    }

    const responseText = await response.text();
    console.log(`Projeto com ID ${projetoId} atualizado:`, responseText);
    return { sucesso: true, mensagem: responseText };
  } catch (error) {
    console.error(
      `Erro ao realizar a requisição de edição do projeto com ID ${projetoId}:`,
      error
    );
    return {
      sucesso: false,
      erro:
        error.message ||
        `Erro desconhecido ao editar projeto com ID ${projetoId}.`,
    };
  }
}

// Função para testar a função editarProjeto
async function testarEditarProjeto() {
  // Substitua pelo ID de um projeto existente que você deseja editar
  const projetoIdParaEditar = id_projeto_1;
  const novoNomeProjeto = "Projeto Editado via Teste";
  const novaDescricaoProjeto = "Esta é a nova descrição do projeto editado.";

  console.log(
    `\nIniciando teste de edição do projeto com ID: ${projetoIdParaEditar}`
  );
  const resultadoEdicao = await editarProjeto(
    projetoIdParaEditar,
    novoNomeProjeto,
    novaDescricaoProjeto,
    "Exemplo de url"
  );

  if (resultadoEdicao.sucesso) {
    console.log("Teste de edição de projeto bem-sucedido!");
    console.log("Mensagem:", resultadoEdicao.mensagem);
  } else {
    console.error("Teste de edição de projeto falhou!");
    console.error("Detalhes do erro:", resultadoEdicao.erro);
  }

  // Tentativa de editar um ID inexistente (opcional, para testar o tratamento de erro)
  const projetoIdInexistente = "456";
  const nomeInexistente = "Projeto Inexistente";
  const descricaoInexistente = "Tentando editar algo que não existe.";
  console.log(
    `\nTentando editar projeto com ID inexistente: ${projetoIdInexistente}`
  );
  const resultadoEdicaoInexistente = await editarProjeto(
    projetoIdInexistente,
    nomeInexistente,
    descricaoInexistente,
    "exemplo de url"
  );

  if (resultadoEdicaoInexistente.sucesso) {
    console.log(
      "Teste de edição de projeto inexistente inesperadamente bem-sucedido!"
    );
    console.log("Mensagem:", resultadoEdicaoInexistente.mensagem);
  } else {
    console.log(
      "Teste de edição de projeto inexistente falhou conforme esperado."
    );
    console.error("Detalhes do erro:", resultadoEdicaoInexistente.erro);
  }
}

async function projectInfo(idProj) {
  const url = `http://localhost:8080/api/v1/projetos/getProjeto/${encodeURIComponent(
    idProj
  )}`;
  const chaveSessao = getSessionId();
  const headers = {
    chaveSessao: chaveSessao,
    "Content-Type": "application/json",
  };
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Erro ao recuperar dados:", errorData);
      return { sucesso: false, erro: errorData };
    }

    const responseData = await response.json();
    console.log("Dados do usuário:", responseData);
    return { sucesso: true, data: responseData };
  } catch (error) {
    console.error("Erro ao realizar a requisição de dados:", error);
    return {
      sucesso: false,
      erro: { message: "Erro ao realizar a requisição de dados." },
    };
  }
}

if (isNode()) {
  // // Chamar a função de teste para executar a criação de projeto
  await testarCriarProjeto();
  // // Chamar a função de teste para executar a deleção de projeto
  await testarDeletarProjeto();
  // // Chamar a função de teste para executar a listagem de projetos
  await testarListarProjetos();
  // // Chamar a função de teste para executar a edição de projeto
  await testarEditarProjeto();
}

export {
  criarProjeto,
  editarProjeto,
  listarProjetosDoUsuario,
  deletarProjeto,
  projectInfo,
};
