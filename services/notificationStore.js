import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE = "@primepet_notificacoes";

let listeners = [];

export async function adicionarNotificacao(titulo, mensagem) {
  try {
    const antigas = await obterNotificacoes();

    const novaNotificacao = {
      id: Date.now().toString(),
      titulo,
      mensagem,
      data: new Date().toLocaleString("pt-BR"),
    };

    const novas = [novaNotificacao, ...antigas];

    await AsyncStorage.setItem(
      CHAVE,
      JSON.stringify(novas)
    );

    listeners.forEach((listener) => {
      listener(novas);
    });

    return true;
  } catch (error) {
    console.log("Erro ao salvar notificação:", error);
    return false;
  }
}

export async function obterNotificacoes() {
  try {
    const dados = await AsyncStorage.getItem(CHAVE);

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  } catch (error) {
    console.log("Erro ao carregar notificações:", error);
    return [];
  }
}

export function observarNotificacoes(listener) {
  listeners.push(listener);

  obterNotificacoes().then((lista) => {
    listener(lista);
  });

  return () => {
    listeners = listeners.filter(
      (item) => item !== listener
    );
  };
}