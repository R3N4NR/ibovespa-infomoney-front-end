import axios from 'axios';

export async function getStockName() {
  try {
    const res = await axios.get('http://localhost:5000/stocks');
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar ativos únicos:", error);
    return [];
  }
}