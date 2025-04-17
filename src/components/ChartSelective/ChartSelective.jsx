import { Container } from "react-bootstrap";
import './ChartSelective.css';
import ReactApexChart from "react-apexcharts";
import DateSelector from "../Date/Date";
import useStockByMonth from "../../hooks/useStockByMonth";
import { useState, useMemo } from "react";
import useStockName from "../../hooks/useStockName";
import DropdownSearch from "../DropdownSearch/DropdownSearch";
import { chartSelectiveOptions } from "../../utils/chartOptions"; 

const ChartSelective = () => {
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [selectedAtivo, setSelectedAtivo] = useState("");
  const { dados, loading, erro } = useStockByMonth(selectedAtivo, ano, mes);
  const ativos = useStockName();

  const handleDateChange = (date) => {
    const selected = new Date(date);
    setMes(String(selected.getMonth() + 1).padStart(2, "0"));
    setAno(String(selected.getFullYear()));
  };

  const series = useMemo(() => {
    if (!dados || dados.length === 0) return [];

    const valoresPorDia = {};

    dados.forEach(entry => {
      const dia = new Date(entry.date).getDate();
      const valor = parseFloat((entry.val_max || "0").replace(",", "."));
      valoresPorDia[dia] = valor; 
    });

    const dias = Array.from({ length: 31 }, (_, i) => i + 1);
    const data = dias.map(dia => valoresPorDia[dia] || 0); 

    return [
      {
        name: selectedAtivo || "Ativo",
        data
      }
    ];
  }, [dados, selectedAtivo]);

  // Usando as opções importadas
  const options = chartSelectiveOptions(selectedAtivo);

  return (
    <Container className="my-5">
      <Container className="d-flex align-items-center gap-2 mb-4">
        <DropdownSearch 
          data={ativos}
          selectedAtivo={selectedAtivo}
          onSelectAtivo={setSelectedAtivo}
        />
        <DateSelector mode="month-year" onChange={handleDateChange} />
      </Container>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {loading && <p>Carregando...</p>}

      {/* Mostra o gráfico */}
      <ReactApexChart
        type="line"
        series={series}
        options={options}
        height={350}
      />
    </Container>
  );
};

export default ChartSelective;
