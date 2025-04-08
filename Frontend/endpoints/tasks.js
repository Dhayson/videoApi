import { criarProjeto } from "./projetos.js";
import { getSessionId, setSessionId, efetuarLogin } from "./login.js";

async function criarTask(
  titulo,
  descricao,
  prioridade,
  dataEntrega,
  projetoId
) {
  const session_id = getSessionId();
  const url = "http://localhost:8080/api/v1/tasks/criar";
  const headers = {
    chaveSessao: session_id,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    titulo: titulo,
    descricao: descricao,
    prioridade: prioridade,
    dataEntrega: dataEntrega,
    projetoId: projetoId,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro ao criar task:", errorText);
      return { sucesso: false, erro: errorText };
    }

    const responseText = await response.text();
    console.log("Task criada:", responseText);
    const idMatch = responseText.match(/ID: ([a-f0-9-]+)/);
    const taskId = idMatch ? idMatch[1] : null;
    return { sucesso: true, mensagem: responseText, id: taskId };
  } catch (error) {
    console.error("Erro ao realizar a requisição de criação de task:", error);
    return {
      sucesso: false,
      erro: error.message || "Erro desconhecido ao criar task.",
    };
  }
}

// Função para testar a função criarTask
async function testarCriarTask() {
  const nomeProjetoTeste = "Projeto de Teste JavaScript";
  const descricaoProjetoTeste =
    "Este é um projeto criado via teste em JavaScript.";
  const projeto = await criarProjeto(nomeProjetoTeste, descricaoProjetoTeste);
  // Substitua por um ID de projeto existente ao qual a task será associada
  console.log("Usando projeto", projeto);
  const projetoIdTeste = projeto.id;
  id_meu_projeto = projetoIdTeste;

  const tituloTaskTeste = "Tarefa de Teste JavaScript";
  const descricaoTaskTeste = "Esta é uma task criada via teste em JavaScript.";
  const prioridadeTaskTeste = "MEDIUM";
  const dataEntregaTaskTeste = "2025-04-20";

  console.log("\nIniciando teste de criação de task...");
  const resultadoCriacao = await criarTask(
    tituloTaskTeste,
    descricaoTaskTeste,
    prioridadeTaskTeste,
    dataEntregaTaskTeste,
    projetoIdTeste
  );

  if (resultadoCriacao.sucesso) {
    console.log("Teste de criação de task bem-sucedido!");
    console.log("Mensagem:", resultadoCriacao.mensagem);
    if (resultadoCriacao.id) {
      console.log("ID da Task Criada:", resultadoCriacao.id);
      id_task_1 = resultadoCriacao.id;
    }
  } else {
    console.error("Teste de criação de task falhou!");
    console.error("Detalhes do erro:", resultadoCriacao.erro);
  }

  // Outro teste com dados diferentes (opcional)
  const outroTituloTask = "Outra Tarefa";
  const outraDescricaoTask = "Uma descrição diferente para outra tarefa.";
  const outraPrioridadeTask = "LOW";
  const outraDataEntregaTask = "2025-04-25";

  console.log("\nIniciando outro teste de criação de task...");
  const resultadoCriacao2 = await criarTask(
    outroTituloTask,
    outraDescricaoTask,
    outraPrioridadeTask,
    outraDataEntregaTask,
    projetoIdTeste // Usando o mesmo projeto ID para este teste
  );

  if (resultadoCriacao2.sucesso) {
    console.log("Teste de criação de outra task bem-sucedido!");
    console.log("Mensagem:", resultadoCriacao2.mensagem);
    if (resultadoCriacao2.id) {
      console.log("ID da Outra Task Criada:", resultadoCriacao2.id);
      id_task_2 = resultadoCriacao2.id;
    }
  } else {
    console.error("Teste de criação de outra task falhou!");
    console.error("Detalhes do erro:", resultadoCriacao2.erro);
  }

  // Teste com um projeto ID inexistente (opcional, para testar o tratamento de erro)
  const projetoIdInexistente = "ID_PROJETO_INEXISTENTE";
  const tituloTaskInexistente = "Tarefa para Projeto Inexistente";

  console.log("\nTentando criar task para projeto inexistente...");
  const resultadoCriacaoInexistente = await criarTask(
    tituloTaskInexistente,
    "Descrição para projeto inexistente",
    "NORMAL",
    "2025-04-30",
    projetoIdInexistente
  );

  if (resultadoCriacaoInexistente.sucesso) {
    console.warn(
      "Teste de criação de task para projeto inexistente inesperadamente bem-sucedido!"
    );
    console.log("Mensagem:", resultadoCriacaoInexistente.mensagem);
  } else {
    console.log(
      "Teste de criação de task para projeto inexistente falhou conforme esperado."
    );
    console.error("Detalhes do erro:", resultadoCriacaoInexistente.erro);
  }
}

var id_task_1;
var id_task_2;
var id_meu_projeto;

async function deletarTask(taskId) {
  const chaveSessao = getSessionId();
  const url = `http://localhost:8080/api/v1/tasks/${taskId}`;
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
      console.error(`Erro ao deletar task com ID ${taskId}:`, errorText);
      return { sucesso: false, erro: errorText };
    }

    const responseText = await response.text();
    console.log(`Task com ID ${taskId} deletada:`, responseText);
    return { sucesso: true, mensagem: responseText };
  } catch (error) {
    console.error(
      `Erro ao realizar a requisição de exclusão da task com ID ${taskId}:`,
      error
    );
    return {
      sucesso: false,
      erro:
        error.message || `Erro desconhecido ao deletar task com ID ${taskId}.`,
    };
  }
}

