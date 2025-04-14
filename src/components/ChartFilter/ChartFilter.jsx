import React from "react";
import { useChartLimitStore } from "../../store/useChartLimitStore";

const ChartLimitSelector = () => {
  const limit = useChartLimitStore((state) => state.limit);
  const setLimit = useChartLimitStore((state) => state.setLimit);

  return (
    <div style={{ marginBottom: "1rem", color: "white" }}>
      <label htmlFor="chart-limit" style={{ marginRight: "0.5rem" }}>
        Mostrar ações:
      </label>
      <select
        id="chart-limit"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        style={{
          padding: "0.3rem 0.6rem",
          borderRadius: "5px",
          border: "none",
        }}
      >
        {[5, 10, 15, 20].map((n) => (
          <option key={n} value={n}>
            Top {n}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChartLimitSelector;