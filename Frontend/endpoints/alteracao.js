import { getSessionId, setSessionId, efetuarLogin } from "./login.js";
import { criarProjeto } from "./projetos.js";
import { isNode } from "./isNode.mjs";

var id_alteracao_1;
var id_projeto;

async function criarAlteracao(projetoId, timestamp, descricao) {
  const chaveSessao = getSessionId();
  const url = "http://198.74.53.107:8080/api/v1/alteracoes/criar";
  const headers = {
    chaveSessao: chaveSessao,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    projetoId: projetoId,
    taskId: null,
    timestamp: timestamp,
    descricao: descricao,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro ao criar alteração:", errorText);
      return { sucesso: false, erro: errorText };
    }

    const responseText = await response.text();
    console.log("Alteração criada:", responseText);
    const idMatch = responseText.match(/ID: ([a-f0-9-]+)/); // Supondo que a resposta de sucesso também inclua um ID
    const alteracaoId = idMatch ? idMatch[1] : null;
    return { sucesso: true, mensagem: responseText, id: alteracaoId };
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de criação de alteração:",
      error
    );
    return {
      sucesso: false,
      erro: error.message || "Erro desconhecido ao criar alteração.",
    };
  }
}

// Função para testar a função criarAlteracao
async function testarCriarAlteracao() {
  const usuarioTeste = "joao.silva3@example.com"; // Substitua por um usuário existente para teste
  const senhaTeste = "senha123"; // Substitua pela senha correta do usuário
  const resultadoLoginSucesso = await efetuarLogin(usuarioTeste, senhaTeste);
  setSessionId(resultadoLoginSucesso.data);

  const nomeProjetoTeste = "Projeto de Teste JavaScript";
  const descricaoProjetoTeste =
    "Este é um projeto criado via teste em JavaScript.";
  const projeto = await criarProjeto(nomeProjetoTeste, descricaoProjetoTeste);
  // Substitua por um ID de projeto existente ao qual a task será associada
  console.log("Usando projeto", projeto);
  const projetoIdTeste = projeto.id;
  id_projeto = projetoIdTeste;

  const timestamp = 55;
  const descricaoAlteracaoTeste = "Adicionada nova seção ao documento.";

  console.log("\nIniciando teste de criação de alteração...");
  const resultadoCriacao = await criarAlteracao(
    projetoIdTeste,
    timestamp,
    descricaoAlteracaoTeste
  );

  if (resultadoCriacao.sucesso) {
    console.log("Teste de criação de alteração bem-sucedido!");
    console.log("Mensagem:", resultadoCriacao.mensagem);
    if (resultadoCriacao.id) {
      console.log("ID da Alteração Criada:", resultadoCriacao.id);
      id_alteracao_1 = resultadoCriacao.id;
    }
  } else {
    console.error("Teste de criação de alteração falhou!");
    console.error("Detalhes do erro:", resultadoCriacao.erro);
  }

  // Outro teste com dados diferentes (opcional)
  const outraDescricaoAlteracao = "Correção de um erro de digitação.";
  console.log("\nIniciando outro teste de criação de alteração...");
  const resultadoCriacao2 = await criarAlteracao(
    projetoIdTeste,
    timestamp,
    outraDescricaoAlteracao
  );

  if (resultadoCriacao2.sucesso) {
    console.log("Teste de criação de outra alteração bem-sucedido!");
    console.log("Mensagem:", resultadoCriacao2.mensagem);
    if (resultadoCriacao2.id) {
      console.log("ID da Outra Alteração Criada:", resultadoCriacao2.id);
    }
  } else {
    console.error("Teste de criação de outra alteração falhou!");
    console.error("Detalhes do erro:", resultadoCriacao2.erro);
  }

  // Terceiro teste com dados diferentes (opcional)
  const DescricaoAlteracao3 = "Correção de um erro de grafia.";
  console.log("\nIniciando outro teste de criação de alteração...");
  const resultadoCriacao3 = await criarAlteracao(
    projetoIdTeste,
    100,
    DescricaoAlteracao3
  );

  if (resultadoCriacao3.sucesso) {
    console.log("Teste de criação de outra alteração bem-sucedido!");
    console.log("Mensagem:", resultadoCriacao3.mensagem);
    if (resultadoCriacao3.id) {
      console.log("ID da Outra Alteração Criada:", resultadoCriacao3.id);
    }
  } else {
    console.error("Teste de criação de outra alteração falhou!");
    console.error("Detalhes do erro:", resultadoCriacao3.erro);
  }

  // Teste com IDs de projeto/task inexistentes (opcional, para testar o tratamento de erro)
  const projetoIdInexistente = "456";
  const taskIdInexistente = 789;
  const descricaoInexistente = "Alteração para algo que não existe.";

  console.log("\nTentando criar alteração para projeto/task inexistentes...");
  const resultadoCriacaoInexistente = await criarAlteracao(
    projetoIdInexistente,
    0,
    descricaoInexistente
  );

  if (resultadoCriacaoInexistente.sucesso) {
    console.warn(
      "Teste de criação de alteração para projeto/task inexistentes inesperadamente bem-sucedido!"
    );
    console.log("Mensagem:", resultadoCriacaoInexistente.mensagem);
  } else {
    console.log(
      "Teste de criação de alteração para projeto/task inexistentes falhou conforme esperado."
    );
    console.error("Detalhes do erro:", resultadoCriacaoInexistente.erro);
  }
}