// Função para testar a função deletarTask
async function testarDeletarTask() {
  // Substitua por um ID de task existente que você deseja deletar (com cautela!)
  const taskIdParaDeletar = id_task_1;

  console.warn(
    `\nIniciando teste de exclusão da task com ID: ${taskIdParaDeletar}`
  );

  const resultadoDelecao = await deletarTask(taskIdParaDeletar);

  if (resultadoDelecao.sucesso) {
    console.log("Teste de exclusão de task bem-sucedido!");
    console.log("Mensagem:", resultadoDelecao.mensagem);
  } else {
    console.error("Teste de exclusão de task falhou!");
    console.error("Detalhes do erro:", resultadoDelecao.erro);
  }

  // Tentativa de deletar um ID inexistente (opcional, para testar o tratamento de erro)
  const taskIdInexistente = "999";
  console.log(
    `\nTentando deletar task com ID inexistente: ${taskIdInexistente}`
  );
  const resultadoDelecaoInexistente = await deletarTask(taskIdInexistente);

  if (resultadoDelecaoInexistente.sucesso) {
    console.warn(
      "Teste de exclusão de task inexistente inesperadamente bem-sucedido!"
    );
    console.log("Mensagem:", resultadoDelecaoInexistente.mensagem);
  } else {
    console.log(
      "Teste de exclusão de task inexistente falhou conforme esperado."
    );
    console.error("Detalhes do erro:", resultadoDelecaoInexistente.erro);
  }
}

async function listarTasksPorProjeto(projetoId) {
  const chaveSessao = getSessionId();
  const url = `http://198.74.53.107:8080/api/v1/tasks/projeto/${projetoId}`;
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
      console.error(`Erro ao listar tasks do projeto ${projetoId}:`, errorData);
      return { sucesso: false, erro: errorData };
    }

    const tasks = await response.json();
    console.log(tasks);
    console.log(`Tasks do projeto ${projetoId}:`, tasks);
    return { sucesso: true, data: tasks };
  } catch (error) {
    console.error(
      `Erro ao realizar a requisição para listar tasks do projeto ${projetoId}:`,
      error
    );
    return {
      sucesso: false,
      erro: {
        message: `Erro ao realizar a requisição para listar tasks do projeto ${projetoId}.`,
      },
    };
  }
}

// Função para testar a função listarTasksPorProjeto
async function testarListarTasksPorProjeto() {
  // Substitua pelo ID de um projeto existente para o qual você deseja listar as tasks
  const projetoIdTeste = id_meu_projeto;
  // Substitua por um ID de projeto inexistente (opcional, para testar o tratamento de erro)
  const projetoIdInexistente = "777";

  console.log(
    `\nIniciando teste de listagem de tasks para o projeto com ID: ${projetoIdTeste}`
  );
  const resultadoListagem = await listarTasksPorProjeto(projetoIdTeste);

  if (resultadoListagem.sucesso) {
    console.log("Teste de listagem de tasks bem-sucedido!");
    if (resultadoListagem.data && Array.isArray(resultadoListagem.data)) {
      if (resultadoListagem.data.length > 0) {
        console.log("Tasks encontradas:");
        resultadoListagem.data.forEach((task) => {
          console.log(`- ID: ${task.id}`);
          console.log(`  Título: ${task.titulo}`);
          console.log(`  Descrição: ${task.descricao}`);
          console.log(`  Prioridade: ${task.prioridade}`);
          console.log(`  Data de Criação: ${task.dataCriacao}`);
          console.log(`  Data de Entrega: ${task.dataEntrega}`);
          if (task.responsavel) {
            console.log(
              `  Responsável: ${task.responsavel.nome} (ID: ${task.responsavel.id})`
            );
          }
          if (task.projeto) {
            console.log(
              `  Projeto: ${task.projeto.nome} (ID: ${task.projeto.id})`
            );
          }
          console.log("---");
        });
      } else {
        console.log(
          `Nenhuma task encontrada para o projeto com ID ${projetoIdTeste}.`
        );
      }
    } else {
      console.warn(
        "Resposta de listagem de tasks em formato inesperado:",
        resultadoListagem.data
      );
    }
  } else {
    console.error("Teste de listagem de tasks falhou!");
    console.error("Detalhes do erro:", resultadoListagem.erro);
  }

  // Teste com um projeto ID inexistente (opcional)
  console.log(
    `\nIniciando teste de listagem de tasks para projeto inexistente com ID: ${projetoIdInexistente}`
  );
  const resultadoListagemInexistente = await listarTasksPorProjeto(
    projetoIdInexistente
  );

  if (resultadoListagemInexistente.sucesso) {
    console.warn(
      "Teste de listagem de tasks para projeto inexistente inesperadamente bem-sucedido!"
    );
    console.log("Dados:", resultadoListagemInexistente.data);
  } else {
    console.log(
      "Teste de listagem de tasks para projeto inexistente falhou conforme esperado."
    );
    console.error("Detalhes do erro:", resultadoListagemInexistente.erro);
  }
}

export { criarTask, deletarTask };

// Chamar a função de teste para executar a criação de task
// await testarCriarTask();

// // Chamar a função de teste para executar a deleção de task
// await testarDeletarTask();

// await testarListarTasksPorProjeto();

// // Descomente isso para testar com o node
// import LocalStorage from "node-localstorage";
// const localStorage = new LocalStorage.LocalStorage("./scratch");
