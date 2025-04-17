
import React from 'react';
import { Container } from 'react-bootstrap';
import CustomChart from '../Chart/Chart';
import ChartSelective from '../ChartSelective/ChartSelective';

const DataAnalysis = () => {
  return (
    <Container fluid style={{marginTop:'70px'}}>
      <CustomChart />
      <ChartSelective/>
    </Container>
  );
};

export default DataAnalysis;