async function deletarAlteracao(alteracaoId) {
  const chaveSessao = getSessionId();
  const url = `http://198.74.53.107:8080/api/v1/alteracoes/${alteracaoId}`;
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
      console.error(
        `Erro ao deletar alteração com ID ${alteracaoId}:`,
        errorText
      );
      return { sucesso: false, erro: errorText };
    }

    const responseText = await response.text();
    console.log(`Alteração com ID ${alteracaoId} deletada:`, responseText);
    return { sucesso: true, mensagem: responseText };
  } catch (error) {
    console.error(
      `Erro ao realizar a requisição de exclusão da alteração com ID ${alteracaoId}:`,
      error
    );
    return {
      sucesso: false,
      erro:
        error.message ||
        `Erro desconhecido ao deletar alteração com ID ${alteracaoId}.`,
    };
  }
}

// Função para testar a função deletarAlteracao
async function testarDeletarAlteracao() {
  // Substitua por um ID de alteração existente que você deseja deletar (com cautela!)
  const alteracaoIdParaDeletar = id_alteracao_1;

  console.warn(
    `\nIniciando teste de exclusão da alteração com ID: ${alteracaoIdParaDeletar}`
  );

  const resultadoDelecao = await deletarAlteracao(alteracaoIdParaDeletar);

  if (resultadoDelecao.sucesso) {
    console.log("Teste de exclusão de alteração bem-sucedido!");
    console.log("Mensagem:", resultadoDelecao.mensagem);
  } else {
    console.error("Teste de exclusão de alteração falhou!");
    console.error("Detalhes do erro:", resultadoDelecao.erro);
  }

  // Tentativa de deletar um ID inexistente (opcional, para testar o tratamento de erro)
  const alteracaoIdInexistente = "abcdefg";
  console.log(
    `\nTentando deletar alteração com ID inexistente: ${alteracaoIdInexistente}`
  );
  const resultadoDelecaoInexistente = await deletarAlteracao(
    alteracaoIdInexistente
  );

  if (resultadoDelecaoInexistente.sucesso) {
    console.warn(
      "Teste de exclusão de alteração inexistente inesperadamente bem-sucedido!"
    );
    console.log("Mensagem:", resultadoDelecaoInexistente.mensagem);
  } else {
    console.log(
      "Teste de exclusão de alteração inexistente falhou conforme esperado."
    );
    console.error("Detalhes do erro:", resultadoDelecaoInexistente.erro);
  }
}

