import { getSessionId, setSessionId, efetuarLogin } from "./login.js";
import { criarProjeto } from "./projetos.js";

async function criarAlteracao(projetoId, timestamp, descricao) {
  const chaveSessao = getSessionId();
  const url = "http://198.74.53.107:8080/api/v1/alteracoes/criar";
  const headers = {
    chaveSessao: chaveSessao,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    projetoId: projetoId,
    // timestamp: timestamp,
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
  const nomeProjetoTeste = "Projeto de Teste JavaScript";
  const descricaoProjetoTeste =
    "Este é um projeto criado via teste em JavaScript.";
  const projeto = await criarProjeto(nomeProjetoTeste, descricaoProjetoTeste);
  // Substitua por um ID de projeto existente ao qual a task será associada
  console.log("Usando projeto", projeto);
  const projetoIdTeste = projeto.id;

  const timestamp = "11:50";
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

  // Teste com IDs de projeto/task inexistentes (opcional, para testar o tratamento de erro)
  const projetoIdInexistente = "ID_PROJETO_INEXISTENTE";
  const taskIdInexistente = "ID_TASK_INEXISTENTE";
  const descricaoInexistente = "Alteração para algo que não existe.";

  console.log("\nTentando criar alteração para projeto/task inexistentes...");
  const resultadoCriacaoInexistente = await criarAlteracao(
    chaveSessaoTeste,
    projetoIdInexistente,
    taskIdInexistente,
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

// // // Descomente isso para testar com o node
// import LocalStorage from "node-localstorage";
// const localStorage = new LocalStorage.LocalStorage("./scratch");

// Chamar a função de teste para executar a criação de alteração
await testarCriarAlteracao();
