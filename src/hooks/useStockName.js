

import { useEffect, useState } from 'react';
import { getStockName } from '../routes/getStockName';

export default function useStockName() {
  const [ativos, setAtivos] = useState([]);

  useEffect(() => {
    const fetchAtivos = async () => {
      const dados = await getStockName();
      setAtivos(dados);
    };

    fetchAtivos();
  }, []);

  return ativos;
}