async function listarAlteracoesPorProjeto(projetoId) {
  const chaveSessao = await getSessionId();
  const url = `http://198.74.53.107:8080/api/v1/alteracoes/projeto/${projetoId}`;
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
      console.error(
        `Erro ao listar alterações do projeto ${projetoId}:`,
        errorData
      );
      return { sucesso: false, erro: errorData };
    }

    const Resposta = await response.json();
    console.log(`Resposta recebida:`, Resposta);
    const alteracoes = Resposta;
    console.log(`Alterações do projeto ${projetoId}:`, alteracoes);
    return { sucesso: true, data: alteracoes };
  } catch (error) {
    console.error(
      `Erro ao realizar a requisição para listar alterações do projeto ${projetoId}:`,
      error
    );
    return {
      sucesso: false,
      erro: {
        message: `Erro ao realizar a requisição para listar alterações do projeto ${projetoId}.`,
      },
    };
  }
}

// Função para testar a função listarAlteracoesPorProjeto
async function testarListarAlteracoesPorProjeto() {
  // Substitua pelo ID de um projeto existente para o qual você deseja listar as alterações
  const projetoIdTeste = id_projeto;
  // Substitua por um ID de projeto inexistente (opcional, para testar o tratamento de erro)
  const projetoIdInexistente = "abdfegdh";

  console.log(
    `\nIniciando teste de listagem de alterações para o projeto com ID: ${projetoIdTeste}`
  );
  const resultadoListagem = await listarAlteracoesPorProjeto(projetoIdTeste);

  if (resultadoListagem.sucesso) {
    console.log("Teste de listagem de alterações bem-sucedido!");
    if (resultadoListagem.data && Array.isArray(resultadoListagem.data)) {
      if (resultadoListagem.data.length > 0) {
      } else {
        console.log(
          `Nenhuma alteração encontrada para o projeto com ID ${projetoIdTeste}.`
        );
      }
    } else {
      console.warn(
        "Resposta de listagem de alterações em formato inesperado:",
        resultadoListagem.data
      );
    }
  } else {
    console.error("Teste de listagem de alterações falhou!");
    console.error("Detalhes do erro:", resultadoListagem.erro);
  }

  // Teste com um projeto ID inexistente (opcional)
  console.log(
    `\nIniciando teste de listagem de alterações para projeto inexistente com ID: ${projetoIdInexistente}`
  );
  const resultadoListagemInexistente = await listarAlteracoesPorProjeto(
    projetoIdInexistente
  );

  if (resultadoListagemInexistente.sucesso) {
    console.warn(
      "Teste de listagem de alterações para projeto inexistente inesperadamente bem-sucedido!"
    );
    console.log("Dados:", resultadoListagemInexistente.data);
  } else {
    console.log(
      "Teste de listagem de alterações para projeto inexistente falhou conforme esperado."
    );
    console.error("Detalhes do erro:", resultadoListagemInexistente.erro);
  }
}

async function atualizarAlteracao(
  projetoId,
  alteracaoId,
  timestamp,
  descricao
) {
  const chaveSessao = getSessionId();
  const url = `http://198.74.53.107:8080/api/v1/alteracoes/${alteracaoId}`;
  const headers = {
    chaveSessao: chaveSessao,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    projetoId: projetoId,
    taskId: null,
    timestamp: timestamp,
    descricao: descricao,
  });

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro ao atualizar alteração:", errorText);
      return { sucesso: false, erro: errorText };
    }

    const responseText = await response.text();
    console.log("Alteração atualizada:", responseText);
    const idMatch = responseText.match(/ID: ([a-f0-9-]+)/); // Supondo que a resposta de sucesso também inclua um ID
    const alteracaoId = idMatch ? idMatch[1] : null;
    return { sucesso: true, mensagem: responseText, id: alteracaoId };
  } catch (error) {
    console.error(
      "Erro ao realizar a requisição de atualização de alteração:",
      error
    );
    return {
      sucesso: false,
      erro: error.message || "Erro desconhecido ao atualizar alteração.",
    };
  }
}

export {
  criarAlteracao,
  listarAlteracoesPorProjeto,
  deletarAlteracao,
  atualizarAlteracao,
};

// // // Descomente isso para testar com o node

if (isNode()) {
  // Chamar a função de teste para executar a criação de alteração
  await testarCriarAlteracao();

  // Chamar a função de teste para executar a deleção de alteração
  await testarDeletarAlteracao();

  // Chamar a função de teste para executar a listagem de alterações por projeto
  await testarListarAlteracoesPorProjeto();
}
