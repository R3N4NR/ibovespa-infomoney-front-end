import { useEffect, useState } from 'react';
import { connectWebSocket, addWebSocketListener, removeWebSocketListener } from '../services/websocket';
import { getSummaryData } from '../routes/getSummaryData';

export default function useStockByDate(date, fetchRoute) {

  const [summary, setSummary] = useState([]);
  const [mensagens, setMensagens] = useState([]);


  useEffect(() => {
    const handleWebSocketData = (data) => {
      console.log("Dados recebidos via WebSocket:", data);

      setMensagens((prev) => [...prev, data]);

    };

    connectWebSocket();
    addWebSocketListener(handleWebSocketData);
    
    getSummaryData(date).then((res) => {
        setSummary(res.summary)
    })

    return () => {
      removeWebSocketListener(handleWebSocketData);
    };
  }, [date, fetchRoute]);


  return { mensagens, summary };
}
