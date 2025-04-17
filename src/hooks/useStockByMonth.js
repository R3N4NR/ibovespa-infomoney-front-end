import { useEffect, useState } from "react";
import { getStockByMonth } from "../routes/getStockByMonth";

const useStockByMonth = (ativo, ano, mes) => {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!ativo || !mes || !ano) return;

      try {
        setLoading(true);
        const dadosResponse = await getStockByMonth(ativo, ano, mes);
        setDados(dadosResponse);
      } catch (error) {
        setDados([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ano, ativo, mes]);

  return { dados, loading };
};

export default useStockByMonth;
