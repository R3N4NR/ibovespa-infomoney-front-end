
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header/Header';
import MainTable from './components/Table/Table';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import DataAnalysis from './components/DataAnalysis/DataAnalysis';
import { Summary } from './components/Summary/Summary';

function App() {

  return (
    <>
   
      <Header />
    <ErrorBoundary>
    <Summary/>
        <Container fluid>
          <Row>
            <Col>
              <MainTable />
            </Col>
            <Col>
              <DataAnalysis />
            </Col>
          </Row>
        </Container>

      </ErrorBoundary>
      </>
  );
}

export default App;
