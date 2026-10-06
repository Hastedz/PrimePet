let listeners = [];

const CHAVE = "primepet_notificacoes";

export function adicionarNotificacao(titulo, mensagem) {
  try {
    const antigas = obterNotificacoes();

    const nova = {
      id: Date.now().toString(),
      titulo,
      mensagem,
      data: new Date().toLocaleString("pt-BR"),
    };

    const novas = [nova, ...antigas];

    localStorage.setItem(CHAVE, JSON.stringify(novas));

    listeners.forEach((listener) => {
      listener(novas);
    });

    return true;
  } catch (error) {
    console.log("Erro ao salvar:", error);
    return false;
  }
}

export function obterNotificacoes() {
  try {
    const dados = localStorage.getItem(CHAVE);

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  } catch (error) {
    console.log("Erro ao carregar:", error);
    return [];
  }
}

export function observarNotificacoes(listener) {
  listeners.push(listener);

  listener(obterNotificacoes());

  return () => {
    listeners = listeners.filter(
      (item) => item !== listener
    );
  };
}

export function enviarNotificacao(titulo, mensagem) {
  const sucesso = adicionarNotificacao(titulo, mensagem);

  // Notificação do navegador somente no Web
  if (
    typeof window !== "undefined" &&
    "Notification" in window
  ) {
    if (Notification.permission === "granted") {
      new Notification(titulo, {
        body: mensagem,
      });
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then((permissao) => {
        if (permissao === "granted") {
          new Notification(titulo, {
            body: mensagem,
          });
        }
      });
    }
  }

  return sucesso;
}

export function configurarNotificacoes() {
  console.log("Notificações configuradas.");
}