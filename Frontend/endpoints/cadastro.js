import { isNode } from "./isNode.mjs";
async function cadastrarCliente(
  nome,
  email,
  senha,
  cpf,
  dataDeNascimento,
  plataformas
) {
  //const url = "http://198.74.53.107:8080/api/v1/usuario/cadastrocliente";
  const url = "http://localhost:8080/api/v1/usuario/cadastrocliente";
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    nome: nome,
    email: email,
    senha: senha,
    cpf: cpf,
    dataDeNascimento: dataDeNascimento,
    plataformas: plataformas,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Erro ao cadastrar cliente:", errorData);
      return { sucesso: false, erro: errorData };
    }

    const responseData = await response.text();
    console.log("Cliente cadastrado com sucesso:", responseData);
    return { sucesso: true, data: responseData };
  } catch (error) {
    console.error("Erro ao realizar a requisição:", error);
    return {
      sucesso: false,
      erro: { message: "Erro ao realizar a requisição." },
    };
  }
}

// Função para testar a função cadastrarCliente
async function testarCadastroCliente() {
  const resultado = await cadastrarCliente(
    "João Silva",
    "joao.silva3@example.com",
    "senha123",
    "12345678903",
    "1990-01-01",
    "YouTube, Netflix"
  );

  if (resultado.sucesso) {
    console.log("Teste de cadastro bem-sucedido!");
    console.log("Dados da resposta:", resultado.data);
  } else {
    console.error("Teste de cadastro falhou!");
    console.error("Detalhes do erro:", resultado.erro);
  }

  // Outro teste com dados diferentes (opcional)
  console.log("\nIniciando outro teste de cadastro...");
  const resultado2 = await cadastrarCliente(
    "Maria Souza",
    "maria.souza3@example.com",
    "outraSenha",
    "98765432103",
    "1985-05-15",
    "Amazon Prime Video"
  );

  if (resultado2.sucesso) {
    console.log("Teste de cadastro bem-sucedido!");
    console.log("Dados da resposta:", resultado2.data);
  } else {
    console.error("Teste de cadastro falhou!");
    console.error("Detalhes do erro:", resultado2.erro);
  }
}

export { cadastrarCliente };

if (isNode()) {
  // Chamar a função de teste para executar o cadastro
  await testarCadastroCliente();
}
