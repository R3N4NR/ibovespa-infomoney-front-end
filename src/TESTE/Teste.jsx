import useStockData from '../hooks/useStockData';

export default function TabelaDeStocks() {
  const { dados } = useStockData(); // já vem filtrado conforme Zustand

  return (
    <div>
      <h2>Variações</h2>
      <ul>
        {dados.map((item, idx) => (
          <li key={idx}>
            {item.ativo} - {parseFloat(item.variacao).toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
}
