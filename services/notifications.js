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