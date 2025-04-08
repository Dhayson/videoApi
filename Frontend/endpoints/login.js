async function efetuarLogin(user, senha) {
  const url = `http://198.74.53.107:8080/api/v1/usuario/login?user=${encodeURIComponent(
    user
  )}&senha=${encodeURIComponent(senha)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Erro ao efetuar login:", errorData);
      return { sucesso: false, erro: errorData };
    }

    const responseData = await response.text();
    console.log("Login efetuado com sucesso:", responseData);
    return { sucesso: true, data: responseData };
  } catch (error) {
    console.error("Erro ao realizar a requisição de login:", error);
    return {
      sucesso: false,
      erro: { message: "Erro ao realizar a requisição de login." },
    };
  }
}

function setSessionId(session_id) {
  localStorage.setItem("sessionID", session_id);
}

function getSessionId() {
  return localStorage.getItem("sessionID");
}

async function clientInfo() {
  const session_id = getSessionId();
  const url = `http://198.74.53.107:8080/api/v1/usuario/getinfo?keySessao=${encodeURIComponent(
    session_id
  )}`;
  try {
    const response = await fetch(url, {
      method: "GET",
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

async function testarClientInfo() {
  const usuarioTeste = "joao.silva@example.com"; // Substitua por um usuário existente para teste
  const senhaTeste = "senha123"; // Substitua pela senha correta do usuário
  const resultadoLoginSucesso = await efetuarLogin(usuarioTeste, senhaTeste);
  setSessionId(resultadoLoginSucesso.data);
  const Resposta = clientInfo();
  console.log((await Resposta).data);
}

// Função para testar a função efetuarLogin
async function testarLogin() {
  const usuarioTeste = "joao.silva@example.com"; // Substitua por um usuário existente para teste
  const senhaTeste = "senha123"; // Substitua pela senha correta do usuário

  console.log(`\nIniciando teste de login para o usuário: ${usuarioTeste}`);
  const resultadoLoginSucesso = await efetuarLogin(usuarioTeste, senhaTeste);

  if (resultadoLoginSucesso.sucesso) {
    console.log("Teste de login bem-sucedido!");
    console.log("Key de Sessão:", resultadoLoginSucesso.data);
  } else {
    console.error("Teste de login falhou!");
    console.error("Detalhes do erro:", resultadoLoginSucesso.erro);
  }

  // Teste com credenciais inválidas (opcional)
  console.log(
    "\nIniciando teste de login com credenciais inválhttps://meet.google.com/kpp-irga-evwidas..."
  );
  const resultadoLoginFalha = await efetuarLogin(
    "usuario.inexistente@example.com",
    "senhaErrada"
  );

  if (resultadoLoginFalha.sucesso) {
    console.warn(
      "Teste de login com credenciais inválidas inesperadamente bem-sucedido!"
    );
    console.log("Dados da resposta:", resultadoLoginFalha.data);
  } else {
    console.log(
      "Teste de login com credenciais inválidas falhou conforme esperado."
    );
    console.error("Detalhes do erro:", resultadoLoginFalha.erro);
  }
}

export { efetuarLogin, getSessionId, setSessionId, clientInfo };

// // // Descomente isso para testar com o node
// import LocalStorage from "node-localstorage";
// const localStorage = new LocalStorage.LocalStorage("./scratch");

// // Chamar a função de teste para executar o login
// await testarLogin();
// await testarClientInfo();
