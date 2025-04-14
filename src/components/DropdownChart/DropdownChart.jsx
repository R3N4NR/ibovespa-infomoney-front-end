import Dropdown from 'react-bootstrap/Dropdown';
import { useChartLimitStore } from '../../store/useChartLimitStore';  // Importando a store do Zustand
import './DropdownChart.css';

const DropdownChart = () => {
  // Acessando o limite atual e a função para setar o limite da store
  const limit = useChartLimitStore((state) => state.limit);
  const setLimit = useChartLimitStore((state) => state.setLimit);

  const limits = [5, 10, 25, 50, 100];  // Definindo os limites disponíveis

  return (
    <Dropdown onSelect={(eventKey) => setLimit(Number(eventKey))}>
      <Dropdown.Toggle variant="secondary" id="chart-limit-dropdown">
        {limit} {/* Exibindo o limite atual */}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {limits.map((num) => (
          <Dropdown.Item key={num} eventKey={num.toString()}>
            {num}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownChart;
