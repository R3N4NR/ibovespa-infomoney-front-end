import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { Container } from "react-bootstrap";

import { useChartLimitStore } from "../../store/useChartLimitStore";
import useStockData from "../../hooks/useStockData";
import { getColorById } from "../../utils/colorPallet";

import LoadingSpinner from "../../components/Spinner/Spinner";
import DropdownChart from "../DropdownChart/DropdownChart";
import CustomButton from "../Button/Button";

import { chartOptions } from "../../utils/chartOptions";

const CustomChart = () => {
  const { dados } = useStockData();
  const { limit } = useChartLimitStore();

  const { series, options, loading } = useMemo(() => {
    if (!dados || dados.length === 0) {
      return { series: [], options: {}, loading: false };
    }

    const parseNumber = (value) => parseFloat((value ?? "0").replace(",", "."));
    const options = chartOptions
    const slicedData = dados.slice(0, limit);
    const series = slicedData.map((item) => {
      const valMin = parseNumber(item.val_min);
      const valMax = parseNumber(item.val_max);
      const inicio = parseNumber(item.ultimo);

      return {
        name: item.ativo,
        data: [
          { x: "Início", y: inicio },
          { x: "Mínimo", y: valMin },
          { x: "Máximo", y: valMax },
        ],
        color: getColorById(item.ativo),
      };
    });



    return { series, options, loading: false };
  }, [dados, limit]);

  return (
    <>
      <Container className="d-flex gap-2 align-items-center mb-3">
        <DropdownChart />
        {/* <CustomButton children="Limpar seleção" onClick={() => {}} /> */}
      </Container>

      <Container className="flex flex-col gap-4 items-start">
        {loading ? (
          <LoadingSpinner />
        ) : series.length === 0 ? (
          <p className="text-muted">Nenhum dado disponível.</p>
        ) : (
          <ReactApexChart options={options} series={series} type="line" height={400} />
        )}
      </Container>
    </>
  );
};

export default CustomChart;
