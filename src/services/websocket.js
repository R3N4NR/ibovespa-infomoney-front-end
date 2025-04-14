let socket;
let listeners = [];  // Armazenar todos os ouvintes
let isConnected = false;  // Variável para rastrear o estado de conexão

// Conectar ao WebSocket
export const connectWebSocket = () => {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING || socket.readyState === WebSocket.CLOSING)) {
    return; // Se já está conectado ou tentando se conectar, não faz nada
  }

  socket = new WebSocket("ws://localhost:8765");  // URL do servidor WebSocket

  socket.onopen = () => {
    console.log("Conectado ao WebSocket");
    isConnected = true;
    // Após a conexão, notifica todos os ouvintes já registrados
    listeners.forEach((callback) => callback({ connected: true }));
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      listeners.forEach((callback) => callback(data));  // Dispara para todos os ouvintes
    } catch (e) {
      console.error("Erro ao fazer parse da mensagem WebSocket:", e);
    }
  };

  socket.onerror = (error) => {
    console.error("Erro no WebSocket:", error);
  };

  socket.onclose = () => {
    console.warn("Conexão WebSocket fechada.");
    isConnected = false;
    // Notifica todos os ouvintes que a conexão foi fechada
    listeners.forEach((callback) => callback({ connected: false }));
  };
};

// Adicionar um ouvinte de WebSocket
export const addWebSocketListener = (callback) => {
  if (!socket || !isConnected) {
    connectWebSocket();  // Tenta conectar caso ainda não tenha conexão
  }
  listeners.push(callback);  // Adiciona o callback à lista de ouvintes
};

// Remover um ouvinte de WebSocket
export const removeWebSocketListener = (callback) => {
  listeners = listeners.filter((listener) => listener !== callback);  // Remove o callback da lista

  // Se não houver mais ouvintes, fecha a conexão WebSocket
  if (listeners.length === 0 && socket) {
    closeWebSocket();
  }
};

// Fechar o WebSocket
export const closeWebSocket = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
    isConnected = false;
  }
};
