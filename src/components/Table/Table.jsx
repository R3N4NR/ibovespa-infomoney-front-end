import React, { Suspense, useState, useMemo } from "react";
import { Container, Form } from "react-bootstrap";

import CustomSelect from "../Dropdown/Dropdown";
import { useTableDropdownStore } from "../../store/useTableDropdownStore";
import useStockByDate from "../../hooks/useStockDataByDate";
import { Table, Header, HeaderRow, Body, Row, HeaderCell, Cell } from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import DateSelector from "../Date/Date";
import { getTodayFormatted } from "../../utils/dateConfig";

const MainTable = () => {
  const [search, setSearch] = useState("");
  const [dateSelected, setDateSelected] = useState(getTodayFormatted());

  const selectedOption = useTableDropdownStore((state) => state.selectedOption);
  const { dados, loading } = useStockByDate(dateSelected);

  const filterBySearch = (data, searchTerm) => {
    return data.filter((item) =>
      item.ativo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const parseData = (item, index) => ({
    id: index,
    ativo: item.ativo,
    ultimo: parseFloat(item.ultimo.replace(",", ".")).toFixed(2),
    variacao: parseFloat(item.variacao.replace(",", ".")).toFixed(2),
    val_min: parseFloat(item.val_min.replace(",", ".")).toFixed(2),
    val_max: parseFloat(item.val_max.replace(",", ".")).toFixed(2),
    date: item.date,
  });

  const filteredData = useMemo(() => {
    if (!dados || loading) return [];

    const filteredByVariation = dados.filter((item) => {
      const variacao = parseFloat(item.variacao.replace(",", "."));
      return selectedOption === "Altas" ? variacao >= 0 : variacao < 0;
    });

    const parsedData = filteredByVariation.map(parseData);
    return filterBySearch(parsedData, search);
  }, [dados, loading, search, selectedOption]);

  const data = useMemo(() => {
    return { nodes: filteredData };
  }, [filteredData]);

  const theme = useTheme(getTheme());

  // Verificando se os dados estão vazios
  const isDataEmpty = filteredData.length === 0;

  return (
    <Container>
      <CustomSelect />

      <Form.Control
        type="text"
        placeholder="Buscar ativo..."
        className="my-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Suspense fallback={<div>Carregando tabela...</div>}>
        <DateSelector onDateChange={setDateSelected} />
        <Table data={data} theme={theme}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>Ativo</HeaderCell>
                  <HeaderCell>Último</HeaderCell>
                  <HeaderCell>Variação</HeaderCell>
                  <HeaderCell>Valor Mín</HeaderCell>
                  <HeaderCell>Valor Máx</HeaderCell>
                  <HeaderCell>Data</HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {isDataEmpty ? (
                  
                      <div style={{ textAlign: "center", padding: "2rem" }}>
                        <img
                          src="/assets/data_error.png"
                          alt="dados não encontrados"
                          style={{ width: "500px", height: "300px", objectFit: "contain" }}
                        />
                      </div>
                   
                ) : (
                  tableList.map((item) => (
                    <Row key={item.id} item={item}>
                      <Cell>{item.ativo}</Cell>
                      <Cell>{item.ultimo}</Cell>
                      <Cell>{item.variacao}</Cell>
                      <Cell>{item.val_min}</Cell>
                      <Cell>{item.val_max}</Cell>
                      <Cell>{item.date}</Cell>
                    </Row>
                  ))
                )}
              </Body>

            </>
          )}
        </Table>
      </Suspense>
    </Container>
  );
};

export default MainTable;
