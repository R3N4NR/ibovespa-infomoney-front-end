export const chartOptions = {
  chart: {
    type: "line",
  },
  xaxis: {
    type: "category",
    tickPlacement: "on",
  },
  yaxis: {
    title: {
      text: "Valor de Mercado (R$)",
    },
    min: 0,
  },
  stroke: {
    curve: "straight",
    width: 2,
  },
  markers: {
    size: 4,
  },
  legend: {
    show: false,
  },
};

// src/options/chartSelectiveOptions.js

export const chartSelectiveOptions = (selectedAtivo) => ({
  chart: {
    id: "line-stock",
    zoom: {
      enabled: true, // Ativa o zoom no gráfico
      type: 'xy', // Permite zoom em ambos os eixos
      resetIcon: {
        shape: 'circle',
        icon: 'fa fa-undo',
        top: '2px',
        right: '5px'
      }
    }
  },
  xaxis: {
    categories: Array.from({ length: 31 }, (_, i) => i + 1), // Garantir que sejam 31 dias
    labels: {
      style: {
        fontSize: '12px',
        fontWeight: 'bold'
      }
    }
  },
  tooltip: {
    enabled: true,
    shared: true,
    followCursor: true,
    intersect: false,
    custom: function({ seriesIndex, dataPointIndex, w }) {
      const data = w.config.series[seriesIndex].data[dataPointIndex];
  
      const label = data === 0 ? "Sem dados coletados nesse dia" : `Máxima Diária: ${data}`;
      return `<div style="padding: 5px; background-color: #fff; border: 1px solid #ccc;">
                ${label}
              </div>`;
    }
  },
  grid: {
    show: true,
    borderColor: "#f1f1f1",
    strokeDashArray: 4, // Define uma linha tracejada no fundo do gráfico
  },
  stroke: {
    curve: 'smooth', // Linha suave
    dashArray: 0 // Não adiciona linhas tracejadas por padrão, mas podemos modificar
  },
  markers: {
    size: 5, // Define o tamanho dos marcadores
    hover: {
      size: 8, // Tamanho do marcador quando o mouse passa sobre o ponto
      colors: ['#FFB81C'],
    }
  },
  annotations: {
    yaxis: [{
      y: 0,
      borderColor: '#FF0000',
      label: {
        borderColor: '#FF0000',
        style: {
          color: '#fff',
          background: '#FF0000',
          fontSize: '12px'
        },
        text: 'Sem Dados',
      }
    }]
  }
});

