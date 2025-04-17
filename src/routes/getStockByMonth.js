import axios from 'axios';

export const getStockByMonth = async (ativo, ano, mes) => {
  if (!ativo || !mes || !ano) return [];

  try {
    const response = await axios.get(
      `http://localhost:5000/stocks/${ativo}/${ano}/${mes}`
    );
    return response.data.dados;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};