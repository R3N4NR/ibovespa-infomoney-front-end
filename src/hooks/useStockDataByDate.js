import { useEffect, useState } from 'react';
import { connectWebSocket, addWebSocketListener, removeWebSocketListener } from '../services/websocket';
import { getStockByDate } from '../routes/getStockByDate';
import { useTableDropdownStore } from '../store/useTableDropdownStore';
import { useDateSelectStore } from '../store/useDateSelectStore';

export default function useStockByDate() {
  const [altas, setAltas] = useState([]);
  const [baixas, setBaixas] = useState([]);
  const [mensagens, setMensagens] = useState([]);

  const selectedOption = useTableDropdownStore((state) => state.selectedOption);
  const { date } = useDateSelectStore();

  useEffect(() => {
    if (!date) return;

    let debounceTimer = setTimeout(() => {
      setAltas([]);
      setBaixas([]);
      setMensagens([]);

      const handleWebSocketData = (data) => {
    
        setMensagens((prev) => [...prev, data]);

        if (Array.isArray(data)) {
          const novasAltas = data.filter(item => parseFloat(item.variacao.replace(",", ".")) > 0);
          const novasBaixas = data.filter(item => parseFloat(item.variacao.replace(",", ".")) < 0);

          setAltas((prev) => [...prev, ...novasAltas]);
          setBaixas((prev) => [...prev, ...novasBaixas]);
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
    }, 400); 

    return () => clearTimeout(debounceTimer);
  }, [date]);

  const dadosFiltrados = selectedOption === 'Altas' ? altas : baixas;

  return { dados: dadosFiltrados, mensagens };
}
