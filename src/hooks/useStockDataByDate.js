import { useEffect, useState } from 'react';
import { connectWebSocket, addWebSocketListener, removeWebSocketListener } from '../services/websocket';
import { getStockByDate } from '../routes/getStockByDate';
import { useTableDropdownStore } from '../store/useTableDropdownStore';

export default function useStockByDate(date) {
  const [altas, setAltas] = useState([]);
  const [baixas, setBaixas] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  
  const selectedOption = useTableDropdownStore((state) => state.selectedOption);

  useEffect(() => {
    const handleWebSocketData = (data) => {
      console.log("Dados recebidos via WebSocket:", data);

      setMensagens((prev) => [...prev, data]);

      if (Array.isArray(data)) {
        const novasAltas = data.filter(item => parseFloat(item.variacao.replace(",", ".")) > 0);
        const novasBaixas = data.filter(item => parseFloat(item.variacao.replace(",", ".")) < 0);

        setAltas(prevAltas => [...prevAltas, ...novasAltas]);
        setBaixas(prevBaixas => [...prevBaixas, ...novasBaixas]);
      } else {
        console.error("Os dados recebidos não são um array:", data);
      }
    };


    connectWebSocket();
    addWebSocketListener(handleWebSocketData);

    getStockByDate(date).then((res) => {
      setAltas(res.altas);
      setBaixas(res.baixas);
    });

    
    return () => {
      removeWebSocketListener(handleWebSocketData);
    };
  }, [date]);

  const dadosFiltrados = selectedOption === 'Altas' ? altas : baixas;

  return { dados: dadosFiltrados, mensagens };
}
