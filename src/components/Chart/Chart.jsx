import React, { useMemo, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Container } from "react-bootstrap";

import { useChartLimitStore } from "../../store/useChartLimitStore";
import useStockDataByDate from "../../hooks/useStockDataByDate";
import { getColorById } from "../../utils/colorPallet";
import LoadingSpinner from "../../components/Spinner/Spinner";
import { chartOptions } from "../../utils/chartOptions";
import DropdownChart from "../DropdownChart/DropdownChart";

const CustomChart = () => {
  const { dados } = useStockDataByDate();
  const { limit } = useChartLimitStore();
  const [selectedSeries, setSelectedSeries] = useState([]);

  const parseNumber = (value) => parseFloat((value ?? "0").replace(",", "."));

  useEffect(() => {
    setSelectedSeries([]);
  }, [dados]);

  const allSeries = useMemo(() => {
    if (!dados || dados.length === 0) return [];
    return dados.slice(0, limit).map((item) => ({
      name: item.ativo,
      data: [
        { x: "Início", y: parseNumber(item.ultimo) },
        { x: "Mínimo", y: parseNumber(item.val_min) },
        { x: "Máximo", y: parseNumber(item.val_max) },
      ],
      color: getColorById(item.ativo),
    }));
  }, [dados, limit]);

  const filteredSeries = useMemo(() => {
    if (selectedSeries.length > 0) {
      return allSeries.filter((s) => selectedSeries.includes(s.name));
    }
    return allSeries;
  }, [allSeries, selectedSeries]);

  const toggleSeries = (name) => {
    setSelectedSeries((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    );
  };

  const loading = !dados || dados.length === 0;

  return (
    <>
      <Container className="d-flex gap-2 align-items-center mb-3">
        <DropdownChart />
        <span>{dados?.length || 0}</span>
      </Container>

      <Container className="custom-legend d-flex flex-wrap gap-2 mb-4">
        {allSeries.map((serie) => {
          const isSelected = selectedSeries.includes(serie.name);
          return (
            <div
              key={serie.name}
              onClick={() => toggleSeries(serie.name)}
              style={{
                cursor: "pointer",
                padding: "4px 8px",
                background: isSelected ? serie.color : "#f9f9f9",
                border: `2px solid ${serie.color}`,
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "12px",
                color: isSelected ? "#fff" : serie.color,
                transition: "all 0.2s",
              }}
            >
              {serie.name}
            </div>
          );
        })}
      </Container>

      <Container className="flex flex-col gap-4 items-start">
        {loading ? (
          <LoadingSpinner />
        ) : filteredSeries.length === 0 ? (
          <p className="text-muted">Nenhum dado disponível.</p>
        ) : (
          <ReactApexChart
            options={chartOptions}
            series={filteredSeries}
            type="line"
            height={400}
          />
        )}
      </Container>
    </>
  );
};

export default CustomChart;
